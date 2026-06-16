"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// Reports whether an element is on-screen, so canvas islands can pause offscreen.
export const useInView = <T extends Element>(
  options?: IntersectionObserverInit,
): [RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options ?? { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
};
