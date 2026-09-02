/**
 * One of the three PDFs this site serves. The set is closed and hardcoded in
 * `DOCUMENTS` (`utils/constants/site.ts`) — nothing here is ever built from a
 * request.
 */
export interface SiteDocument {
  /** Upstream Cloudinary URL. `resource_type` is `raw`, so `.pdf` is part of
   *  the public_id rather than a format suffix. */
  url: string;
  /** The path this site streams it at — also where the legacy `/api/*` route
   *  redirects and where the home résumé link points. */
  path: string;
  /** `Content-Disposition` download name. No date: the link always resolves to
   *  the current build, so a date on it would be a claim the URL can't keep. */
  filename: string;
}
