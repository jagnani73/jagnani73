import type { ReactNode, RefObject } from "react";
import type { ArcadeGame, ArcadePage } from "@/utils/types/arcade.types";

// ── home/arcade-card ──
export interface ArcadeCardProps {
  game: ArcadeGame;
  /** Which page the card lives on — home (the Person section) vs the /arcade board. */
  page: ArcadePage;
}

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

// ── shared/cta-term ──
export interface CtaTermProps {
  /** Omit to render a non-link `<span>` (e.g. a badge inside a clickable row). */
  href?: string;
  /** The label content (text or JSX). */
  children: ReactNode;
  /** Render an external `<a target="_blank">` instead of a next/link. */
  external?: boolean;
  /** The trailing/leading arrow glyph (default "→"); "←" pairs with arrowSide "left". */
  arrow?: "→" | "←";
  /** Which side the arrow sits on (default "right"); "left" flips the hover slide. */
  arrowSide?: "left" | "right";
  /** Extra classes (e.g. grid placement) merged onto the link. */
  className?: string;
}

// ── shared/section-head ──
export interface SectionHeadProps {
  /** Outlined leading numeral, e.g. "01". */
  n: string;
  title: string;
  note?: ReactNode;
  /** "page" = home sections (anchored, larger); "case" = case-study sections. */
  source: "page" | "case";
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
