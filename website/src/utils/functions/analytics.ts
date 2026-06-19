import { sendGAEvent } from "@next/third-parties/google";
import type {
  GameMode,
  Outcome,
  ArcadePage,
  ArcadeGameKey,
} from "@/utils/types/arcade.types";
import type { ArcadeEventPayload } from "@/utils/types/analytics.types";
import {
  getVisitorId,
  getSessionId,
  trackingDisallowed,
} from "@/utils/functions/visitor";

// Arcade telemetry — two best-effort sinks, both gated and both wrapped so a
// blocked dataLayer / sendBeacon never throws out of a game handler:
//   1. GA4 (arcade_view / arcade_start / arcade_play) via sendGAEvent into the
//      property wired in app/layout.tsx — the marketing funnel.
//   2. Our own Postgres sink (/api/arcade-event) — event-level rows powering the
//      undisclosed /arcade/stats dashboard (records, distributions, per-visitor
//      superlatives GA4 can't express).
// Both gate on a production build, so `pnpm dev` sends nothing. The sink's *write*
// is additionally limited to the real production deploy server-side (route.ts
// checks VERCEL_ENV) so Preview traffic can't pollute the stats.

const EMIT_ON = process.env.NODE_ENV === "production";
const SINK_URL = "/api/arcade-event";

const canEmit = (): boolean => EMIT_ON && typeof window !== "undefined";

const ga = (
  name: string,
  params: Record<string, string | number | boolean>,
): void => {
  if (!canEmit()) return;
  try {
    sendGAEvent("event", name, params);
  } catch (err) {
    // expected: a blocked/overridden dataLayer (ad-blockers, privacy extensions)
    console.warn("[arcade] GA event dropped:", name, err);
  }
};

const sink = (payload: ArcadeEventPayload): void => {
  if (!canEmit() || !navigator.sendBeacon) return;
  try {
    navigator.sendBeacon(
      SINK_URL,
      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );
  } catch (err) {
    // expected: sendBeacon blocked by a privacy extension
    console.warn("[arcade] sink beacon dropped:", err);
  }
};

// Identity attached to every sink payload. visitor_id is null when gated/opted
// out; dnt is forwarded so the server can drop the id independently.
const identity = (): Pick<
  ArcadeEventPayload,
  "visitor_id" | "session_id" | "dnt"
> => ({
  visitor_id: getVisitorId(),
  session_id: getSessionId(),
  dnt: trackingDisallowed(),
});

// Per-session, reset on a full reload (a fresh module instance); survives soft
// client-side route navigations.
let sessionPlays = 0;
let winStreak = 0;

interface GameRef {
  game: ArcadeGameKey;
  mode: GameMode;
  page: ArcadePage;
}

// The card was actually seen (entered the viewport) — the funnel's denominator.
export const trackArcadeView = ({ game, mode, page }: GameRef): void => {
  ga("arcade_view", { game, mode, page });
  sink({ type: "view", game, mode, page, ...identity() });
};

// The player first engaged with the game (first move / start tap / first letter).
export const trackArcadeStart = ({ game, mode, page }: GameRef): void => {
  ga("arcade_start", { game, mode, page });
  sink({ type: "start", game, mode, page, ...identity() });
};

interface ArcadePlay extends GameRef {
  outcome: Outcome;
  score: number;
  new_best: boolean;
  /** moves the player made — marks, discs, guesses (omitted when N/A) */
  moves?: number;
  /** round length start→end, ms (only the round right after a start()) */
  duration_ms?: number;
  /** Wordle's opening guess (Wordle only) */
  first_word?: string;
}

// A round ended. Advances the session counters (only when we'll actually emit, so
// they don't drift), then emits to both sinks — so session_plays and win_streak
// reflect this round.
export const trackArcadePlay = (e: ArcadePlay): void => {
  if (!canEmit()) return;
  sessionPlays += 1;
  winStreak = e.outcome === "win" ? winStreak + 1 : 0;

  const params: Record<string, string | number | boolean> = {
    game: e.game,
    mode: e.mode,
    page: e.page,
    outcome: e.outcome,
    score: e.score,
    new_best: e.new_best,
    session_plays: sessionPlays,
    win_streak: winStreak,
  };
  if (e.moves != null) params.moves = e.moves;
  if (e.first_word) params.first_word = e.first_word;
  ga("arcade_play", params);

  sink({
    type: "play",
    game: e.game,
    mode: e.mode,
    page: e.page,
    outcome: e.outcome,
    score: e.score,
    new_best: e.new_best,
    moves: e.moves,
    duration_ms: e.duration_ms,
    first_word: e.first_word,
    session_plays: sessionPlays,
    win_streak: winStreak,
    ...identity(),
  });
};
