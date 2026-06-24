import type { CaseDetail } from "@/utils/types/case.types";
import { FigScore } from "@/components/canvas/figs/fig-score";

export const insidepolyCase: CaseDetail = {
  seoDescription:
    "Insider-trading surveillance for Polymarket: every trade watched, every wallet scored. Live anomaly detection across prediction-market activity.",
  badge: "LIVE · 2026",
  deck: (
    <>
      insider-trading surveillance for{" "}
      <span className="text-tx">Polymarket</span>: every trade watched, every
      wallet scored
    </>
  ),
  fig: {
    component: FigScore,
    alt: "the 0–100 insider-likelihood scale, scoring live",
  },
  sections: {
    split: {
      note: "information asymmetry, fully public",
      serif: (
        <>
          Prediction markets are uniquely vulnerable: the data is all on-chain
          and public, yet{" "}
          <span className="text-tx">
            no tooling existed to flag wallets trading with suspiciously
            prescient timing.
          </span>
        </>
      ),
      body: "InsidePoly closes that gap for Polymarket, the world's largest prediction market on Polygon. It continuously watches every trade and scores each trader on a 0–100 insider-trading likelihood scale; wallets scoring 80+ get flagged as suspected insiders on a public leaderboard.",
    },
    arch: {
      note: "TypeScript monorepo · common / backend / frontend",
      body: (
        <>
          One pipeline, five stages: from a raw{" "}
          <strong className="font-semibold text-tx">OrderFilled</strong> log to
          a scored wallet on a public leaderboard, with no application-layer
          round-trips in the hot path.
        </>
      ),
      flow: [
        {
          stage: "INGEST",
          role: "every OrderFilled event, as it lands",
          tech: ["The Graph", "Polymarket Subgraph"],
        },
        {
          stage: "ENRICH",
          role: "resolve token + condition IDs",
          tech: ["Alchemy RPC"],
        },
        {
          stage: "STORE",
          role: "the canonical record + job queues",
          tech: ["PostgreSQL", "Drizzle", "Redis"],
        },
        {
          stage: "SCORE",
          role: "five signals, one pass, in the database",
          tech: ["PL/pgSQL", "score_wallets()"],
        },
        {
          stage: "SERVE",
          role: "REST + live push to the leaderboard",
          tech: ["Express", "socket.io", "Next.js"],
        },
      ],
      stack:
        "TypeScript · Next.js · Express · PostgreSQL · Redis · Drizzle · socket.io · The Graph · Alchemy",
    },
    cards: {
      note: "score_wallets() · PL/pgSQL · single pass",
      intro: (
        <>
          The scoring engine is one PL/pgSQL function computing five behavioral
          signals in a single pass, no round-trips through the application
          layer. Each signal contributes up to{" "}
          <span className="font-mono text-sig">25 points</span>:
        </>
      ),
      cards: [
        { name: "bet concentration", desc: "top-market volume share" },
        { name: "market count", desc: "breadth of activity" },
        { name: "position size", desc: "capital at risk" },
        {
          name: "entry timing",
          desc: "how late in a market's life the wallet first traded",
        },
        {
          name: "wallet age",
          desc: "gap between first USDC.e receipt and first trade",
        },
      ],
    },
    plates: {
      note: "the live product",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1773432165/jagnani73/projects/insidepoly/d751cba0-010f-47f0-9464-cb961eba2fe6.png",
          cap: "the public leaderboard",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1773432208/jagnani73/projects/insidepoly/f41709f3-7501-4726-a3ef-06095736f651.png",
          cap: "flagged wallets, ranked",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1773432230/jagnani73/projects/insidepoly/ccfeab56-87b7-4256-ba6a-b0001932eff9.png",
          cap: "per-wallet signal breakdown",
        },
      ],
      cta: {
        label: "view the source",
        href: "https://github.com/jagnani73/insidepoly",
      },
    },
  },
};
