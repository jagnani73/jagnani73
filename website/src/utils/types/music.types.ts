// "On rotation" panel — public state shape plus the minimal Spotify wire shapes
// the /api/spotify route reads. Live data needs SPOTIFY_REFRESH_TOKEN; without it
// the route reports `configured: false` and the panel renders a neutral fallback.

export interface NowPlaying {
  name: string;
  artist: string;
  img: string;
  url: string;
  /** true while actively playing; false when this is the last-played fallback */
  playing: boolean;
}

export interface TopTrack {
  name: string;
  artist: string;
  img: string;
  url: string;
}

// Discriminated on `status`: only the "ok" variant carries a payload, so the empty
// states (loading/nokey/error) can't accidentally hold a `now`/`top` — a read of
// either forces a `status === "ok"` narrow first. `now` stays nullable when "ok"
// (configured, but nothing playing and no recent track).
export type MusicState =
  | { status: "loading" | "nokey" | "error" }
  | { status: "ok"; now: NowPlaying | null; top: TopTrack[] };

/** Shape returned by GET /api/spotify. */
export interface MusicPayload {
  configured: boolean;
  now: NowPlaying | null;
  top: TopTrack[];
  error?: boolean;
}

// ── Spotify Web API (only the fields we read) ──
export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}
export interface SpotifyArtistRef {
  name: string;
}
export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtistRef[];
  album?: { images?: SpotifyImage[] };
  external_urls?: { spotify?: string };
}
export interface SpotifyNowResponse {
  item?: SpotifyTrack | null;
  is_playing?: boolean;
  currently_playing_type?: string;
}
export interface SpotifyRecentResponse {
  items?: { track: SpotifyTrack; played_at: string }[];
}
export interface SpotifyTopResponse {
  items?: SpotifyTrack[];
}
