import { PageShell } from "@/components/shared/page-shell";
import { getMetrics } from "@/utils/functions/fetch-metrics";
import { Masthead } from "@/components/home/masthead";
import { Chapters } from "@/components/home/chapters";
import { SelectedWork } from "@/components/home/selected-work";
import { Person } from "@/components/home/person";
import { JsonLd } from "@/components/shared/json-ld";
import { personLd, websiteLd } from "@/utils/functions/seo";

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
