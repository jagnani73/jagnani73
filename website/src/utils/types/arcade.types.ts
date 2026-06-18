import type { ComponentType } from "react";

// How the hub decides whether a fresh `score(value)` beats the stored best.
export type GameMode = "min" | "max" | "wins";

// Every game is a self-contained playfield that calls `score(value)` at the end
// of a round (or on a win); the hub owns chrome, bests, confetti, and sound.
export interface GameProps {
  score: (value: number) => void;
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
