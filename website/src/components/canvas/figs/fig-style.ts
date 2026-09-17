import type { CSSProperties } from "react";
import type { FigState } from "@/utils/types/fig.types";
import type { ThemeTokens } from "@/utils/types/theme.types";

// The shared rules every case fig.1 draws from, documented in CLAUDE.md under
// "Fig rules". A fig that needs a value missing here adds it here.

export const MONO = "var(--font-mono)";

// Letter-spacing for uppercase `label` text.
export const FIG_TRACK = "0.08em";

// The fig body surface: hairline rule + panel fill. Every fig sits on one.
export const figPanel = (t: ThemeTokens): CSSProperties => ({
  border: `1px solid ${t.rule}`,
  borderRadius: 6,
  background: t.panel,
});

// A box, row or chip drawn inside the panel; `edge` is its state colour when lit.
export const figBox = (t: ThemeTokens, edge?: string): CSSProperties => ({
  border: `1px solid ${edge ?? t.rule}`,
  borderRadius: 6,
  background: t.bg,
});

// Type scale in px, [mobile, desktop].
export const FIG_TYPE = {
  label: [10, 10], // uppercase column heads, FIG_TRACK, tx3
  sub: [9.5, 10.5], // the secondary line under a value, tx3
  body: [11, 12.5], // primary text in a row or box
  title: [12.5, 14], // the value a box exists to show
  display: [16, 20], // one hero number, at most one per fig
} as const;

export const figType = (k: keyof typeof FIG_TYPE, mob: boolean): number =>
  FIG_TYPE[k][mob ? 0 : 1];

// Panel body heights in px, [mobile, desktop]. A fig picks one and fits it.
export const FIG_H = {
  sm: [152, 170],
  md: [172, 192],
  lg: [210, 220],
} as const;

export const figH = (k: keyof typeof FIG_H, mob: boolean): number =>
  FIG_H[k][mob ? 0 : 1];

// useTick beat lengths in ms. A reveal advances one element per beat, then
// holds the finished frame for FIG_HOLD beats before it loops.
export const FIG_BEAT = { quick: 620, base: 820, slow: 1000 } as const;
export const FIG_HOLD = 3;

// rAF loops take phase = (time * FIG_SPEED[k]) % 1, so 0.0004 is a 2.5s cycle
// and 0.00016 a 6.25s one.
export const FIG_SPEED = {
  quick: 0.0004,
  base: 0.00025,
  slow: 0.00016,
} as const;

// Unrevealed elements sit at FIG_DIM; every state change uses FIG_EASE.
export const FIG_DIM = 0.18;
export const FIG_EASE = "all 0.4s";

// State → colour. `active` is whatever is moving or being checked right now.
export const figTone = (t: ThemeTokens, s: FigState): string =>
  ({
    idle: t.ruleStrong,
    active: t.sig,
    ok: t.ok,
    refused: t.flag,
    muted: t.tx3,
  })[s];
