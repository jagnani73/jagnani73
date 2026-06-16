import type { ReactNode, RefObject } from "react";

// ── shared/mark ──
export type MarkMode = "splash" | "loop" | "hover";
export interface MarkProps {
  size?: number;
  /** Play the assembly animation. Otherwise render the static assembled mark. */
  animate?: boolean;
  /** splash = assemble + hold · loop = assemble↔disassemble · hover = round-trip. */
  mode?: MarkMode;
  className?: string;
  label?: string;
}

// ── shared/site-rail ──
export interface SiteRailProps {
  /** Page tag shown at the rail/bar edge, e.g. "P.01". */
  page: string;
  /** When false, the logo links back to home; when true (on home) it doesn't. */
  home?: boolean;
}

// ── shared/page-shell ──
export interface PageShellProps {
  /** Page tag shown in the rail, e.g. "P.01". */
  page: string;
  /** True only on the home page (logo stops linking to itself). */
  home?: boolean;
  children: ReactNode;
}

// ── home/section-head ──
export interface SectionHeadProps {
  /** Outlined leading numeral, e.g. "01". */
  n: string;
  title: string;
  note?: ReactNode;
  id?: string;
}

// ── record/year-mark ──
export interface YearMarkProps {
  year: number;
  atEnd: boolean;
  mob: boolean;
  onConfirm: (top: number) => void;
}

// ── canvas/time-constellation ──
export interface TimeConstellationProps {
  scrollVel: RefObject<number>;
  bursts: RefObject<number[]>;
  mob: boolean;
  gut: number;
}
