import type { ReactNode } from "react";

// fig.1 masthead interactives (null = no bespoke fig, e.g. derived project cases).
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
  cap: string;
  fit?: "cover" | "contain";
}
export interface PlateCode {
  kind: "code";
  code: string;
  cap: string;
}
export type Plate = PlateImg | PlateCode;

export interface FlowStage {
  stage: string;
  role: string;
  tech?: string[];
}

interface SectionBase {
  n: string;
  title: string;
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
// Derived (non-authored) project cases render their markdown description here.
export interface ProseSection extends SectionBase {
  type: "prose";
  markdown: string;
  stack?: string;
}

export type CaseSection =
  | SplitSection
  | ArchSection
  | CardsSection
  | StatsSection
  | PlatesSection
  | ProseSection;

interface CaseDataBase {
  slug: string;
  title: string;
  docTitle: string;
  badge: string;
  deck: ReactNode;
  /** Plain-text meta description (~150 chars) for SEO/OG/JSON-LD. Authored cases
   *  set this because their `deck` is JSX; derived cases fall back to the string
   *  `deck`. See generateMetadata in record/[slug]/page.tsx. */
  seoDescription?: string;
  fig: FigKind | null;
  sections: CaseSection[];
  /** Slug of the next case (footer cycling). */
  next: string;
  ogImage?: string;
}

// Roster index ("01") + size are injected by getCase for authored cases only;
// derived project cases carry neither. The union keeps them travelling together.
export type CaseData =
  | (CaseDataBase & { idx?: undefined; rosterSize?: undefined })
  | (CaseDataBase & { idx: string; rosterSize: number });
