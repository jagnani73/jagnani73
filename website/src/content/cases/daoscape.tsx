import type { CaseDetail } from "@/utils/types/case.types";
import { FigDao } from "@/components/canvas/figs/fig-dao";

export const daoscapeCase: CaseDetail = {
  seoDescription:
    "DAO governance weighted by proven reputation, not token balance: influence earned, not bought. Blockscout prize, ETHGlobal Prague.",
  badge: "BLOCKSCOUT PRIZE · ETHGLOBAL PRAGUE",
  deck: (
    <>
      DAO governance weighted by{" "}
      <span className="text-tx">proven reputation</span>, not token balance:
      influence earned, not bought
    </>
  ),
  fig: {
    component: FigDao,
    alt: "a vote weighted by reputation proven off-chain, not tokens held",
  },
  sections: {
    split: {
      note: "token-weighted voting is plutocracy",
      serif: (
        <>
          DAO votes scale with token holdings, which makes governance{" "}
          <span className="text-tx">
            a handful of whales drowning out the people actually doing the work.
          </span>
        </>
      ),
      body: "DAOScape replaces capital-weighted voting with a reputation-based system that rewards real participation: verified social presence, email domain ownership, and open-source contributions. Influence is earned, not bought. It won the Blockscout pool prize at ETHGlobal Prague 2025.",
    },
    arch: {
      note: "vlayer web proofs · Base Sepolia",
      body: (
        <>
          A multi-dimensional reputation engine runs on{" "}
          <strong className="font-semibold text-tx">
            vlayer&apos;s Web Proofs
          </strong>
          : zero-knowledge proofs of Twitter follows, GitHub activity, and email
          domains, confirming identity claims without exposing raw credentials.
          Those signals feed a voting-weight formula where{" "}
          <strong className="font-semibold text-tx">
            reputation carries the highest exponent
          </strong>
          , deliberately outweighing token balance.
        </>
      ),
      flow: [
        {
          stage: "PROVE",
          role: "zk web proofs of social + dev reputation",
          tech: ["vlayer"],
        },
        {
          stage: "SCORE",
          role: "multi-dimensional reputation engine",
          tech: ["Node", "Supabase"],
        },
        {
          stage: "WEIGHT",
          role: "reputation > token, by formula",
          tech: ["Solidity", "Foundry"],
        },
        {
          stage: "VOTE",
          role: "weighted tally, on-chain",
          tech: ["Base Sepolia", "Blockscout"],
        },
      ],
      stack:
        "React 18 · TypeScript · wagmi/viem · Solidity · Foundry · vlayer · Base · Blockscout · 1inch · Supabase",
    },
    cards: {
      note: "composable proofs, zero leakage",
      intro: (
        <>
          The hardest challenge was wiring vlayer&apos;s Web Proof circuit into
          the scoring pipeline so it stayed{" "}
          <span className="font-mono text-sig">
            composable across proof types without leaking user data on-chain
          </span>
          :
        </>
      ),
      cards: [
        {
          name: "composable proofs",
          desc: "Twitter, GitHub, email: one pipeline, many proof types",
        },
        {
          name: "zero on-chain leakage",
          desc: "claims confirmed without exposing raw credentials",
        },
        {
          name: "reputation exponent",
          desc: "the weight formula that outranks whale balances",
        },
        {
          name: "quests system",
          desc: "DAOs define engagement tasks with merit rewards",
        },
      ],
    },
    plates: {
      note: "the governance platform",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567356/jagnani73/projects/daoscape/5bf4f732-d1db-4517-9264-4306c07b81a5.png",
          cap: "the governance dashboard",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567369/jagnani73/projects/daoscape/af9a9242-4b91-4e0e-a622-979691b413c7.png",
          cap: "proving reputation",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567384/jagnani73/projects/daoscape/1b9d93e3-78d8-4e81-ae62-a54de565cd50.png",
          cap: "a weighted vote",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567343/jagnani73/projects/daoscape/46c6a4ff-3e28-494b-ab29-d284403ac1a2.png",
          cap: "a live proposal",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567401/jagnani73/projects/daoscape/41b87a86-0e60-407c-8839-9814193a077c.png",
          cap: "the voter set",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567453/jagnani73/projects/daoscape/5c1cb2cf-d35c-443a-a1f3-62b99a292c91.png",
          cap: "proposal results",
        },
      ],
      cta: {
        label: "view the showcase",
        href: "https://ethglobal.com/showcase/daoscape-g8f8m",
      },
    },
  },
};
