import type { ArcadeGameKey } from "@/utils/types/arcade.types";

// Server-safe display metadata for the arcade games. Mirrors the display fields
// of the ARCADE_GAMES registry (home/arcade-games.tsx), which is "use client" and
// carries the game components — so it can't be imported into the server-rendered
// /arcade/stats page. Keys are stable (they're localStorage suffixes, never
// renamed). Score formatting matches ArcadeCard's `fmt`.
// NOTE: keep label/unit in sync with the registry (small, deliberate duplication
// — a unit added there but not here renders as a bare number).
export const GAME_META: Record<ArcadeGameKey, { label: string; unit: string }> =
  {
    reaction: { label: "Reaction test", unit: "ms" },
    memory: { label: "Memory", unit: "lvl" },
    clicks: { label: "Quick clicks", unit: "" },
    ttt: { label: "Tic-tac-toe", unit: "×" },
    c4: { label: "Connect 4", unit: "×" },
    wordle: { label: "Mini wordle", unit: "×" },
  };

// The closed set of game keys, derived from GAME_META — the single runtime source
// for the sink's allowlist (route.ts) so it can't drift from this list.
export const ARCADE_GAME_KEYS = Object.keys(GAME_META) as ArcadeGameKey[];

export const gameLabel = (key: ArcadeGameKey): string => GAME_META[key].label;

export const formatScore = (key: ArcadeGameKey, v: number | null): string => {
  if (v == null) return "—";
  const unit = GAME_META[key].unit;
  return unit === "ms" ? `${v} ms` : unit ? `${v} ${unit}` : `${v}`;
};
