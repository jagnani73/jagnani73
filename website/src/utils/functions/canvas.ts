// Tiny shared helpers for the 2D-canvas islands (band, constellation).

/** Device-pixel-ratio capped at 2 — retina is enough; uncapped 3×+ just wastes fill. */
export const dpr = (): number => Math.min(window.devicePixelRatio || 1, 2);

/** `rgba()` from an "r,g,b" triplet — the form ThemeTokens stores as `priRGB`/`sigRGB`. */
export const rgba = (rgb: string, alpha: number): string => `rgba(${rgb},${alpha})`;

/** Hex token (`#rrggbb` / `#rgb`) → an "r,g,b" triplet, so any token can feed `rgba()`. */
export const hexRgb = (hex: string): string => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
};
