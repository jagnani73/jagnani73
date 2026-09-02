/**
 * A document *category* — the résumé, the CV or the cover letter. A category
 * resolves to a family of upstream PDFs: `<slug>.pdf` is the category default
 * and `<slug>-<variant>.pdf` is one variant of it (a résumé profile, a
 * per-company cover letter).
 *
 * **Only categories are registered. Variants are never listed** — not here and
 * not anywhere else in this public repo: a committed list of company slugs
 * would be a permanent, crawlable record of every company applied to. A variant
 * request is validated by *shape* (see `documentVariantRoute`) and the upstream
 * decides whether it exists; an absent one is a miss, not an error.
 */
export interface DocumentCategory {
  /**
   * Upstream slug — the stem of the `cv-cl/<slug>.pdf` Cloudinary public_id,
   * and the prefix every variant of this category extends. It is a constant of
   * this module and never comes from a request.
   */
  slug: string;
  /**
   * The path this site serves the category at. Also where the legacy `/api/*`
   * route redirects, where the home résumé link points, and where a missed
   * variant is sent. Every category is served from an optional catch-all at
   * this path, so a category with no variants published yet needs no different
   * shape from one that has them.
   */
  path: string;
  /**
   * The bracketed label in the download name: `… [Resume].pdf`, or
   * `… [Resume - Blockchain].pdf` once a variant is appended. Must agree with
   * the sibling `cv-cl` repo's label for the same category — see `titleCase`
   * in `utils/functions/document-route.ts`.
   */
  label: string;
}

/**
 * One resolved PDF: a category plus at most one variant, reduced to what the
 * streaming handler needs. Built only after the variant has passed the slug
 * regex *and* the assembled URL has been asserted to stay under
 * `DOCUMENT_BASE`.
 */
export interface ResolvedDocument {
  /** Absolute Cloudinary URL, asserted to still sit under `DOCUMENT_BASE`. */
  url: string;
  /** `Content-Disposition` download name. */
  filename: string;
  /** The requested path (`/resume`, `/resume/blockchain`) — for logs only. */
  path: string;
}

/**
 * What Next passes a `[[...variant]]` route handler. `variant` is `undefined`
 * on the bare category path and a one-element array on `/<category>/<variant>`;
 * a deeper path arrives as more elements and is rejected rather than joined.
 *
 * Next splits the path on `/` *before* percent-decoding, so a `%2F` (or `%5C`)
 * lands as a literal slash inside a single element rather than creating a new
 * one — which is exactly why the segment is validated after decoding.
 */
export interface VariantRouteContext {
  params: Promise<{ variant?: string[] }>;
}
