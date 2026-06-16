"use client";

import { useSyncExternalStore } from "react";
import { ASTRO_FACTS } from "@/content/astro-facts";

// Picked once per client page load (module eval), so it's stable across renders.
// The server renders index 0 (deterministic SSR); after hydration it swaps to
// this random pick. A hard reload re-evaluates the module → a fresh fact.
// Renders bare text so it inherits the surrounding type (e.g. the footer mono).
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
