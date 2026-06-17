import type { CaseDetail } from "./case.types";

export type Kind =
  | "EXPERIENCE"
  | "COMMUNITY"
  | "PROJECT"
  | "HACKATHON"
  | "RESEARCH"
  | "EDUCATION"
  | "CERTIFICATION";

export interface RecordEntry {
  year: number;
  kind: Kind;
  title: string;
  meta: string;
  via?: string;
  /** Authored case slug → same-tab /record/[slug] link; marks the row a case.
   *  Mutually exclusive with `url`. */
  slug?: string;
  /** The /record/[slug] detail — present on case rows (alongside `slug`). */
  case?: CaseDetail;
  /** External link (opens in a new tab). */
  url?: string;
  win?: boolean;
  /** Explicit within-year sort key — these lead, ascending, ahead of kind rank. */
  order?: number;
}

// The kinds plus the two synthetic filters.
export type FilterId = Kind | "ALL" | "CASES";
