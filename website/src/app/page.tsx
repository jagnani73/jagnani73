import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { getMetrics } from "@/utils/functions/fetch-metrics";
import { Masthead } from "@/components/home/masthead";
import { Chapters } from "@/components/home/chapters";
import { SelectedWork } from "@/components/home/selected-work";
import { Person } from "@/components/home/person";
import { JsonLd } from "@/components/shared/json-ld";
import { HOME_TITLE, personLd, websiteLd } from "@/utils/functions/seo";

// Only the title, and `absolute` so the root layout's `%s - <name>` template
// does not append the name a second time. Deliberately nothing else here: a
// page-level `openGraph` or `twitter` object *replaces* the root's rather than
// merging, so declaring one would drop `og:site_name`, `og:locale` and the
// Twitter handles from the home card.
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
};

export const revalidate = 86400; // 24 hours

const Home = async () => {
  const metrics = await getMetrics();

  return (
    <PageShell page="P.01" home>
      <JsonLd data={[personLd(), websiteLd()]} />
      <Masthead />
      <Chapters />
      <SelectedWork metrics={metrics} />
      <Person />
    </PageShell>
  );
};

export default Home;
