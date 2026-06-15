"use client";

import { useMediaQuery } from "./use-media-query";

// Single editorial breakpoint: ≤1200 → compact/mobile, ≥1201 → desktop rail.
// Use ONLY where JS genuinely needs the boolean (e.g. short labels in the agent
// graph); prefer CSS `rail:` / `max-rail:` variants for layout.
export const useIsMobile = (bp = 1200): boolean =>
  useMediaQuery(`(max-width: ${bp}px)`, false);
