"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "./mark";

const ASSEMBLE_MS = 2700; // assemble (~2.5s) + a short hold
const COLLAPSE_MS = 650; // YJ flies into the rail logo

// Module-scoped, not persisted: plays once per page load, survives client-side
// route changes (layout keeps <Splash/> mounted); a hard reload replays it.
let played = false;

// First-land splash. SSR-rendered (on screen from first paint, no flash of the
// page under it), assembles the YJ once, then collapses onto the live rail logo
// via a measured FLIP. Quick fade under reduced motion.
export const Splash = () => {
  const [done, setDone] = useState(played);
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (played) return;

    const finish = () => {
      played = true;
      setDone(true);
    };

    const overlay = overlayRef.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      if (!overlay) {
        finish();
        return;
      }
      const fade = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        delay: 400,
        fill: "forwards",
      });
      fade.finished.then(finish).catch(finish);
      return;
    }

    const timer = window.setTimeout(() => {
      const mark = markRef.current;
      const target = [
        ...document.querySelectorAll<HTMLElement>("[data-rail-logo]"),
      ].find((el) => el.getBoundingClientRect().width > 0);

      if (!mark || !overlay || !target) {
        finish();
        return;
      }

      const from = mark.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const scale = to.width / from.width;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);

      overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: COLLAPSE_MS,
        easing: "ease-in",
        fill: "forwards",
      });
      const move = mark.animate(
        [
          { transform: "translate(0, 0) scale(1)" },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        ],
        {
          duration: COLLAPSE_MS,
          easing: "cubic-bezier(0.7, 0, 0.2, 1)",
          fill: "forwards",
        },
      );
      move.finished.then(finish).catch(finish);
    }, ASSEMBLE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="splash-overlay fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <div ref={markRef} className="leading-none">
        <Mark animate size={180} className="block" />
      </div>
    </div>
  );
};
