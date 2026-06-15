import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { getRecordCounts } from "@/content/record";
import { RecordClient } from "@/components/work/record-client";

export const metadata: Metadata = {
  title: "The Record — Yashvardhan Jagnani",
  description:
    "Everything, in one timeline — experience, projects, hackathons, community, research, education and certifications, 2019 → now.",
};

const WorkPage = () => {
  const counts = getRecordCounts();

  return (
    <PageShell page="R.01">
      <RecordClient counts={counts} />
    </PageShell>
  );
};

export default WorkPage;
