"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { THEME_TOKENS, type ThemeTokens } from "@/lib/theme-tokens";

const noop = () => () => {};

// Returns the active theme's token object for canvas/JS color access.
//
// next-themes resolves the stored theme synchronously on the client, so reading
// `resolvedTheme` during hydration would render the user's theme while the server
// rendered the default — a mismatch for figs that inline these values as styles.
// We therefore report dark on the server AND the first hydration render (via the
// useSyncExternalStore server snapshot), then switch to the resolved theme once
// mounted. Canvas islands draw in effects (post-mount) so they pick up the right
// theme immediately; SVG/HTML figs briefly show the default before resolving.
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
