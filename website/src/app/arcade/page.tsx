import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { SectionHead } from "@/components/shared/section-head";
import { ArcadeBoard } from "@/components/home/arcade-board";

// All-games board — surfaced only via the footer's "the arcade" CTA, kept out of
// the sitemap, and noindex so it stays a quiet corner.
export const metadata: Metadata = {
  title: "Arcade",
  robots: { index: false, follow: false },
};

const ArcadePage = () => (
  <PageShell page="ARCADE">
    <SectionHead
      source="page"
      n="07"
      title="THE ARCADE"
      note="every game · beat my scores"
    />
    <ArcadeBoard />
  </PageShell>
);

export default ArcadePage;
