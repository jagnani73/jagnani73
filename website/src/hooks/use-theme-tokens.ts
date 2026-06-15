"use client";

import { useTheme } from "next-themes";
import { THEME_TOKENS, type ThemeTokens } from "@/lib/theme-tokens";

// Returns the active theme's token object for canvas/JS color access.
// Falls back to dark tokens before next-themes resolves (first client render).
export const useThemeTokens = (): ThemeTokens => {
  const { resolvedTheme } = useTheme();
  return THEME_TOKENS[resolvedTheme === "light" ? "light" : "dark"];
};
