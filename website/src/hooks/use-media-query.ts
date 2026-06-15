"use client";

import { useCallback, useSyncExternalStore } from "react";

// Subscribes to a CSS media query without synchronous setState-in-effect.
// serverFallback is what SSR / the first hydration render reports.
export const useMediaQuery = (query: string, serverFallback = false): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
};
