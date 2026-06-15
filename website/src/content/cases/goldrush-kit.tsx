import type { CaseData } from "@/content/case-types";

export const goldrushKitCase: CaseData = {
  slug: "goldrush-kit",
  idx: "04",
  rosterSize: 9,
  title: "GOLDRUSH KIT",
  docTitle: "GoldRush Kit — Case Study",
  badge: "OPEN SOURCE · 105★",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1766564317/jagnani73/projects/goldrush-kit/81f580da-f9c3-4f15-8faf-ca37eef2fedd.png",
  deck: (
    <>
      plug-n-play React components that turn{" "}
      <span className="text-tx">raw on-chain data</span> into UI — typed,
      themeable, drop-in across 200+ chains
    </>
  ),
  fig: "kit",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "everyone rebuilds the same plumbing",
      serif: (
        <>
          Every web3 frontend rewrites the same plumbing — custom hooks, raw RPC
          parsing, multi-chain normalization —{" "}
          <span className="text-tx">before a single pixel of UI ever ships.</span>
        </>
      ),
      body: "GoldRush Kit cuts that out. Drop in a pre-built component — token balances, NFT galleries, transaction receipts, block explorers — wrap it in a GoldRushProvider, and the data fetches and normalizes itself across 200+ chains. Built at Covalent to make multi-chain dApp development approachable for any React developer.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "atomic design · one provider · GoldRush SDK",
      body: (
        <>
          Every component is driven by the{" "}
          <strong className="font-semibold text-tx">
            GoldRush TypeScript SDK
          </strong>{" "}
          and follows an atomic hierarchy — atoms to molecules to organisms — so
          each is individually consumable or composable into full-page templates.
          A single{" "}
          <strong className="font-semibold text-tx">GoldRushProvider</strong>{" "}
          context propagates theming to every component without a line of CSS
          override.
        </>
      ),
      flow: [
        { stage: "PROVIDE", role: "one context: theme, chain, API key", tech: ["GoldRushProvider"] },
        { stage: "FETCH", role: "the component pulls its own data", tech: ["GoldRush SDK"] },
        { stage: "NORMALIZE", role: "200+ chains, one typed shape", tech: ["TypeScript"] },
        { stage: "RENDER", role: "atomic, themeable components", tech: ["React", "TailwindCSS"] },
      ],
      stack: "React · TypeScript · TailwindCSS · GoldRush SDK · Storybook",
    },
    {
      type: "cards",
      n: "03",
      title: "WHAT I SHIPPED",
      note: "owned v1.0.1 → v1.0.5",
      intro: (
        <>
          I owned the library across the v1.0.x cycle. The subtle, trust-critical
          work was{" "}
          <span className="font-mono text-sig">gas &amp; fee unit formatting</span>{" "}
          — ETH, Gwei, and Wei are trivially conflated across API shapes, and a
          unit error at the display layer quietly erodes trust in the data:
        </>
      ),
      cards: [
        { name: "state-preserving pagination", desc: "block lists that hold their place across fetches" },
        { name: "raw transaction logs", desc: "the decoded log view, surfaced in the UI" },
        { name: "in / out indicators", desc: "direction at a glance on transaction lists" },
        { name: "chain-switching", desc: "live network swap inside address activity" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–03 · the component library",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766564317/jagnani73/projects/goldrush-kit/81f580da-f9c3-4f15-8faf-ca37eef2fedd.png", cap: "components in Storybook" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766564635/jagnani73/projects/goldrush-kit/ac94b6a1-a9c4-42cd-a318-5c80b2549824.png", cap: "token balances, rendered" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766564330/jagnani73/projects/goldrush-kit/0172911e-a1c9-4796-aea3-05bee4f8d65f.png", cap: "transaction list view" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/covalenthq/goldrush-kit" },
    },
  ],
  next: "goldrush-decoder",
};
