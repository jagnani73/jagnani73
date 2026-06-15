"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

// A modular interval counter (0 → mod-1) for the DOM-based case figs.
// Pauses when offscreen (`active` false) and freezes at `staticValue` for
// prefers-reduced-motion so the fig shows a resolved frame instead of animating.
export const useTick = (
  ms: number,
  mod: number,
  active = true,
  staticValue?: number,
): number => {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    const id = setInterval(() => setT((x) => (x + 1) % mod), ms);
    return () => clearInterval(id);
  }, [reduced, active, ms, mod]);

  return reduced ? (staticValue ?? mod - 1) : t;
};
