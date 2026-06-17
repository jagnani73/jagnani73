import { getCase, getCaseImage } from "@/content/cases";
import { RECORD } from "@/content/record";
import type { SelectedWorkItem } from "@/utils/types/home.types";

// Cases whose tag is a live GitHub/npm metric instead of their badge.
const METRIC_BY_SLUG: Record<string, SelectedWorkItem["metric"]> = {
  "agent-sdk": "agentSdk",
  "goldrush-kit": "goldrushKit",
};

// First "·"-segment of a badge, lowercased ("LIVE · 2026" → "live").
const tagFromBadge = (badge: string): string =>
  badge.split("·")[0].trim().toLowerCase();

// Latest `n` cases, newest-first, derived from the record (never curated).
// The thumbnail is the case's first img plate; image-less cases are skipped.
export const getSelectedWork = (n = 6): SelectedWorkItem[] => {
  const items: SelectedWorkItem[] = [];
  for (const r of RECORD) {
    if (items.length >= n) break;
    if (!r.slug) continue;
    const slug = r.slug;
    const c = getCase(slug);
    if (!c) continue;
    const img = getCaseImage(c);
    if (!img) continue; // no img plate — skip, pull the next case down
    items.push({
      id: slug,
      title: c.title,
      meta: r.meta,
      year: String(r.year),
      tag: tagFromBadge(c.badge),
      metric: METRIC_BY_SLUG[slug],
      img,
    });
  }
  return items;
};
