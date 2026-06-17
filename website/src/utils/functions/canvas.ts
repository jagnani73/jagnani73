// Tiny shared helpers for the 2D-canvas islands (band, constellation).

/** Device-pixel-ratio capped at 2 — retina is enough; uncapped 3×+ just wastes fill. */
export const dpr = (): number => Math.min(window.devicePixelRatio || 1, 2);

/** `rgba()` from an "r,g,b" triplet — the form ThemeTokens stores as `priRGB`/`sigRGB`. */
export const rgba = (rgb: string, alpha: number): string => `rgba(${rgb},${alpha})`;
