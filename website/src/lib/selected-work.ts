import { getCase } from "@/content/cases";
import { isCase, RECORD } from "@/content/record";

export interface SelectedWorkItem {
  /** case slug — also the React key */
  id: string;
  /** uppercase display title (from the case registry) */
  title: string;
  meta: string;
  year: string;
  /** acc-colored highlight; replaced by a live metric when `metric` is set */
  tag: string;
  metric?: "agentSdk" | "goldrushKit";
  /** internal /record/[slug] link */
  href: string;
  /** thumbnail (the case's ogImage) — always present; image-less cases are skipped */
  img: string;
}

// Cases whose tag is a live GitHub/npm metric instead of their badge.
const METRIC_BY_SLUG: Record<string, SelectedWorkItem["metric"]> = {
  "agent-sdk": "agentSdk",
  "goldrush-kit": "goldrushKit",
};

// First "·"-segment of a case badge, lowercased → a short headline tag:
// "LIVE · 2026" → "live", "FLUENCE PRIZE · ETHGLOBAL NEW DELHI" → "fluence prize".
const tagFromBadge = (badge: string): string =>
  badge.split("·")[0].trim().toLowerCase();

const slugOf = (url: string): string => url.replace(/^\/record\//, "");

/**
 * Selected Work = the latest `n` case studies, newest-first, derived straight
 * from the record (internal /record entries, already in chronological order).
 * Image-less cases are skipped so every row shows a real thumbnail; title, image,
 * and tag come from the case registry (`getCase`). Adding a case to the record
 * surfaces it here automatically — never curated by hand.
 */
export const getSelectedWork = (n = 6): SelectedWorkItem[] => {
  const items: SelectedWorkItem[] = [];
  for (const r of RECORD) {
    if (items.length >= n) break;
    if (!isCase(r)) continue;
    const slug = slugOf(r.url ?? "");
    const c = getCase(slug);
    if (!c?.ogImage) continue; // no hero image — skip, pull the next case down
    items.push({
      id: slug,
      title: c.title,
      meta: r.meta,
      year: String(r.year),
      tag: tagFromBadge(c.badge),
      metric: METRIC_BY_SLUG[slug],
      href: r.url ?? `/record/${slug}`,
      img: c.ogImage,
    });
  }
  return items;
};
