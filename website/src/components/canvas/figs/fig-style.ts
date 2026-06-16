import type { CSSProperties } from "react";
import type { ThemeTokens } from "@/utils/types/theme.types";

export const MONO = "var(--font-mono)";

// Shared fig "card" surface: hairline rule + panel fill.
export const figPanel = (t: ThemeTokens): CSSProperties => ({
  border: `1px solid ${t.rule}`,
  borderRadius: 6,
  background: t.panel,
});
