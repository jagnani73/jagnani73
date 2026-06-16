import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { getCase, getAllCaseSlugs, getCaseTitle } from "@/content/cases";
import { CaseMasthead } from "@/components/case/case-masthead";
import { CaseSection } from "@/components/case/case-section";
import { CaseFooter } from "@/components/case/case-footer";
import { JsonLd } from "@/components/shared/json-ld";
import { caseLd, breadcrumbLd } from "@/lib/seo";

const caseDescription = (c: NonNullable<ReturnType<typeof getCase>>): string =>
  c.seoDescription ??
  (typeof c.deck === "string"
    ? c.deck
    : `${c.title} — a case study by Yashvardhan Jagnani.`);

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
      ...(c.ogImage ? { images: [c.ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: c.docTitle,
      description,
      ...(c.ogImage ? { images: [c.ogImage] } : {}),
    },
  };
};

const CasePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <PageShell page="P.03">
      <JsonLd
        data={[
          caseLd(c, slug, caseDescription(c)),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "The Record", path: "/record" },
            { name: c.title, path: `/record/${slug}` },
          ]),
        ]}
      />
      <CaseMasthead caseData={c} />
      {c.sections.map((s) => (
        <CaseSection key={s.n + s.type} section={s} />
      ))}
      <CaseFooter nextSlug={c.next} nextTitle={getCaseTitle(c.next)} />
    </PageShell>
  );
};

export default CasePage;
