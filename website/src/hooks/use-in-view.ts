"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// Observes an element and reports whether it is on-screen. Canvas islands use it
// to pause their animation loop when scrolled out of view.
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
