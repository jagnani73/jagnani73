import { sendGAEvent } from "@next/third-parties/google";
import type { GameMode, Outcome, ArcadePage } from "@/utils/types/arcade.types";

// Arcade → GA4. Emits three events (arcade_view / arcade_start / arcade_play)
// into the GoogleAnalytics property wired in app/layout.tsx — no extra script,
// no extra dependency. Everything is gated to production so local `pnpm dev`
// never pollutes the stream (NODE_ENV is "development" under `pnpm dev` and
// "production" for a built/deployed site). The session counters are module-scope:
// they live for one page session and ride along on every play, giving the "cool
// stats" (games played this visit + current win streak) with no server.

const PROD = process.env.NODE_ENV === "production";

// Production + client only. Telemetry is best-effort: a missing `window` (SSR) or
// a blocked/overridden `dataLayer` (ad-blockers, privacy extensions) must never
// throw out of a game's event handler and freeze the UI — so emits are wrapped.
const canEmit = (): boolean => PROD && typeof window !== "undefined";

const emit = (
  name: string,
  params: Record<string, string | number | boolean>,
): void => {
  if (!canEmit()) return;
  try {
    sendGAEvent("event", name, params);
  } catch (err) {
    console.error("[arcade] GA event dropped:", name, err);
  }
};

// Per-session, reset on a full reload (a fresh module instance); survives soft
// client-side route navigations.
let sessionPlays = 0;
let winStreak = 0;

interface GameRef {
  game: string;
  mode: GameMode;
  page: ArcadePage;
}

// The card was actually seen (entered the viewport) — the funnel's denominator.
export const trackArcadeView = ({ game, mode, page }: GameRef): void =>
  emit("arcade_view", { game, mode, page });

// The player first engaged with the game (first move / start tap / first letter).
export const trackArcadeStart = ({ game, mode, page }: GameRef): void =>
  emit("arcade_start", { game, mode, page });

interface ArcadePlay extends GameRef {
  outcome: Outcome;
  score: number;
  new_best: boolean;
  /** moves the player made — marks, discs, guesses (omitted when N/A) */
  moves?: number;
  /** Wordle's opening guess (Wordle only) */
  first_word?: string;
}

// A round ended. Advances the session counters (only when we'll actually emit, so
// they don't drift), then emits — so session_plays and win_streak reflect this
// round.
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
  emit("arcade_play", params);
};
