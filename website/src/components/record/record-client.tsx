"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RECORD, FILTERS, kindColor, isCase, sequenceYear } from "@/content/record";
import type { FilterId, RecordEntry } from "@/utils/types/record.types";
import { TimeConstellation } from "@/components/canvas/time-constellation";
import { YearMark } from "./year-mark";
import { BackToTop } from "@/components/shared/back-to-top";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const GUTTER = 168;

const RecordRow = ({
  entry: r,
  mob,
  hovered,
  onHover,
}: {
  entry: RecordEntry;
  mob: boolean;
  hovered: boolean;
  onHover: (key: string) => void;
}) => {
  const key = r.year + r.title;
  // `slug` → internal /record/[slug]; else an optional external `url`.
  const href = r.slug ? `/record/${r.slug}` : r.url;
  const kind = (
    <span
      className={`font-mono tracking-widest ${kindColor(r)} ${
        mob ? "mb-0.5 block text-[11px]" : "inline text-[12px]"
      }`}
      style={{ paddingTop: 4 }}
    >
      {r.kind}
    </span>
  );
  const meta = (
    <span
      className="font-mono text-tx2"
      style={{ fontSize: mob ? 10.5 : 11.5 }}
    >
      {r.via ? <span className="text-tx3">via {r.via} · </span> : null}
      {r.meta}
    </span>
  );
  const arrow = (
    <span
      className="font-mono text-[12.5px]"
      style={{ color: href ? "var(--pri)" : "var(--rule)" }}
    >
      {href ? "↗" : ""}
    </span>
  );

  const content = mob ? (
    <>
      <span className="min-w-0 font-semibold" style={{ fontSize: 14.5 }}>
        {kind}
        {r.title}
        <span className="mt-0.5 block">{meta}</span>
      </span>
      {arrow}
    </>
  ) : (
    <>
      {kind}
      <span className="min-w-0 text-[16px] font-semibold">{r.title}</span>
      {meta}
      {arrow}
    </>
  );

  const style: React.CSSProperties = {
    gridTemplateColumns: mob
      ? "1fr 20px"
      : "104px minmax(0,0.72fr) minmax(0,1.28fr) 30px",
    gap: mob ? 10 : 32,
    padding: mob ? "10px 14px" : "17px 44px 17px 28px",
    flex: "1 0 auto",
    alignContent: "center",
  };
  const cls = `grid items-baseline border-b border-rule transition-colors ${
    hovered ? "bg-pri-a08" : ""
  }`;

  if (!href) {
    return (
      <div className={cls} style={style}>
        {content}
      </div>
    );
  }
  const handlers = {
    onMouseEnter: () => onHover(key),
    onMouseLeave: () => onHover(""),
  };
  return r.slug ? (
    <Link href={href} className={cls} style={style} {...handlers}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
      {...handlers}
    >
      {content}
    </a>
  );
};

export const RecordClient = ({
  counts,
}: {
  counts: Record<FilterId, number>;
}) => {
  const [filter, setFilter] = useState<FilterId>("ALL");
  const [hov, setHov] = useState("");
  const [atEnd, setAtEnd] = useState(false);
  const scrollVel = useRef(0);
  const bursts = useRef<number[]>([]);
  const mob = useIsMobile();
  const reduced = useReducedMotion();
  const gut = mob ? 96 : GUTTER;

  // scroll velocity → constellation drift. The decay rAF runs only while there's
  // velocity to bleed off (never under reduced motion / hidden tab), so an idle
  // page holds no frame loop. The constellation reads this value from its own loop.
  useEffect(() => {
    if (reduced) return;
    let lastY = window.scrollY;
    let raf: number | null = null;

    const decay = () => {
      scrollVel.current *= 0.94;
      if (Math.abs(scrollVel.current) < 0.01 || document.hidden) {
        scrollVel.current = 0;
        raf = null;
        return;
      }
      raf = requestAnimationFrame(decay);
    };

    const onScroll = () => {
      scrollVel.current =
        scrollVel.current * 0.5 + (window.scrollY - lastY) * 0.5;
      lastY = window.scrollY;
      if (raf === null && !document.hidden) raf = requestAnimationFrame(decay);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  // atEnd → confirm the final years at page bottom
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setAtEnd(max <= 0 || window.scrollY >= max - 60);
    };
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const data = RECORD.filter((r) =>
    filter === "ALL" ? true : filter === "CASES" ? isCase(r) : r.kind === filter
  );
  const years = [...new Set(data.map((r) => r.year))].sort((a, b) => b - a);

  return (
    <>
      <TimeConstellation
        scrollVel={scrollVel}
        bursts={bursts}
        mob={mob}
        gut={gut}
      />

      {/* opaque so it sits over the fixed constellation */}
      <div className="relative z-[1] bg-bg">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 font-mono text-[13.5px] text-tx3 rail:grid rail:grid-cols-[1fr_auto_1fr] rail:px-11 rail:pb-4 rail:pt-6">
          <Link
            href="/"
            className="text-tx2 transition-colors hover:text-sig rail:justify-self-start"
          >
            ← the front page
          </Link>
          <span className="hidden rail:inline rail:-translate-x-8 rail:justify-self-center">
            THE PORTFOLIO OF RECORD — COMPLETE
          </span>
          <span className="rail:justify-self-end">
            STATUS: <span className="text-acc">NTU SINGAPORE — AUG 2026</span>
          </span>
        </div>
        <div className="h-px bg-rule-strong" />

        <div className="flex flex-wrap items-baseline justify-between gap-3 px-4 pb-2 pt-4 rail:px-11 rail:pb-3 rail:pt-6">
          <h1 className="m-0 whitespace-nowrap font-display text-[clamp(36px,11vw,48px)] tracking-[0.01em] rail:text-[clamp(48px,5.5vw,80px)]">
            THE RECORD
          </h1>
          <span className="font-serif text-[clamp(20px,2vw,28px)] italic text-tx2">
            2019 → now, nothing exiled
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 px-4 pb-3.5 pt-1 rail:gap-2 rail:px-11 rail:pb-[18px]">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                aria-label={`Filter: ${f.label} (${counts[f.id] ?? 0})`}
                className={`cursor-pointer rounded-full px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] transition-colors rail:px-[15px] rail:py-1.5 rail:text-[12.5px] ${
                  active
                    ? "border border-pri bg-pri-a18 text-sig"
                    : "border border-rule text-tx2 hover:text-sig"
                }`}
              >
                {f.label}{" "}
                <span className={active ? "text-pri" : "text-tx3"}>
                  {counts[f.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
        <div className="h-px bg-rule" />
      </div>

      <div>
        {years.map((y) => (
          <div
            key={filter + y}
            className="relative grid items-stretch"
            style={{ gridTemplateColumns: `${gut}px 1fr` }}
          >
            <YearMark
              year={y}
              atEnd={atEnd}
              mob={mob}
              onConfirm={(top) => bursts.current.push(top)}
            />
            <div className="relative z-[1] flex flex-col border-l border-rule bg-bg">
              {sequenceYear(data.filter((r) => r.year === y)).map((r) => (
                <RecordRow
                  key={r.year + r.title}
                  entry={r}
                  mob={mob}
                  hovered={hov === r.year + r.title}
                  onHover={setHov}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-1 bg-bg">
        <div className="h-px bg-rule-strong" />
        <div className="flex flex-wrap justify-between gap-1.5 px-4 pb-[18px] pt-3 font-mono text-[12px] text-tx3 rail:px-11 rail:pb-6 rail:pt-4">
          <span>© 2026 YASHVARDHAN JAGNANI</span>
          <BackToTop />
        </div>
      </div>
    </>
  );
};
