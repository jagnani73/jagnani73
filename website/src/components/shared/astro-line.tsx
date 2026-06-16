"use client";

import { useSyncExternalStore } from "react";
import { ASTRO_FACTS } from "@/utils/constants/site";

// Picked once per page load, stable across renders. Server renders index 0
// (deterministic SSR); after hydration it swaps to this random pick. Bare text,
// so it inherits the surrounding type.
const clientIndex =
  typeof window === "undefined"
    ? 0
    : Math.floor(Math.random() * ASTRO_FACTS.length);

const subscribe = () => () => {};

export const AstroLine = () => {
  const idx = useSyncExternalStore(
    subscribe,
    () => clientIndex,
    () => 0
  );

  return <>{ASTRO_FACTS[idx]}</>;
};
