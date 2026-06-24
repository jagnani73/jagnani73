"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useStoredBest, readBest, writeBest } from "@/hooks/use-stored-best";
import { dpr as getDpr } from "@/utils/functions/canvas";
import { rnd, rndf } from "@/utils/functions/random";
import {
  trackArcadeView,
  trackArcadeStart,
  trackArcadePlay,
} from "@/utils/functions/analytics";
import type {
  GameMode,
  Outcome,
  RoundDetail,
} from "@/utils/types/arcade.types";
import type { ArcadeCardProps } from "@/utils/types/component.types";

// One game's frame: header (label + the MINE/YOU bests), the playfield (a query
// container — see `.arcade-play` in globals.css — that grows to fit and stacks the
// board above the panel on a narrow card), and a confetti overlay. The home hub and
// the all-games board render the same card — the hub just picks one game at random.

const MONO = "var(--font-jetbrains), monospace";
const labelStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: "12px",
  letterSpacing: "0.1em",
  color: "var(--tx)",
  textTransform: "uppercase",
};

// A short rising arpeggio (WebAudio) on a win — sound, not motion, so it isn't
// gated on reduced-motion; the confetti is.
const chime = () => {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ac = new Ctx();
    const now = ac.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      o.connect(g);
      g.connect(ac.destination);
      const t = now + i * 0.085;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.start(t);
      o.stop(t + 0.32);
    });
    setTimeout(() => ac.close(), 1500);
  } catch {
    /* AudioContext blocked (autoplay policy / no gesture) — skip the chime */
  }
};

const beats = (mode: GameMode, value: number, prev: number | null): boolean => {
  if (mode === "min") return prev == null || value < prev;
  if (mode === "max") return prev == null || value > prev;
  return true; // "wins" — every win increments
};

export const ArcadeCard = ({ game, page }: ArcadeCardProps) => {
  const tokens = useThemeTokens();
  const reduced = useReducedMotion();
  const yours = useStoredBest(game.key);
  const confRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  // Timestamp of the last start(), so the hub can attach round duration centrally
  // (no per-game wiring). Consumed once per round, so only the round immediately
  // after a start() carries a duration — others report null rather than a wrong
  // value (start() fires once per engagement, not once per round).
  const startedAtRef = useRef<number | null>(null);

  // Fire one `arcade_view` the first time the card is ≥50% in view (threshold 0.5
  // — so a tall card on a very short viewport may never trip it). The home hub
  // sits well below the fold, so a mount-time impression would over-count; gating
  // on intersection also means the hub's reaction→random placeholder swap has long
  // settled by the time the section is scrolled to.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          trackArcadeView({ game: game.key, mode: game.mode, page });
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [game.key, game.mode, page]);

  const celebrate = () => {
    chime();
    const cv = confRef.current;
    if (reduced || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const ratio = getDpr();
    const w = cv.clientWidth,
      h = cv.clientHeight;
    cv.width = w * ratio;
    cv.height = h * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const cols = [tokens.sig, tokens.acc, tokens.ok, tokens.flag, tokens.tx];
    const P = Array.from({ length: 44 }, () => ({
      x: w / 2,
      y: h * 0.4,
      vx: (rndf() - 0.5) * 9,
      vy: -4 - rndf() * 7,
      c: cols[rnd(cols.length)],
      s: 3 + rndf() * 4,
      r: rndf() * 6,
      vr: (rndf() - 0.5) * 0.4,
      life: 1,
    }));
    const t0 = performance.now();
    const loop = (t: number) => {
      const dt = Math.min((t - t0) / 1000, 1.4);
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      P.forEach((p) => {
        p.life = 1 - dt / 1.4;
        if (p.life <= 0) return;
        alive = true;
        const px = p.x + p.vx * dt * 60,
          py = p.y + p.vy * dt * 60 + 0.5 * 18 * dt * dt * 60;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(px, py);
        ctx.rotate(p.r + p.vr * dt * 60);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 1.6);
        ctx.restore();
      });
      if (alive && dt < 1.4) requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, w, h);
    };
    requestAnimationFrame(loop);
  };

  // Emit one arcade_play with the given outcome, score, and best flag.
  const fire = (
    outcome: Outcome,
    value: number,
    newBest: boolean,
    detail?: RoundDetail,
  ): void => {
    const startedAt = startedAtRef.current;
    const duration_ms =
      startedAt != null ? Math.round(performance.now() - startedAt) : undefined;
    startedAtRef.current = null; // consume — next round needs its own start()
    trackArcadePlay({
      game: game.key,
      mode: game.mode,
      page,
      outcome,
      score: value,
      new_best: newBest,
      moves: detail?.moves,
      duration_ms,
      first_word: detail?.word,
    });
  };

  const score = (value: number, detail?: RoundDetail) => {
    const prev = readBest(game.key);
    const improved = beats(game.mode, value, prev);
    const nb =
      game.mode === "wins" ? (prev || 0) + 1 : improved ? value : prev!;
    writeBest(game.key, nb); // notifies useStoredBest → the YOU cell updates
    if (improved) celebrate();
    // Outcome from the detail when the game set one, else derived from the mode
    // ("win" for the wins games, "done" for the scored ones).
    fire(
      detail?.outcome ?? (game.mode === "wins" ? "win" : "done"),
      value,
      improved,
      detail,
    );
  };

  // A terminal round that records no best — a loss/draw/fail. Telemetry only, so
  // it carries no score (always 0) and requires the outcome.
  const end = (detail: RoundDetail & { outcome: Outcome }) =>
    fire(detail.outcome, 0, false, detail);

  const start = () => {
    startedAtRef.current = performance.now();
    trackArcadeStart({ game: game.key, mode: game.mode, page });
  };

  const Comp = game.Comp;
  const fmt = (v: number | null) =>
    v == null
      ? "—"
      : game.unit === "ms"
        ? v + " ms"
        : v + (game.unit ? " " + game.unit : "");

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        background: "var(--panel)",
        border: "1px solid var(--rule)",
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 15px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={labelStyle}>{game.label}</div>
        </div>
        {/* MINE/YOU bests, at the right end of the title row */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            fontFamily: MONO,
            fontSize: "11px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span>
            <span style={{ color: "var(--tx3)" }}>MINE </span>
            <span style={{ color: "var(--acc)" }}>{fmt(game.mine)}</span>
          </span>
          <span>
            <span style={{ color: "var(--tx3)" }}>YOU </span>
            <span style={{ color: "var(--sig)" }}>{fmt(yours)}</span>
          </span>
        </div>
      </div>

      {/* playfield — a query container; grows to fit, stacks board over panel on
          a narrow card (see `.arcade-play` / `.arcade-game-row` in globals.css) */}
      <div className="arcade-play">
        <Comp score={score} start={start} end={end} />
        <canvas
          ref={confRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};
