import { RECORD } from "@/content/record";
import type {
  CaseDetail,
  CaseSection,
  CaseSections,
  PlateImg,
  ResolvedCase,
} from "@/utils/types/case.types";

// Keeps the legacy /record/ai-agent-sdk URL resolving to the authored case.
const SLUG_ALIASES: Record<string, string> = { "ai-agent-sdk": "agent-sdk" };

// The case rows, in record order — the single source for slug / idx / next.
type RecordCaseRow = (typeof RECORD)[number] & { slug: string; case: CaseDetail };
const CASE_ROWS = RECORD.filter(
  (r): r is RecordCaseRow => r.slug !== undefined && r.case !== undefined
);

const ROSTER = CASE_ROWS.map((r) => r.slug);
const ROSTER_SIZE = ROSTER.length;

// Resolves a slug to its detail merged with the row's title + roster position.
// The return guarantees the derived fields, unlike the authored CaseDetail.
export const getCase = (slug: string): ResolvedCase | null => {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  const pos = ROSTER.indexOf(canonical);
  if (pos < 0) return null;
  const row = CASE_ROWS[pos];
  const title = row.case.displayTitle ?? row.title;
  return {
    ...row.case,
    slug: canonical,
    title,
    docTitle: `${row.case.docName ?? title} — Case Study`,
    idx: String(pos + 1).padStart(2, "0"),
    rosterSize: ROSTER_SIZE,
  };
};

export const getAllCaseSlugs = (): string[] => ROSTER;

export const getCaseTitle = (slug: string): string =>
  getCase(slug)?.title ?? slug;

// Next case in roster order (wraps) — drives the plates-section "next case" CTA.
export const getNextSlug = (slug: string): string => {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  const i = ROSTER.indexOf(canonical);
  return i < 0 ? canonical : ROSTER[(i + 1) % ROSTER_SIZE];
};

// The case's representative image — the first img plate (image-less cases yield
// undefined and are skipped from Selected Work).
export const getCaseImage = (c: CaseDetail): string | undefined =>
  c.sections.plates?.plates.find((p): p is PlateImg => p.kind === "img")?.src;

// Sections authored as a keyed object → the tagged union the renderer consumes,
// in insertion (display) order. Entries are typed per-key (a `CaseSections` ⇄
// `CaseSection` drift becomes a compile error) so only the final tag cast remains.
export const orderedSections = (sections: CaseSections): CaseSection[] => {
  type SectionEntry = {
    [K in keyof CaseSections]-?: [K, NonNullable<CaseSections[K]>];
  }[keyof CaseSections];
  return (Object.entries(sections) as SectionEntry[]).map(
    ([type, sec]) => ({ type, ...sec }) as CaseSection,
  );
};
