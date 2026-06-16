"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { THEME_TOKENS } from "@/utils/constants/theme-tokens";
import type { ThemeTokens } from "@/utils/types/theme.types";

const noop = () => () => {};

// Active theme's tokens for canvas/JS color access. Reports dark on the server
// and the first hydration render (via the useSyncExternalStore snapshot), then
// the resolved theme once mounted — so inlined fig styles don't hydration-mismatch.
export const useThemeTokens = (): ThemeTokens => {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const light = mounted && resolvedTheme === "light";
  return THEME_TOKENS[light ? "light" : "dark"];
};
