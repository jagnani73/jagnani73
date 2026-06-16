"use client";

import type { ComponentType } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useInView } from "@/hooks/use-in-view";
import type { FigKind } from "@/utils/types/case.types";
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
import { FigLattice } from "@/components/canvas/figs/fig-lattice";
import { FigTunnel } from "@/components/canvas/figs/fig-tunnel";
import { FigMarquee } from "@/components/canvas/figs/fig-marquee";

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
  lattice: FigLattice,
  tunnel: FigTunnel,
  marquee: FigMarquee,
};

// Screen-reader descriptions — the animated figs are opaque to assistive tech.
const FIG_LABELS: Record<FigKind, string> = {
  score: "Figure 1 — the 0–100 insider-likelihood scale, scoring live",
  agents:
    "Figure 1 — zee.run(): the planner breaks the goal into tasks, the router assigns them, the endgame concludes",
  wager: "Figure 1 — one wager, settled: stake, play, attest",
  kit: "Figure 1 — a raw API response resolving into a rendered component",
  decoder: "Figure 1 — a raw event log decoding into a named, enriched event",
  flux: "Figure 1 — a refund request, verified against the transaction",
  dao: "Figure 1 — a vote weighted by reputation proven off-chain, not tokens held",
  zk: "Figure 1 — proof-of-employment: proven true, employer kept private",
  lenden: "Figure 1 — collateral locked on one chain, a loan released on another",
  nudge:
    "Figure 1 — a no-code nudge, configured once, delivered into a live product",
  ledger: "Figure 1 — every edit appended to an immutable, on-chain audit log",
  price:
    "Figure 1 — proposed rates checked against the government benchmark, anomalies flagged",
  board:
    "Figure 1 — a blackboard captured as a pixel stream, ~85% less data than video",
  journal: "Figure 1 — the therapist sees the analysis, never the raw entry",
  match:
    "Figure 1 — peers matched on shared tags; every message passes a toxicity gate",
  beacon:
    "Figure 1 — distress signals polled onto the government dashboard in real time",
  lattice: "Figure 1 — a quantum attack on each scheme's foundation",
  tunnel:
    "Figure 1 — your phone drives the real Claude Code CLI over an encrypted tunnel",
  marquee: "Figure 1 — this strip is react-easy-marquee, rendering itself",
};

export const CaseFig = ({ kind }: { kind: FigKind }) => {
  const mob = useIsMobile();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const Fig = FIGS[kind];
  return (
    <div ref={ref} role="img" aria-label={FIG_LABELS[kind]}>
      <Fig mob={mob} active={inView} />
    </div>
  );
};
