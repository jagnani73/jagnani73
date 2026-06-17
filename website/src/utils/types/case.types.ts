import type { ComponentType, ReactNode } from "react";

// A case fig.1 — the animated masthead island (components/canvas/figs/*).
export type Fig = ComponentType<{ mob: boolean; active?: boolean }>;

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

interface SectionMeta {
  /** Heading override; defaults per type via SECTION_TITLE in case-section.tsx. */
  title?: string;
  note?: ReactNode;
}

export interface SplitSection extends SectionMeta {
  serif: ReactNode;
  body: ReactNode;
}
export interface ArchSection extends SectionMeta {
  body: ReactNode;
  flow: FlowStage[];
  stack?: string;
}
export interface CardsSection extends SectionMeta {
  intro: ReactNode;
  cards: { name: string; desc: string }[];
}
export interface StatsSection extends SectionMeta {
  stats: [value: string, label: string][];
}
export interface PlatesSection extends SectionMeta {
  plates: Plate[];
  cta?: { label: string; href: string };
}

// Authored as an object keyed by section type — insertion order is render order.
export interface CaseSections {
  split?: SplitSection;
  arch?: ArchSection;
  cards?: CardsSection;
  stats?: StatsSection;
  plates?: PlatesSection;
}

// Discriminated union the renderer consumes — `orderedSections` tags each entry
// with its key (see cases/index.ts).
export type CaseSection =
  | ({ type: "split" } & SplitSection)
  | ({ type: "arch" } & ArchSection)
  | ({ type: "cards" } & CardsSection)
  | ({ type: "stats" } & StatsSection)
  | ({ type: "plates" } & PlatesSection);

// The /record/[slug] detail. It hangs off its record row (content/record.ts):
// the slug, title and roster position all come from the row — see getCase.
export interface CaseDetail {
  /** Masthead/SEO display name, when it differs from the record-row title. */
  displayTitle?: string;
  /** Doc/SEO name when it differs from the display title; else derived from it. */
  docName?: string;
  /** Plain-text meta description (~150 chars) for SEO/OG/JSON-LD — the JSX `deck`
   *  can't be used. See generateMetadata in record/[slug]/page.tsx. */
  seoDescription?: string;
  badge: string;
  deck: ReactNode;
  /** fig.1 component + its screen-reader label (the role="img" accessible name). */
  fig?: Fig;
  figAlt?: string;
  sections: CaseSections;
  // Resolved by getCase from the record row — never authored on the detail.
  slug?: string;
  title?: string;
  docTitle?: string;
  idx?: string;
  rosterSize?: number;
}
