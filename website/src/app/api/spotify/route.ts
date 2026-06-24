import { NextResponse } from "next/server";
import type {
  MusicPayload,
  NowPlaying,
  SpotifyNowResponse,
  SpotifyRecentResponse,
  SpotifyTopResponse,
  SpotifyTrack,
  TopTrack,
} from "@/utils/types/music.types";

// "On rotation" data for the home Person section. Spotify's secret stays here on
// the server: we mint a short-lived access token from the owner's refresh token
// (cached until ~expiry), then return now-playing (falling back to last-played)
// plus the 4-week top tracks. The client panel polls this route.

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API = "https://api.spotify.com/v1";

const EMPTY: MusicPayload = { configured: false, now: null, top: [] };

// Access token cached across requests in this server instance until just before
// it expires — Spotify tokens last ~1h, so this avoids a refresh per request.
let cached: { value: string; exp: number } | null = null;

const getAccessToken = async (
  id: string,
  secret: string,
  refresh: string,
): Promise<string> => {
  if (cached && cached.exp > Date.now() + 60_000) return cached.value;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("spotify token " + res.status);
  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  // validate before caching — a malformed 200 would otherwise poison the cache
  // with a bad token for ~expires_in and 401 every downstream call until expiry.
  if (!data.access_token || !data.expires_in) {
    throw new Error("spotify token: malformed response");
  }
  cached = {
    value: data.access_token,
    exp: Date.now() + data.expires_in * 1000,
  };
  return cached.value;
};

const artistsOf = (t: SpotifyTrack) =>
  t.artists?.map((a) => a.name).join(", ") ?? "";
const imgOf = (t: SpotifyTrack) => t.album?.images?.[0]?.url ?? "";
const toNow = (t: SpotifyTrack, playing: boolean): NowPlaying => ({
  name: t.name,
  artist: artistsOf(t),
  img: imgOf(t),
  url: t.external_urls?.spotify ?? "",
  playing,
});
const toTop = (t: SpotifyTrack): TopTrack => ({
  name: t.name,
  artist: artistsOf(t),
  img: imgOf(t),
  url: t.external_urls?.spotify ?? "",
});

const json = (payload: MusicPayload) =>
  NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });

export const dynamic = "force-dynamic";

export const GET = async () => {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return json(EMPTY);

  try {
    const token = await getAccessToken(id, secret, refresh);
    const auth = { Authorization: "Bearer " + token };
    const [nowRes, recentRes, topRes] = await Promise.all([
      fetch(`${API}/me/player/currently-playing`, {
        headers: auth,
        cache: "no-store",
      }),
      fetch(`${API}/me/player/recently-played?limit=1`, {
        headers: auth,
        cache: "no-store",
      }),
      // top tracks shift slowly — let the data layer cache them for an hour
      fetch(`${API}/me/top/tracks?time_range=short_term&limit=4`, {
        headers: auth,
        next: { revalidate: 3600 },
      }),
    ]);

    let now: NowPlaying | null = null;
    // currently-playing is 204 (no body) when nothing is active; anything other
    // than 200/204 is an auth/rate-limit failure worth a log breadcrumb.
    if (nowRes.status === 200) {
      const d = (await nowRes.json()) as SpotifyNowResponse;
      if (d.item && d.currently_playing_type === "track") {
        now = toNow(d.item, !!d.is_playing);
      }
    } else if (nowRes.status !== 204) {
      console.warn("[spotify] now-playing →", nowRes.status);
    }
    // nothing playing → show the last track played
    if (!now) {
      if (recentRes.ok) {
        const r = (await recentRes.json()) as SpotifyRecentResponse;
        const t = r.items?.[0]?.track;
        if (t) now = toNow(t, false);
      } else {
        console.warn("[spotify] recently-played →", recentRes.status);
      }
    }

    let top: TopTrack[] = [];
    if (topRes.ok) {
      const tj = (await topRes.json()) as SpotifyTopResponse;
      top = (tj.items ?? []).slice(0, 4).map(toTop);
    } else {
      console.warn("[spotify] top-tracks →", topRes.status);
    }

    return json({ configured: true, now, top });
  } catch (e) {
    console.warn("[spotify] route failed — returning offline payload", e);
    return json({ configured: true, now: null, top: [], error: true });
  }
};
