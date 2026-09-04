import { DOCUMENT_BASE } from "@/utils/constants/site";
import { resolve, validSlug } from "@/utils/functions/document-resolve";
import type {
  DocumentCategory,
  VariantRouteContext,
} from "@/utils/types/document.types";

// The route handler behind every document's *bytes*: /f/resume, /f/cv,
// /f/cover-letter and /f/<any of those>/<variant>.
//
// It is not what a person is given any more. `/resume` is an HTML viewer page
// (`document-page.tsx`) that frames this endpoint and links to it for the
// download; this route is what that frame and that link point at. The split
// exists because a PDF response carries no `<head>`, so nothing pasted into
// Slack or LinkedIn could ever unfurl — and because several mobile in-app
// browsers hand a top-level PDF to a download prompt no header can override.
//
// All three categories are optional catch-alls and behave identically — there
// is no fixed-route special case for any of them, and adding one would be the
// start of the drift this factory exists to prevent.
//
// A *category* (`DOCUMENTS` in `utils/constants/site.ts`) is registered; a
// *variant* never is. `/resume/blockchain` and `/cover-letter/circle` resolve
// to `cv-cl/resume-blockchain.pdf` and `cv-cl/cover-letter-circle.pdf`, and the
// sibling `cv-cl` repo alone decides which of those exist. There is
// deliberately **no allowlist**: a list of company slugs committed to this
// public repo would be a permanent record of every company applied to.
//
// Three rules make a request-derived slug safe. All three are load-bearing:
//
//   1. Validate the DECODED segment before it touches any URL — `SLUG` below,
//      capped at `MAX_SLUG_LENGTH`, and exactly zero or one segment.
//   2. Assert the FINAL, normalised URL still sits under `DOCUMENT_BASE`.
//      Both rules 1 and 2 live in `document-resolve.ts`, shared with the viewer
//      page so the two cannot disagree about what a valid slug is.
//   3. Split the failure branch by cause — an absent document redirects to the
//      category default, anything else is a 502. See `serve` below.
//
// Every handler streams rather than 302ing to Cloudinary, so the document is
// served from this origin: the URL in the address bar stays jagnani73.com, the
// download name is ours to set, and `Referrer-Policy` below is actually
// applied. (The one 302 here goes to *this* site's own default path, never
// upstream.)

/** Long enough for a cold Cloudinary edge, short enough to fail fast. */
const TIMEOUT_MS = 10_000;

const FAILED = "document temporarily unavailable";

/**
 * RFC 5987 §3.2 `ext-value`. `encodeURIComponent` leaves `' ( ) * !` alone, and
 * `'` is the delimiter that separates charset, language and value — so an
 * unescaped one truncates the filename at the parser. Fold all five in.
 */
const rfc5987 = (value: string) =>
  encodeURIComponent(value).replace(
    /['()*!]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );

/**
 * The plain `filename=` fallback: a quoted-string, so it has to be ASCII and
 * must not contain `"` or `\`. Strip accents rather than dropping the letter,
 * so a future "Résumé" degrades to "Resume" instead of "R_sum_".
 */
const asciiFold = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/["\\]/g, "")
    .replace(/[^\x20-\x7e]/g, "_");

/**
 * Both parameters, per RFC 6266 §4.3. `filename*` alone is not enough: `curl
 * -OJ` and several download managers ignore it and fall back to the URL
 * basename, which here would be the route name with no extension.
 */
const disposition = (filename: string) =>
  `inline; filename="${asciiFold(filename)}"; filename*=UTF-8''${rfc5987(filename)}`;

/** Upstream is broken, not empty: never cache it, never fabricate a 200. */
const failed = () =>
  new Response(FAILED, {
    status: 502,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // never let a failure stick to the CDN in place of the document
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });

/**
 * A variant that does not exist — a segment of the wrong shape, or a slug the
 * upstream answers 404 for. Send the visitor to the category default rather
 * than erroring: a mistyped or retired company slug should still hand over the
 * general document.
 *
 * **Redirect; never stream the default in its place.** An unbounded set of
 * made-up paths each streaming ~250KB would drain Vercel Hobby's 10GB Fast
 * Origin Transfer in ~40k requests, and exceeding it disables the whole site
 * for 30 days. A redirect costs a few hundred bytes and lands on a path the CDN
 * already holds.
 *
 * 302, not 308: the variant may be published tomorrow. `no-store` for the same
 * reason — a transient miss must not be cached against that path.
 *
 * The target is `filePath`, not `path`: this route serves bytes, and `path` is
 * now the HTML viewer. Redirecting there would hand an `<iframe>` expecting a
 * PDF a full page instead, and would turn a `curl` for a retired variant into
 * a download of markup. A viewer that wants the page-level miss handles it
 * itself, before it ever points a frame here — see `document-page.tsx`.
 */
const missed = (category: DocumentCategory) =>
  new Response(null, {
    status: 302,
    headers: {
      Location: category.filePath,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });

/**
 * Fetch one resolved document and stream it, or fail. `variant` is passed
 * separately because it decides what an upstream 404 *means*:
 *
 * - a **variant** 404 is a genuine absence → 302 to the category default;
 * - the **category default** 404ing is a broken upstream → 502. It must never
 *   redirect: the target would be the path being requested, i.e. a loop.
 *
 * Everything that is not a 404 — 5xx, 401, a timeout, a non-PDF body — is a 502
 * either way. An outage that silently served the general document under a URL
 * promising a variant would hand a recruiter the wrong PDF with nothing
 * reporting an error.
 */
const serve = async (category: DocumentCategory, variant: string | null) => {
  // Log path only — the URL this endpoint was reached at, not the viewer's.
  const path = variant
    ? `${category.filePath}/${variant}`
    : category.filePath;

  const doc = resolve(category, variant);
  if (!doc) {
    console.error(
      `[document] ${path} — refused a URL outside ${DOCUMENT_BASE}`,
    );
    return variant ? missed(category) : failed();
  }

  let upstream: Response;
  try {
    upstream = await fetch(doc.url, {
      cache: "no-store",
      // undici's own timeout is ~305s, past Vercel's 300s function ceiling, so
      // without this an unresponsive origin burns the entire budget.
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    console.error(`[document] ${path} — upstream fetch failed`, err);
    return failed();
  }

  // Cloudinary answers a missing *raw* public_id with 404 + `Content-Type:
  // image/gif` and an `X-Cld-Error` header. For a variant that is the ordinary
  // "not published" answer, not an incident — so it is a miss, not a 502, and
  // it is logged at warn rather than error.
  if (variant && upstream.status === 404) {
    await upstream.body?.cancel().catch(() => {});
    console.warn(`[document] ${path} — no such variant upstream`);
    return missed(category);
  }

  const type = upstream.headers.get("content-type") ?? "";
  // `res.ok` alone is not enough, and neither is the content-type alone. The
  // 404 above carries a real GIF body; streaming it through the success path
  // below would serve a GIF as `application/pdf` under a 200.
  if (!upstream.ok || !type.toLowerCase().startsWith("application/pdf")) {
    console.error(
      `[document] ${path} — upstream ${upstream.status} ${type || "(no type)"}` +
        (upstream.headers.get("x-cld-error")
          ? ` · ${upstream.headers.get("x-cld-error")}`
          : ""),
    );
    // release the socket instead of leaving the body dangling
    await upstream.body?.cancel().catch(() => {});
    return failed();
  }

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": disposition(doc.filename),
    "X-Robots-Tag": "noindex, nofollow",
    // The PDFs link back to jagnani73.com. Served from this origin, an in-PDF
    // click is same-origin, which would otherwise put the full document path
    // into `document.referrer` and from there into GA4.
    "Referrer-Policy": "no-referrer",
    // Revalidate on every viewer hit, but let the CDN absorb the traffic for 5
    // minutes. Deliberately no `stale-while-revalidate`: Vercel honours it, and
    // it would let a viewer receive a PDF up to a day old — the opposite of the
    // bound this line is here to set.
    "Cache-Control": "public, max-age=0, must-revalidate, s-maxage=300",
  });

  // Forward the length so the browser can draw a progress bar — but only when
  // the body is going out byte-identical. `fetch` transparently decompresses a
  // `content-encoding`d response, at which point the upstream length describes
  // the compressed bytes and would truncate or hang the download.
  const length = upstream.headers.get("content-length");
  const encoding = upstream.headers.get("content-encoding");
  if (length && (!encoding || encoding.toLowerCase() === "identity")) {
    headers.set("Content-Length", length);
  }

  return new Response(upstream.body, { status: 200, headers });
};

/**
 * The one route-handler factory. Every category is served from an optional
 * catch-all — `/<category>` and `/<category>/<variant>` — so there is no
 * second, "fixed" flavour of this and no category behaves differently from the
 * others. `/cv` has no variants published today; that is a fact about the
 * upstream, not about this route, and it needs no code to express.
 *
 * Rule 1 lives here.
 */
export const documentRoute =
  (category: DocumentCategory) =>
  async (_request: Request, context: VariantRouteContext) => {
    const { variant } = await context.params;
    const segments = variant ?? [];

    // Exactly zero or one segment. `/resume/a/b` is a miss and is never
    // `join("-")`ed into `a-b`: joining invents a slug nobody asked for, and
    // hands out a second spelling for every name the route can reach.
    if (segments.length > 1) return missed(category);
    if (segments.length === 0) return serve(category, null);

    // Already percent-decoded by Next, which splits the path on `/` first — so
    // a `%2F` arrives as a literal slash *inside* this one element. Validate it
    // exactly as received; decoding it again here is how a `%252F` turns into a
    // real path separator one layer later.
    const slug = segments[0];
    if (!validSlug(slug)) return missed(category);

    return serve(category, slug);
  };
