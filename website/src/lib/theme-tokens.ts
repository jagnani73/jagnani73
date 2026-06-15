// Single source of truth for canvas/JS color access (replaces the prototype's
// window.PAGE_THEME global). The UI reads CSS custom properties from globals.css;
// canvas islands read these typed objects via the useThemeTokens() hook.

export type ThemeName = "dark" | "light";

export interface ThemeTokens {
  bg: string;
  bgRGB: string;
  fluidBg: string;
  panel: string;
  rule: string;
  ruleStrong: string;
  tx: string;
  tx2: string;
  tx3: string;
  pri: string;
  sig: string;
  acc: string;
  flag: string;
  ok: string;
  priRGB: string;
  sigRGB: string;
}

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
