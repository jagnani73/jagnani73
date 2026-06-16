import type { ReactNode } from "react";

// fig.1 masthead interactives (null = no bespoke fig).
export type FigKind =
  | "score"
  | "agents"
  | "wager"
  | "kit"
  | "decoder"
  | "flux"
  | "dao"
  | "zk"
  | "lenden"
  | "nudge"
  | "ledger"
  | "price"
  | "board"
  | "journal"
  | "match"
  | "beacon"
  | "lattice"
  | "tunnel"
  | "marquee";

export interface PlateImg {
  kind: "img";
  src: string;
  /** Caption shown after "plate NN —"; omit for just "plate NN". */
  cap?: string;
  fit?: "cover" | "contain";
}
export interface PlateCode {
  kind: "code";
  code: string;
  cap?: string;
}
export type Plate = PlateImg | PlateCode;

export interface FlowStage {
  stage: string;
  role: string;
  tech?: string[];
}

interface SectionBase {
  /** Heading. Defaults per section type (SECTION_TITLE in case-section.tsx) —
   *  set only to override. `n` is derived from the section's position. */
  title?: string;
  note?: ReactNode;
}

export interface SplitSection extends SectionBase {
  type: "split";
  serif: ReactNode;
  body: ReactNode;
}
export interface ArchSection extends SectionBase {
  type: "arch";
  body: ReactNode;
  flow: FlowStage[];
  stack?: string;
}
export interface CardsSection extends SectionBase {
  type: "cards";
  intro: ReactNode;
  cards: { name: string; desc: string }[];
}
export interface StatsSection extends SectionBase {
  type: "stats";
  stats: [value: string, label: string][];
}
export interface PlatesSection extends SectionBase {
  type: "plates";
  plates: Plate[];
  cta?: { label: string; href: string };
}

export type CaseSection =
  | SplitSection
  | ArchSection
  | CardsSection
  | StatsSection
  | PlatesSection;

interface CaseDataBase {
  slug: string;
  title: string;
  docTitle: string;
  badge: string;
  deck: ReactNode;
  /** Plain-text meta description (~150 chars) for SEO/OG/JSON-LD — the JSX `deck`
   *  can't be used. See generateMetadata in record/[slug]/page.tsx. */
  seoDescription?: string;
  fig: FigKind | null;
  sections: CaseSection[];
  /** Slug of the next case (footer cycling). */
  next: string;
  ogImage?: string;
}

// idx ("01") + rosterSize are injected by getCase; the union keeps them paired.
export type CaseData =
  | (CaseDataBase & { idx?: undefined; rosterSize?: undefined })
  | (CaseDataBase & { idx: string; rosterSize: number });
