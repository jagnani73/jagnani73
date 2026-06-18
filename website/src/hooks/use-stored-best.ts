"use client";

import { useCallback, useSyncExternalStore } from "react";

// The visitor's arcade bests, persisted under `arcade.best.<gameKey>`. Exposed as
// an external store (useSyncExternalStore) rather than state-synced-in-an-effect:
// the server snapshot is null, the client reads localStorage, and writeBest()
// notifies subscribers (plus cross-tab `storage` events) so the YOU cell updates.

const keyOf = (k: string) => "arcade.best." + k;
const listeners = new Set<() => void>();

export const readBest = (key: string): number | null => {
  try {
    const v = localStorage.getItem(keyOf(key));
    return v == null ? null : Number(v);
  } catch {
    return null;
  }
};

export const writeBest = (key: string, v: number): void => {
  try {
    localStorage.setItem(keyOf(key), String(v));
  } catch {
    /* storage may be unavailable (private mode) — fail silently */
  }
  listeners.forEach((l) => l());
};

export const useStoredBest = (key: string): number | null => {
  const subscribe = useCallback(
    (cb: () => void) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === keyOf(key)) cb();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key],
  );
  return useSyncExternalStore(
    subscribe,
    () => readBest(key),
    () => null,
  );
};
