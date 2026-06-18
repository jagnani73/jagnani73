import type { ComponentType } from "react";

// How the hub decides whether a fresh `score(value)` beats the stored best.
export type GameMode = "min" | "max" | "wins";

// Which page a card is rendered on — the home page (the Person section) vs the
// /arcade all-games board. Rides along on every analytics event so the two can be
// told apart.
export type ArcadePage = "home" | "arcade";

// A finished round's terminal result. "done" = a scored round with no win/lose
// framing (reaction/memory/clicks); win/loss/draw for the head-to-head games.
export type Outcome = "win" | "loss" | "draw" | "done";

// Extra telemetry a game attaches to a finished round (analytics only — it never
// touches the stored best). `score()` lets the card derive `outcome` from the mode
// and passes its value positionally; `end()` requires an explicit `outcome` (and
// carries no score). `word` is Wordle's opening guess.
export interface RoundDetail {
  outcome?: Outcome;
  /** moves the player made — marks, discs, or guesses */
  moves?: number;
  /** Wordle's opening guess */
  word?: string;
}

// Every game is a self-contained playfield. It calls `start()` once when the
// player first engages, `score(value, detail?)` when a round ends in a recorded
// result (which also updates the best + fires confetti/sound), and `end(detail)`
// for a terminal round that sets no best — a loss/draw/fail (telemetry only, so it
// requires the `outcome`). The hub owns chrome, bests, confetti, sound, and the
// analytics wiring.
export interface GameProps {
  score: (value: number, detail?: RoundDetail) => void;
  start: () => void;
  end: (detail: RoundDetail & { outcome: Outcome }) => void;
}

export interface ArcadeGame {
  /** localStorage suffix: `arcade.best.<key>` — never change once shipped */
  key: string;
  label: string;
  mode: GameMode;
  /** owner's record, shown as MINE (placeholder until real values land) */
  mine: number;
  /** suffix on the formatted score; "" = no suffix, "ms" gets special formatting */
  unit: "ms" | "lvl" | "×" | "";
  Comp: ComponentType<GameProps>;
}
