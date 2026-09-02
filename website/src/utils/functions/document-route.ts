import type { SiteDocument } from "@/utils/types/document.types";

// Route-handler factory behind /resume, /cv and /cover-letter. Each of those
// files names one fixed `DOCUMENTS` entry (see `utils/constants/site.ts`) — the
// bounded set is the security property, so this factory takes a document, never
// a slug, and nothing here reads the request.
//
// It streams rather than 302s to Cloudinary so the document is served from this
// origin: the URL in the address bar stays jagnani73.com, the download name is
// ours to set, and `Referrer-Policy` below is actually applied.

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

export const documentRoute = (doc: SiteDocument) => async () => {
  let upstream: Response;
  try {
    upstream = await fetch(doc.url, {
      cache: "no-store",
      // undici's own timeout is ~305s, past Vercel's 300s function ceiling, so
      // without this an unresponsive origin burns the entire budget.
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    console.error(`[document] ${doc.path} — upstream fetch failed`, err);
    return failed();
  }

  const type = upstream.headers.get("content-type") ?? "";
  // `res.ok` alone is not enough, and neither is the content-type alone.
  // Cloudinary answers a missing *raw* public_id with 404 + `image/gif` and an
  // `X-Cld-Error` header — a real GIF body. Streaming that through the success
  // path below would serve a GIF as `application/pdf` under a 200.
  if (!upstream.ok || !type.toLowerCase().startsWith("application/pdf")) {
    console.error(
      `[document] ${doc.path} — upstream ${upstream.status} ${type || "(no type)"}` +
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
