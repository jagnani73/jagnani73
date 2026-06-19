import type { ArcadeGameKey, GameMode } from "./arcade.types";

// Result shapes for the /arcade/stats dashboard (utils/functions/arcade-stats.ts).
// These are computed aggregates, not table rows, so they're defined here rather
// than inferred from the DB schema (which types the raw arcade_events row).

export interface ArcadeTotals {
  views: number;
  starts: number;
  plays: number;
  visitors: number;
  playMs: number;
}

export interface GamePlays {
  game: ArcadeGameKey;
  plays: number;
}

export interface GameBest {
  game: ArcadeGameKey;
  mode: GameMode;
  /** best score derived by mode: min → fastest, max → highest, wins → win count */
  best: number | null;
}

export interface LetterStat {
  letter: string;
  n: number;
  pct: number;
}

export interface WordStat {
  word: string;
  n: number;
}

export interface VisitorTop {
  /** shortened anonymous label, e.g. "#1a2b" — never the full id */
  label: string;
  plays: number;
  game?: ArcadeGameKey;
}

export interface ArcadeStats {
  /** true when the DB is wired up (false only when DATABASE_URL is absent — an
   * expected Preview/dev state, rendered as a quiet "not configured" fallback) */
  configured: boolean;
  /** true when a query threw — an UNEXPECTED failure (e.g. schema drift after a
   * db:pull). Kept distinct from configured/empty so it doesn't hide as "no data" */
  errored: boolean;
  totals: ArcadeTotals;
  byGame: GamePlays[];
  bests: GameBest[];
  fastestReaction: number | null;
  longestStreak: number | null;
  letters: LetterStat[];
  topWords: WordStat[];
  topVisitorOverall: VisitorTop | null;
  topVisitorGame: VisitorTop | null;
}
