import { THEME_TOKENS } from "@/utils/constants/theme-tokens";
import type { ThemeName, ThemeTokens } from "@/utils/types/theme.types";

// One theme's CSS custom properties from its tokens — the only place the
// palette's hex values reach the DOM; globals.css just maps these into Tailwind.
const block = (t: ThemeTokens, logoInk: string, scheme: ThemeName): string =>
  [
    `--bg:${t.bg}`,
    `--bg-rgb:${t.bgRGB}`,
    `--panel:${t.panel}`,
    `--rule:${t.rule}`,
    `--rule-strong:${t.ruleStrong}`,
    `--tx:${t.tx}`,
    `--tx2:${t.tx2}`,
    `--tx3:${t.tx3}`,
    `--pri:${t.pri}`,
    `--sig:${t.sig}`,
    `--acc:${t.acc}`,
    `--flag:${t.flag}`,
    `--ok:${t.ok}`,
    `--pri-rgb:${t.priRGB}`,
    `--sig-rgb:${t.sigRGB}`,
    `--pri-a40:rgba(${t.priRGB},0.4)`,
    `--pri-a18:rgba(${t.priRGB},0.18)`,
    `--pri-a08:rgba(${t.priRGB},0.07)`,
    `--logo-ink:${logoInk}`,
    `color-scheme:${scheme}`,
  ].join(";");

// Injected server-side in the root layout — in the initial HTML, no theme flash.
export const THEME_VARS_CSS =
  `:root,[data-theme="dark"]{${block(THEME_TOKENS.dark, "var(--acc)", "dark")}}` +
  `[data-theme="light"]{${block(THEME_TOKENS.light, "var(--tx)", "light")}}`;
