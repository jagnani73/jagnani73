"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Mark } from "./mark";

interface SiteRailProps {
  /** Page tag shown at the rail/bar edge, e.g. "P.01", "R.01", "P.03". */
  page: string;
  /** When false, the logo links back to home; when true (on home) it doesn't. */
  home?: boolean;
}

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
  // One inline mark, theme-coloured via --logo-ink. Hovering plays a single
  // round-trip (YJ → `>_` → YJ) that always finishes — no pause on mouse-out.
  // [data-rail-logo] marks the box the first-land splash collapses onto.
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
      {/* Mobile: sticky top bar (≤1200) */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-rule bg-bg px-4 py-2.5 rail:hidden">
        <span className="flex items-center gap-2.5">
          <Logo size={26} home={home} />
          <span className="font-mono text-xs text-tx2">jagnani73</span>
        </span>
        <span className="flex items-center gap-4">
          <span className="text-xl leading-none">
            <ModeToggle />
          </span>
          <span className="font-mono text-[11px] text-tx3">{page}</span>
        </span>
      </div>

      {/* Desktop: fixed 64px left rail (≥1201) */}
      <div className="fixed inset-y-0 left-0 z-50 hidden w-16 border-r border-rule bg-bg rail:block">
        <span className="absolute left-1/2 top-[12px] -translate-x-1/2">
          <Logo size={46} home={home} />
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
