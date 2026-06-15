"use client";

import type { ComponentType } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useInView } from "@/hooks/use-in-view";
import type { FigKind } from "@/content/case-types";
import { FigScore } from "@/components/canvas/figs/fig-score";
import { FigAgentGraph } from "@/components/canvas/figs/fig-agent-graph";
import { FigWager } from "@/components/canvas/figs/fig-wager";
import { FigKit } from "@/components/canvas/figs/fig-kit";
import { FigDecoder } from "@/components/canvas/figs/fig-decoder";
import { FigFlux } from "@/components/canvas/figs/fig-flux";
import { FigDao } from "@/components/canvas/figs/fig-dao";
import { FigZk } from "@/components/canvas/figs/fig-zk";
import { FigLenden } from "@/components/canvas/figs/fig-lenden";

const FIGS: Record<FigKind, ComponentType<{ mob: boolean; active?: boolean }>> = {
  score: FigScore,
  agents: FigAgentGraph,
  wager: FigWager,
  kit: FigKit,
  decoder: FigDecoder,
  flux: FigFlux,
  dao: FigDao,
  zk: FigZk,
  lenden: FigLenden,
};

export const CaseFig = ({ kind }: { kind: FigKind }) => {
  const mob = useIsMobile();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const Fig = FIGS[kind];
  return (
    <div ref={ref}>
      <Fig mob={mob} active={inView} />
    </div>
  );
};
