"use client";

import { useMediaQuery } from "./use-media-query";

// True when the user prefers reduced motion — canvas islands render a static
// end-state frame instead of running a rAF loop.
export const useReducedMotion = (): boolean =>
  useMediaQuery("(prefers-reduced-motion: reduce)", false);
