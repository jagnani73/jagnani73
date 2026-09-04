import {
  DOCUMENT_BASE,
  DOCUMENT_OWNER,
  DOCUMENT_PREVIEW_BASE,
} from "@/utils/constants/site";
import type {
  DocumentCategory,
  ResolvedDocument,
} from "@/utils/types/document.types";

// Everything the byte endpoint (`document-route.ts`) and the viewer page
// (`document-page.tsx`) must agree on, in one module so they cannot drift.
//
// Both of them turn the same `(category, variant)` pair into the same upstream
// URL and the same human-facing label. When those lived in the route alone, the
// viewer would have needed its own copy of the slug regex and the title-casing
// rule — and a second copy of a naming rule that *already* spans two
// repositories (see `titleCase`) is how the same document ends up reaching a
// recruiter under two different names.

/**
 * The shape a variant segment must have: lowercase alphanumerics in
 * hyphen-separated runs, with no leading, trailing or doubled hyphen. It is the
 * same pattern the sibling repo mints its slugs with, so anything rejected here
 * could not have been published in the first place.
 *
 * It is also the whole path-traversal defence, by exclusion: `/`, `\`, `.`,
 * `%`, `:` and `,` are all outside the class, so `..` cannot form, a decoded
 * `%2F`/`%5C` cannot introduce a path segment, and no scheme or host can be
 * spelled. `resolve` re-checks the assembled URL regardless.
 */
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Cloudinary's own public_id ceiling is far higher, but nothing this repo
 * publishes comes near 64 characters, and an unbounded segment is a free way to
 * push junk into the logs and into the upstream cache key.
 */
export const MAX_SLUG_LENGTH = 64;

/** Both callers reject a segment the same way, before it reaches a URL. */
export const validSlug = (slug: string) =>
  slug.length <= MAX_SLUG_LENGTH && SLUG.test(slug);

/**
 * `blockchain` → `Blockchain`, `open-source` → `Open Source`.
 *
 * **This naming rule now lives in two repositories and they have to agree.**
 * The scheme originates in the sibling `cv-cl` repo's
 * `scripts/Publish-Release.ps1`, which title-cases the same slug into the same
 * bracketed label for the PDF it writes to disk (`... [Resume - Blockchain]`).
 * The one deliberate difference is the date: the sibling's on-disk name carries
 * one, this download name does not — the path always resolves to the current
 * build, so a date here would be a claim the URL cannot keep. Change the casing
 * in one repo and the same document reaches a recipient under two different
 * names depending on where they got it from.
 */
export const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/** `Resume`, or `Resume - Blockchain` once a variant is appended. */
export const documentLabel = (
  category: DocumentCategory,
  variant: string | null,
) => (variant ? `${category.label} - ${titleCase(variant)}` : category.label);

/**
 * Resolve the slug against the base, then check the *result*, after `new URL()`
 * has normalised away any dot segments. Checking the string before the parser
 * collapses the dot segments is the bug: a `.../cv-cl/../../image/fetch/...`
 * starts with the base right up until it is normalised. `DOCUMENT_BASE` ends in
 * a slash, so the check cannot be satisfied by a sibling folder either.
 *
 * Returns `null` rather than throwing: a caller that cannot build a URL has a
 * miss on its hands, not a crash.
 */
export const resolve = (
  category: DocumentCategory,
  variant: string | null,
): ResolvedDocument | null => {
  const slug = variant ? `${category.slug}-${variant}` : category.slug;

  let url: string;
  try {
    url = new URL(`${slug}.pdf`, DOCUMENT_BASE).href;
  } catch {
    return null;
  }
  if (!url.startsWith(DOCUMENT_BASE)) return null;

  const label = documentLabel(category, variant);

  return { url, label, filename: `${DOCUMENT_OWNER} [${label}].pdf` };
};

/**
 * The OG card: page one of this very PDF, rasterised by Cloudinary.
 *
 * Built by appending the already-validated upstream URL to the fetch prefix, so
 * the only thing that can appear here is a URL `resolve` has already asserted
 * sits under `DOCUMENT_BASE`. It is *not* encoded — Cloudinary's fetch takes a
 * bare remote URL as the tail of the path, and percent-encoding it yields a
 * 404.
 *
 * Renders as nothing until the two Cloudinary console settings noted on
 * `DOCUMENT_PREVIEW_BASE` are set. That degrades to a card with a title and no
 * image, which is still better than today's bare link.
 */
export const previewUrl = (upstream: string) =>
  `${DOCUMENT_PREVIEW_BASE}${upstream}`;

/**
 * Does the upstream actually hold this document?
 *
 * Only the viewer asks, and only for a *variant*: a page that framed a variant
 * the sibling repo never published would render the general document under a
 * URL and a title promising a specific one — a recruiter would be told they are
 * reading "Resume - Blockchain" while looking at the general résumé. The byte
 * endpoint needs no such check; it learns the same thing from the response it
 * is already making.
 *
 * HEAD, so a miss costs headers rather than 250KB. Anything that is not a clean
 * 200 counts as absent: an upstream that is down should send the visitor to the
 * general document, which the CDN is far more likely to be holding anyway.
 */
export const upstreamExists = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    return res.ok;
  } catch {
    return false;
  }
};
