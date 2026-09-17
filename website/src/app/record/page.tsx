import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { RECORD, getRecordCounts } from "@/content/record";
import { FILTERS } from "@/content/record-lib";
import { RecordClient } from "@/components/record/record-client";
import { JsonLd } from "@/components/shared/json-ld";
import {
  collectionPageLd,
  breadcrumbLd,
  SITE_CARD,
  SITE_NAME,
} from "@/utils/functions/seo";
import { TWITTER_HANDLE } from "@/utils/constants/site";
import type { FilterId } from "@/utils/types/record.types";

const RECORD_DESCRIPTION =
  "Everything, in one timeline: experience, projects, hackathons, community, research, education and certifications, 2019 → now.";

const RECORD_OG_TITLE = "The Record - Yashvardhan Jagnani";

export const metadata: Metadata = {
  title: "The Record",
  description: RECORD_DESCRIPTION,
  alternates: { canonical: "/record" },
  // Restated from the root layout, as on `/record/[slug]` — declaring
  // `openGraph` replaces the parent's rather than merging into it, and the
  // file-based card is one of the fields that leaves with it.
  openGraph: {
    type: "website",
    title: RECORD_OG_TITLE,
    description: RECORD_DESCRIPTION,
    url: "/record",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [SITE_CARD],
  },
  // Without this the page inherits the root's Twitter card wholesale and
  // unfurls on X under the home page's title and blurb.
  twitter: {
    card: "summary_large_image",
    title: RECORD_OG_TITLE,
    description: RECORD_DESCRIPTION,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [SITE_CARD],
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
