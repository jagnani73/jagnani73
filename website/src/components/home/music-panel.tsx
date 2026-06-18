"use client";

import { useEffect, useState } from "react";
import type { MusicPayload, MusicState } from "@/utils/types/music.types";

// "On rotation" — now-playing (→ last-played fallback) + the 4-week top tracks,
// served by the /api/spotify route (the Spotify secret stays server-side). Polls
// so now-playing stays roughly live; renders a neutral fallback until the Spotify
// env vars are set (route reports `configured: false`).

const POLL_MS = 60_000;
const PROFILE = "https://open.spotify.com";
const MONO = "var(--font-jetbrains), monospace";
const SANS = "var(--font-dm-sans), sans-serif";

const Eq = () => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "flex-end",
      gap: "2px",
      height: "10px",
    }}
  >
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="eq-bar"
        style={{ width: "2.5px", animationDelay: i * 0.15 + "s" }}
      />
    ))}
  </span>
);

export const MusicPanel = () => {
  const [st, setSt] = useState<MusicState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify");
        // fetch only rejects on network errors, not HTTP status — guard res.ok so
        // a 5xx isn't fed to res.json() and mis-read as "not configured".
        if (!res.ok) {
          if (!cancelled) setSt({ status: "error" });
          return;
        }
        const data = (await res.json()) as MusicPayload;
        if (cancelled) return;
        if (!data.configured) {
          setSt({ status: "nokey" });
        } else if (data.error) {
          setSt({ status: "error" });
        } else {
          setSt({ status: "ok", now: data.now, top: data.top });
        }
      } catch {
        if (!cancelled) setSt({ status: "error" });
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const now = st.status === "ok" ? st.now : null;
  const playing = !!now?.playing;
  const heroLink = now?.url || PROFILE;

  return (
    <div
      style={{
        border: "1px solid var(--rule)",
        borderRadius: "6px",
        overflow: "hidden",
        background: "var(--panel)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 13px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: "10.5px",
            letterSpacing: "0.12em",
            color: "var(--pri)",
          }}
        >
          NOW SPINNING
        </span>
        <a
          href={heroLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: MONO, fontSize: "10px", color: "var(--tx3)" }}
        >
          {playing ? "spotify · live ↗" : "spotify ↗"}
        </a>
      </div>

      {/* now playing / last played */}
      <a
        href={heroLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          gap: "12px",
          padding: "13px",
          borderBottom: "1px solid var(--rule)",
          alignItems: "center",
          color: "inherit",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            flexShrink: 0,
            borderRadius: "4px",
            border: "1px solid var(--rule)",
            background:
              now && now.img ? `center/cover url("${now.img}")` : "var(--bg)",
          }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginBottom: "5px",
            }}
          >
            {playing ? <Eq /> : null}
            <span
              style={{
                fontFamily: MONO,
                fontSize: "9.5px",
                letterSpacing: "0.1em",
                color: playing ? "var(--sig)" : "var(--tx3)",
              }}
            >
              {playing ? "NOW PLAYING" : now ? "LAST PLAYED" : "RECENTLY"}
            </span>
          </div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--tx)",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {now ? now.name : "—"}
          </p>
          <p
            style={{
              fontFamily: MONO,
              fontSize: "11.5px",
              color: "var(--tx2)",
              margin: "2px 0 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {now
              ? now.artist
              : st.status === "loading"
                ? "loading…"
                : "spotify — offline"}
          </p>
        </div>
      </a>

      {/* top tracks · 4 weeks */}
      <div style={{ padding: "12px 13px", flex: 1 }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: "9.5px",
            letterSpacing: "0.1em",
            color: "var(--tx3)",
            margin: "0 0 9px",
          }}
        >
          ON REPEAT · 4 WEEKS
        </p>
        {(st.status === "ok" && st.top.length
          ? st.top
          : [null, null, null, null]
        ).map((t, i) => {
          const row = (
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ display: "flex", gap: "9px", minWidth: 0 }}>
                <span style={{ fontFamily: MONO, fontSize: "10px", color: "var(--pri)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "13px",
                    color: t ? "var(--tx)" : "var(--tx3)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t ? t.name : "—"}
                </span>
              </span>
              {t ? (
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    color: "var(--tx3)",
                    whiteSpace: "nowrap",
                    maxWidth: "42%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.artist}
                </span>
              ) : null}
            </span>
          );
          return (
            <div
              key={i}
              style={{
                padding: "5px 0",
                borderBottom: i < 3 ? "1px solid var(--rule)" : "none",
              }}
            >
              {t ? (
                <a
                  href={t.url || PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", display: "block" }}
                >
                  {row}
                </a>
              ) : (
                row
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
