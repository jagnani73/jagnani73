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
import { FigNudge } from "@/components/canvas/figs/fig-nudge";
import { FigLedger } from "@/components/canvas/figs/fig-ledger";
import { FigPrice } from "@/components/canvas/figs/fig-price";
import { FigBoard } from "@/components/canvas/figs/fig-board";
import { FigJournal } from "@/components/canvas/figs/fig-journal";
import { FigMatch } from "@/components/canvas/figs/fig-match";
import { FigBeacon } from "@/components/canvas/figs/fig-beacon";

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
  nudge: FigNudge,
  ledger: FigLedger,
  price: FigPrice,
  board: FigBoard,
  journal: FigJournal,
  match: FigMatch,
  beacon: FigBeacon,
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
