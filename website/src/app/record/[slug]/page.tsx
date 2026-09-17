import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import {
  getCase,
  getAllCaseSlugs,
  getCaseTitle,
  getCaseImage,
  getNextSlug,
  orderedSections,
} from "@/content/cases";
import { CaseMasthead } from "@/components/case/case-masthead";
import { CaseSection } from "@/components/case/case-section";
import { JsonLd } from "@/components/shared/json-ld";
import {
  caseLd,
  breadcrumbLd,
  caseCard,
  SITE_NAME,
} from "@/utils/functions/seo";
import { TWITTER_HANDLE } from "@/utils/constants/site";

const caseDescription = (c: NonNullable<ReturnType<typeof getCase>>): string =>
  c.seoDescription ??
  (typeof c.deck === "string"
    ? c.deck
    : `${c.title}, a case study by Yashvardhan Jagnani.`);

export const dynamicParams = true;
export const revalidate = 86400;

export const generateStaticParams = () =>
  getAllCaseSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const description = caseDescription(c);
  const path = `/record/${slug}`;
  const image = caseCard(getCaseImage(c), c.docTitle);
  return {
    title: c.docTitle,
    description,
    alternates: { canonical: path },
    // `siteName`, `locale`, `images`, `site` and `creator` are repeated from the
    // root layout on purpose — the same reason they are repeated in
    // `document-page.tsx`. Next replaces a parent `openGraph`/`twitter` object
    // rather than merging into it, so a page declaring either one drops every
    // field of the parent's it does not restate. `images` is the one that bit:
    // the file-based card from `app/opengraph-image.tsx` hangs off the root
    // layout's `openGraph`, so every case study unfurled with no image at all.
    openGraph: {
      type: "article",
      title: c.docTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: c.docTitle,
      description,
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      images: [image],
    },
  };
};

const CasePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const nextSlug = getNextSlug(slug);
  const next = { slug: nextSlug, title: getCaseTitle(nextSlug) };

  return (
    <PageShell page="P.03">
      <JsonLd
        data={[
          caseLd(c, slug, caseDescription(c), getCaseImage(c)),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "The Record", path: "/record" },
            { name: c.title, path: `/record/${slug}` },
          ]),
        ]}
      />
      <CaseMasthead caseData={c} />
      {orderedSections(c.sections).map((s, i) => (
        <CaseSection key={s.type} section={s} index={i} next={next} />
      ))}
    </PageShell>
  );
};

export default CasePage;
