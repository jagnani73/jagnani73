import type { Kind, RecordEntry, FilterId } from "@/utils/types/record.types";

// Client-safe record helpers + config. Imports no case content, so the
// interactive timeline (record-client, year-mark) can use these without pulling
// case bodies/figs into the /record client bundle.

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "CASES", label: "CASE STUDIES" },
  { id: "EXPERIENCE", label: "EXPERIENCE" },
  { id: "PROJECT", label: "PROJECTS" },
  { id: "HACKATHON", label: "HACKATHONS" },
  { id: "COMMUNITY", label: "COMMUNITY" },
  { id: "RESEARCH", label: "RESEARCH" },
  { id: "EDUCATION", label: "EDUCATION" },
  { id: "CERTIFICATION", label: "CERTIFICATIONS" },
];

export const KIND_COLOR: Record<Kind, string> = {
  EXPERIENCE: "text-sig",
  COMMUNITY: "text-tx2",
  HACKATHON: "text-tx2",
  RESEARCH: "text-tx2",
  EDUCATION: "text-pri",
  CERTIFICATION: "text-tx3",
  PROJECT: "text-tx2",
};

export const kindColor = (r: RecordEntry): string =>
  r.kind === "HACKATHON" && r.win ? "text-acc" : KIND_COLOR[r.kind];

// A `slug` marks an authored case row.
export const isCase = (r: RecordEntry): boolean => r.slug !== undefined;

// Stable per-row identity — year+title is unique across RECORD. Used as both the
// React key and the hover key so the two can never drift apart.
export const rowKey = (r: RecordEntry): string => r.year + r.title;

// Within-year order: experience → project (+ its paired hackathon win) →
// standalone hackathons → research → community → education → certs. A hackathon
// pairs to its project when the project title prefixes the hackathon's meta.
const KIND_RANK: Record<Kind, number> = {
  EXPERIENCE: 0,
  PROJECT: 1,
  HACKATHON: 2,
  RESEARCH: 3,
  COMMUNITY: 4,
  EDUCATION: 5,
  CERTIFICATION: 6,
};

// Explicit `order` leads; else kind rank, offset so explicit keys sort first.
const seqRank = (e: RecordEntry): number => e.order ?? 10 + KIND_RANK[e.kind];

export const sequenceYear = (entries: RecordEntry[]): RecordEntry[] => {
  const ranked = entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => seqRank(a.e) - seqRank(b.e) || a.i - b.i)
    .map((x) => x.e);

  const hackathons = ranked.filter((e) => e.kind === "HACKATHON");
  const used = new Set<RecordEntry>();
  const result: RecordEntry[] = [];

  for (const e of ranked) {
    if (e.kind === "HACKATHON" && used.has(e)) continue;
    result.push(e);
    if (e.kind === "PROJECT") {
      const hack = hackathons.find(
        (h) =>
          !used.has(h) && h.meta.toLowerCase().startsWith(e.title.toLowerCase())
      );
      if (hack) {
        used.add(hack);
        result.push(hack);
      }
    }
  }
  return result;
};

// Deterministic "0x…" hash shown beside a confirmed year.
export const yearHash = (y: number): string => {
  let h = (y * 2654435761) >>> 0;
  let s = "";
  for (let i = 0; i < 4; i++) {
    s += "0123456789abcdef"[h & 15];
    h = (h * 69069 + 1) >>> 0;
    h ^= h >>> 7;
  }
  return "0x" + s;
};
