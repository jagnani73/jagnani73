// Single source of truth for the whole palette: canvas/OG read these tokens, and
// theme-css.ts generates the globals.css custom properties from them.

import type { ThemeName, ThemeTokens } from "@/utils/types/theme.types";

export const THEME_TOKENS: Record<ThemeName, ThemeTokens> = {
  dark: {
    bg: "#081012",
    bgRGB: "8,16,18",
    fluidBg: "#070E10",
    panel: "#0E181B",
    rule: "#1D2E32",
    ruleStrong: "#2E4449",
    tx: "#EAF4F6",
    tx2: "#8FA8AD",
    tx3: "#60797F",
    pri: "#2FA8B8",
    sig: "#6FD8E4",
    acc: "#D9A441",
    flag: "#D9756F",
    ok: "#54B37F",
    priRGB: "47,168,184",
    sigRGB: "111,216,228",
  },
  light: {
    bg: "#ECE8E0",
    bgRGB: "236,232,224",
    fluidBg: "#ECE8E0",
    panel: "#F4F1EA",
    rule: "#CFC9BC",
    ruleStrong: "#B3AC9D",
    tx: "#1A1D1F",
    tx2: "#50575E",
    tx3: "#6E747A",
    pri: "#2B6CA3",
    sig: "#134E75",
    acc: "#9A6B12",
    flag: "#AE3B2C",
    ok: "#2E7D4F",
    priRGB: "43,108,163",
    sigRGB: "19,78,117",
  },
};
