"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

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
  const img = (
    <Image
      src="/logo.svg"
      alt="YJ"
      width={size}
      height={size}
      className="rounded-md"
      priority
    />
  );
  return home ? (
    <span className="block leading-none">{img}</span>
  ) : (
    <Link href="/" className="block leading-none">
      {img}
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
          <span className="text-sm">
            <ModeToggle />
          </span>
          <span className="font-mono text-[11px] text-tx3">{page}</span>
        </span>
      </div>

      {/* Desktop: fixed 64px left rail (≥1201) */}
      <div className="fixed inset-y-0 left-0 z-50 hidden w-16 border-r border-rule bg-bg rail:block">
        <span className="absolute left-1/2 top-[22px] -translate-x-1/2">
          <Logo size={30} home={home} />
        </span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap font-mono text-xs tracking-[0.3em] text-tx3">
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
