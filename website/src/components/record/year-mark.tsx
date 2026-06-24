"use client";

import { useEffect, useRef, useState } from "react";
import { ConsensusBlock } from "./consensus-block";
import { yearHash } from "@/content/record-lib";
import { MOBILE_BAR_H } from "@/utils/constants/site";
import type { YearMarkProps } from "@/utils/types/component.types";

// Sticky year + consensus glyph. Confirms after holding ~900ms in the reading
// band, reverts on leave; atEnd covers the final years at page bottom.
export const YearMark = ({ year, atEnd, mob, onConfirm }: YearMarkProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        if (visible) timer = setTimeout(() => setHeld(true), 900);
        else setHeld(false);
      },
      { rootMargin: "0px 0px -45% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const conf = held || atEnd;

  useEffect(() => {
    if (conf && ref.current) {
      onConfirm(ref.current.getBoundingClientRect().top + 30);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conf]);

  return (
    <div
      ref={ref}
      className="sticky z-1 self-start"
      style={{
        top: mob ? MOBILE_BAR_H : 0,
        padding: mob ? "6px 8px 12px 12px" : "16px 20px 16px 40px",
      }}
    >
      <span
        className="inline-block rounded"
        style={{
          background: "rgba(var(--bg-rgb),0.82)",
          backdropFilter: "blur(3px)",
          padding: "4px 10px 4px 4px",
        }}
      >
        <span className="flex items-center" style={{ gap: mob ? 6 : 12 }}>
          <ConsensusBlock conf={conf} mob={mob} />
          <span
            className="font-display leading-none"
            style={{
              fontSize: mob ? 20 : 32,
              color: conf ? "var(--sig)" : "transparent",
              WebkitTextStroke: conf ? "0" : "1px var(--rule-strong)",
              transition: "color 0.45s",
            }}
          >
            {year}
          </span>
        </span>
        <span
          className="block font-mono"
          style={{
            fontSize: mob ? 9 : 10,
            color: "var(--tx3)",
            opacity: conf ? 1 : 0,
            transition: "opacity 0.4s 0.35s",
            paddingLeft: mob ? 30 : 46,
          }}
        >
          {yearHash(year)} ✓
        </span>
      </span>
    </div>
  );
};
