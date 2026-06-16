"use client";

import { useMediaQuery } from "./use-media-query";

// Editorial breakpoint: ≤1200 → mobile, ≥1201 → desktop. Use only where JS needs
// the boolean; prefer CSS `rail:` / `max-rail:` variants for layout.
export const useIsMobile = (bp = 1200): boolean =>
  useMediaQuery(`(max-width: ${bp}px)`, false);
