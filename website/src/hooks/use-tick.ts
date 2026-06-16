"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

// Modular interval counter (0 → mod-1) for DOM case figs. Pauses when `active`
// is false; freezes at `staticValue` under reduced-motion for a static frame.
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
