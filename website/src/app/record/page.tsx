import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { getRecordCounts } from "@/content/record";
import { RecordClient } from "@/components/work/record-client";
import { JsonLd } from "@/components/shared/json-ld";
import { collectionPageLd, breadcrumbLd } from "@/lib/seo";

const RECORD_DESCRIPTION =
  "Everything, in one timeline — experience, projects, hackathons, community, research, education and certifications, 2019 → now.";

export const metadata: Metadata = {
  title: "The Record",
  description: RECORD_DESCRIPTION,
  alternates: { canonical: "/record" },
  openGraph: {
    type: "website",
    title: "The Record — Yashvardhan Jagnani",
    description: RECORD_DESCRIPTION,
    url: "/record",
  },
};

const RecordPage = () => {
  const counts = getRecordCounts();

  return (
    <PageShell page="R.01">
      <JsonLd
        data={[
          collectionPageLd(
            "The Record — Yashvardhan Jagnani",
            RECORD_DESCRIPTION,
            "/record",
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "The Record", path: "/record" },
          ]),
        ]}
      />
      <RecordClient counts={counts} />
    </PageShell>
  );
};

export default RecordPage;
