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
import { caseLd, breadcrumbLd } from "@/utils/functions/seo";

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
  return {
    title: c.docTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: c.docTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: c.docTitle,
      description,
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
