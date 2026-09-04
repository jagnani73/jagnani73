import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DocumentShell } from "@/components/documents/document-shell";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { DOCUMENT_OWNER, TWITTER_HANDLE } from "@/utils/constants/site";
import { SITE_NAME } from "@/utils/functions/seo";
import {
  documentLabel,
  previewUrl,
  resolve,
  upstreamExists,
  validSlug,
} from "@/utils/functions/document-resolve";
import type { DocumentCategory } from "@/utils/types/document.types";

// The viewer half of the document routes: the page a shared link opens, paired
// with the byte endpoint in `document-route.ts`.
//
// One factory rather than six near-identical page files. Every category is
// served by two thin pages — `<category>/page.tsx` and
// `<category>/[variant]/page.tsx` — and both are three lines that call in here,
// exactly as the byte endpoints call `documentRoute`. A category that behaves
// differently from the others would be the start of the drift both factories
// exist to prevent.
//
// **Categories are closed; variants stay open and unlisted.** Nothing here
// enumerates variants either: a variant is validated by shape and then checked
// against the upstream with a HEAD, so publishing `cv-cl/resume-blockchain.pdf`
// in the sibling repo is all it takes for `/resume/blockchain` to work, and no
// list of company slugs is ever committed to this public repo.

/**
 * A short, honest description per category. Deliberately not derived from the
 * PDF's contents: the sibling repo rebuilds these on every push, and a
 * description scraped from a document that changes weekly would be wrong
 * silently rather than loudly.
 */
const DESCRIPTIONS: Record<string, string> = {
  Resume: `The current résumé of ${DOCUMENT_OWNER}: blockchain, AI and full-stack engineering. Read it here or download the PDF.`,
  CV: `The full academic CV of ${DOCUMENT_OWNER}: research, education, publications and teaching. Read it or download the PDF.`,
  "Cover Letter": `A cover letter from ${DOCUMENT_OWNER}. Read it here or download the PDF.`,
};

const describe = (category: DocumentCategory, variant: string | null) => {
  const base = DESCRIPTIONS[category.label] ?? "";
  if (!variant) return base;
  // A variant names itself and stops. Prefixing the category blurb instead runs
  // past the ~125 characters a card will show, and the blurb describes the
  // general document, not this cut of it — nothing here knows what is in it.
  return `${documentLabel(category, variant)}. ${DOCUMENT_OWNER}. Read it here or download the PDF.`;
};

/**
 * Metadata for one document page.
 *
 * This is the entire reason the viewer exists: a `route.ts` returning
 * `application/pdf` has no `<head>` for Next's metadata to fill, so nothing
 * pasted into Slack, LinkedIn or WhatsApp could ever unfurl. A real page gets
 * the same treatment as `/record/<slug>` and needs no user-agent sniffing to do
 * it — the crawler and the reader are handed the same URL and the same page.
 *
 * `robots: noindex` keeps the posture the byte endpoint already had
 * (`X-Robots-Tag: noindex, nofollow`). Unfurling and indexing are unrelated:
 * Slack and LinkedIn build their cards from the tags below without consulting
 * robots directives, so the documents stay out of search results while a
 * pasted link still shows a title and a thumbnail.
 */
export const documentMetadata =
  (category: DocumentCategory) =>
  async (context?: { params: Promise<{ variant: string }> }) => {
    const variant = context ? (await context.params).variant : null;
    if (variant && !validSlug(variant)) return {} satisfies Metadata;

    const doc = resolve(category, variant);
    if (!doc) return {} satisfies Metadata;

    const path = variant ? `${category.path}/${variant}` : category.path;
    const title = `${doc.label} - ${DOCUMENT_OWNER}`;
    const description = describe(category, variant);
    // Page one of this very PDF, rasterised by Cloudinary. Not a hand-made
    // card: the preview is the document, so it can never fall out of date with
    // what the link actually opens.
    const image = previewUrl(doc.url);

    return {
      title: doc.label,
      description,
      alternates: { canonical: path },
      robots: { index: false, follow: false },
      // `siteName`, `locale`, `site` and `creator` are repeated from the root
      // layout on purpose. Next **replaces** a parent `openGraph`/`twitter`
      // object rather than merging into it, so a page that declares either one
      // drops every field of the parent's it does not restate — which is how
      // these four silently went missing from the document cards while the rest
      // of the site kept them.
      openGraph: {
        type: "article",
        title,
        description,
        url: path,
        siteName: SITE_NAME,
        locale: "en_US",
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        site: TWITTER_HANDLE,
        creator: TWITTER_HANDLE,
        images: [image],
      },
    } satisfies Metadata;
  };

/**
 * The page itself.
 *
 * A variant is verified against the upstream *before* anything renders. Without
 * that, `/resume/not-a-real-variant` would frame the byte endpoint, the
 * endpoint would 302 to the category default, and the reader would be shown the
 * general résumé under a heading and a URL promising a specific one. Redirect
 * to the category instead, which is the same answer the byte endpoint gives to
 * the same miss.
 */
export const documentPage = (category: DocumentCategory) => {
  const DocumentPage = async (context?: {
    params: Promise<{ variant: string }>;
  }) => {
    const variant = context ? (await context.params).variant : null;

    // A malformed segment is not a redirect — it was never a document. 404 so a
    // crawler is told the truth and nothing gets cached against it.
    if (variant && !validSlug(variant)) notFound();

    const doc = resolve(category, variant);
    if (!doc) notFound();

    if (variant && !(await upstreamExists(doc.url))) redirect(category.path);

    const filePath = variant
      ? `${category.filePath}/${variant}`
      : category.filePath;

    return (
      <DocumentShell label={doc.label} filePath={filePath}>
        <DocumentViewer label={doc.label} filePath={filePath} />
      </DocumentShell>
    );
  };

  // Named for the React tree and for `react/display-name`: six pages come out
  // of this factory and an anonymous component in all six is unreadable in a
  // stack trace.
  DocumentPage.displayName = `DocumentPage(${category.slug})`;
  return DocumentPage;
};
