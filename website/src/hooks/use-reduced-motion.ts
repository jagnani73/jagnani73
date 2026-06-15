"use client";

import { useMediaQuery } from "./use-media-query";

// True when the user prefers reduced motion. Canvas islands use this to render
// a single resolved end-state frame instead of running a requestAnimationFrame loop.
export const useReducedMotion = (): boolean =>
  useMediaQuery("(prefers-reduced-motion: reduce)", false);
