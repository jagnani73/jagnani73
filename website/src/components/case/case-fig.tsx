"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { useInView } from "@/hooks/use-in-view";
import type { FigKind } from "@/content/case-types";
import { FigScore } from "@/components/canvas/figs/fig-score";
import { FigAgentGraph } from "@/components/canvas/figs/fig-agent-graph";
import { FigWager } from "@/components/canvas/figs/fig-wager";

export const CaseFig = ({ kind }: { kind: FigKind }) => {
  const mob = useIsMobile();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "200px" });

  return (
    <div ref={ref}>
      {kind === "score" ? <FigScore mob={mob} active={inView} /> : null}
      {kind === "agents" ? <FigAgentGraph mob={mob} active={inView} /> : null}
      {kind === "wager" ? <FigWager mob={mob} active={inView} /> : null}
    </div>
  );
};
