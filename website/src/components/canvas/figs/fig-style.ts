import type { CSSProperties } from "react";
import type { ThemeTokens } from "@/lib/theme-tokens";

// Shared "card" surface used across the case figs: hairline rule + panel fill.
export const figPanel = (t: ThemeTokens): CSSProperties => ({
  border: `1px solid ${t.rule}`,
  borderRadius: 6,
  background: t.panel,
});
