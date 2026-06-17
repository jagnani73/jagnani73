"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Mark } from "./mark";
import type { SiteRailProps } from "@/utils/types/component.types";

const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  return (
    <button
      type="button"
      title="toggle light / dark"
      aria-label="toggle light and dark theme"
      suppressHydrationWarning
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="cursor-pointer font-mono leading-none text-tx2 transition-colors hover:text-sig"
    >
      {isLight ? "◑" : "◐"}
    </button>
  );
};

const Logo = ({ size, home }: { size: number; home?: boolean }) => {
  // Hover plays one round-trip (YJ → `>_` → YJ) that always finishes — no pause
  // on mouse-out. [data-rail-logo] marks the box the splash collapses onto.
  const [playing, setPlaying] = useState(false);
  const mark = (
    <span
      data-rail-logo
      onMouseEnter={() => setPlaying(true)}
      onAnimationEnd={() => setPlaying(false)}
      className="inline-flex leading-none"
    >
      <Mark size={size} animate={playing} mode="hover" className="block" />
    </span>
  );
  return home ? (
    <span className="block leading-none">{mark}</span>
  ) : (
    <Link href="/" className="block leading-none" aria-label="Home">
      {mark}
    </Link>
  );
};

export const SiteRail = ({ page, home }: SiteRailProps) => {
  return (
    <>
      {/* Mobile: sticky top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-rule bg-bg px-4 py-2.5 rail:hidden">
        <span className="flex items-center gap-2.5">
          <Logo size={40} home={home} />
          <span className="font-mono text-xs text-tx2">jagnani73</span>
        </span>
        <span className="flex items-center gap-4">
          <span className="text-xl leading-none">
            <ModeToggle />
          </span>
          <span className="font-mono text-[11px] text-tx3">{page}</span>
        </span>
      </div>

      {/* Desktop: fixed 64px left rail */}
      <div className="fixed inset-y-0 left-0 z-50 hidden w-16 border-r border-rule bg-bg rail:block">
        <span className="absolute left-1/2 top-[12px] -translate-x-1/2">
          <Logo size={50} home={home} />
        </span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-xs tracking-[0.3em] text-tx3">
          EST. 2019 — BLOCKCHAIN · AI · SOFTWARE
        </span>
        <span className="absolute bottom-14 left-1/2 -translate-x-1/2 text-base">
          <ModeToggle />
        </span>
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-tx3">
          {page}
        </span>
      </div>
    </>
  );
};
