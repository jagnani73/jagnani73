// Hand-maintained types for jsonb columns. `drizzle-kit pull` can't infer a
// shape for jsonb, so it types such columns `unknown`; these are applied back to
// the generated schema via `.$type<>()` (see schema.ts — re-apply after a pull).

// RESERVED — not yet wired. arcade_events.detail exists (DB default `{}`) but
// NOTHING reads or writes it today: the beacon payload has no `detail`, the route
// omits it, and the stats page never queries it. This is the forward-compat shape
// for per-game signals (Wordle guess sequences, per-attempt reaction times, board
// state) to be captured later WITHOUT a migration — a new signal is just a new
// key. Every field is optional; the index signature keeps it open-ended.
export interface ArcadeDetail {
  /** Wordle — the full guess sequence, in order */
  guesses?: string[];
  /** Wordle — number of guesses taken */
  numGuesses?: number;
  /** Reaction — every individual reaction time in the round (ms) */
  reactionTimes?: number[];
  /** Memory — board dimension, e.g. 4 for a 4×4 grid */
  gridSize?: number;
  /** TTT / Connect-4 — did the player move first */
  wentFirst?: boolean;
  /** forward-compatible: new signals need no type change */
  [key: string]: unknown;
}
