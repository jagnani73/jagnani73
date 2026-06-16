import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { getCase, getAllCaseSlugs, getCaseTitle } from "@/content/cases";
import { CaseMasthead } from "@/components/case/case-masthead";
import { CaseSection } from "@/components/case/case-section";
import { CaseFooter } from "@/components/case/case-footer";

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
  const description =
    typeof c.deck === "string"
      ? c.deck
      : `${c.title} — a case study by Yashvardhan Jagnani.`;
  return {
    title: `${c.docTitle} — Yashvardhan Jagnani`,
    description,
    openGraph: c.ogImage
      ? { title: c.docTitle, description, images: [c.ogImage] }
      : { title: c.docTitle, description },
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
      <CaseMasthead caseData={c} />
      {c.sections.map((s) => (
        <CaseSection key={s.n + s.type} section={s} />
      ))}
      <CaseFooter nextSlug={c.next} nextTitle={getCaseTitle(c.next)} />
    </PageShell>
  );
};

export default CasePage;
