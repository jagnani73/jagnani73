import { PageShell } from "@/components/shared/page-shell";
import { PageFooter } from "@/components/shared/page-footer";
import { getMetrics } from "@/lib/fetch-metrics";
import { Masthead } from "@/components/home/masthead";
import { Chapters } from "@/components/home/chapters";
import { SelectedWork } from "@/components/home/selected-work";
import { Person } from "@/components/home/person";

export const revalidate = 86400;

const Home = async () => {
  const metrics = await getMetrics();

  return (
    <PageShell page="P.01" home>
      <Masthead />
      <Chapters />
      <SelectedWork metrics={metrics} />
      <Person />
      <PageFooter />
    </PageShell>
  );
};

export default Home;
