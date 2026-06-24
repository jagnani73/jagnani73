import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { RECORD, getRecordCounts } from "@/content/record";
import { FILTERS } from "@/content/record-lib";
import { RecordClient } from "@/components/record/record-client";
import { JsonLd } from "@/components/shared/json-ld";
import { collectionPageLd, breadcrumbLd } from "@/utils/functions/seo";
import type { FilterId } from "@/utils/types/record.types";

const RECORD_DESCRIPTION =
  "Everything, in one timeline: experience, projects, hackathons, community, research, education and certifications, 2019 → now.";

export const metadata: Metadata = {
  title: "The Record",
  description: RECORD_DESCRIPTION,
  alternates: { canonical: "/record" },
  openGraph: {
    type: "website",
    title: "The Record - Yashvardhan Jagnani",
    description: RECORD_DESCRIPTION,
    url: "/record",
  },
};

const FILTER_IDS = new Set<string>(FILTERS.map((f) => f.id));
const toFilterId = (raw?: string): FilterId => {
  const up = raw?.toUpperCase();
  return up && FILTER_IDS.has(up) ? (up as FilterId) : "ALL";
};

const RecordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const counts = getRecordCounts();
  // Strip the heavy `case` detail — the client timeline only needs the row meta.
  const rows = RECORD.map((r) => {
    const row = { ...r };
    delete row.case;
    return row;
  });

  return (
    <PageShell page="R.01">
      <JsonLd
        data={[
          collectionPageLd(
            "The Record - Yashvardhan Jagnani",
            RECORD_DESCRIPTION,
            "/record",
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "The Record", path: "/record" },
          ]),
        ]}
      />
      <RecordClient
        rows={rows}
        counts={counts}
        initialFilter={toFilterId(filter)}
      />
    </PageShell>
  );
};

export default RecordPage;
