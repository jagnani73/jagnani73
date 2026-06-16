import type { CaseData } from "@/content/case-types";

export const fluxCase: CaseData = {
  slug: "flux",
  title: "FLUX",
  docTitle: "Flux — Case Study",
  seoDescription:
    "Web3-native AI support — agents with on-chain awareness that read explorers, diagnose failed transactions, and answer from live state.",
  badge: "FLUENCE PRIZE · ETHGLOBAL NEW DELHI",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1766567915/jagnani73/projects/flux/f631ab10-eee1-44d7-a70a-dfff0c2f353a.png",
  deck: (
    <>
      Web3-native AI support — agents with{" "}
      <span className="text-tx">on-chain awareness</span> that read explorers,
      diagnose failed transactions, and answer from live state
    </>
  ),
  fig: "flux",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "web2 support can't read a chain",
      serif: (
        <>
          Support tools built for web2{" "}
          <span className="text-tx">
            don&apos;t understand transaction failures, wallet states, or protocol
            interactions
          </span>{" "}
          — exactly the questions crypto users actually have.
        </>
      ),
      body: "Flux lets any crypto project deploy intelligent support agents with on-chain awareness: they read block explorers, diagnose failed transactions, and execute pre-authorized on-chain actions — all while keeping verifiable, immutable chat logs. Built at ETHGlobal New Delhi 2025, it won Best Use of Fluence Virtual Servers.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "three services · uAgents + ENS + Fluence",
      body: (
        <>
          Three services: a Python{" "}
          <strong className="font-semibold text-tx">uAgent</strong> agents service
          (ASI framework), a Node/TypeScript API for business logic, and a Next.js
          frontend serving both the admin dashboard and the embeddable widget.{" "}
          <strong className="font-semibold text-tx">ENS</strong> gives each agent a
          verifiable identity;{" "}
          <strong className="font-semibold text-tx">Fluence</strong> supplies
          decentralized compute so the support layer is never a central point of
          failure.
        </>
      ),
      flow: [
        { stage: "INDEX", role: "knowledge base via PDF + URL ingestion", tech: ["Node API"] },
        { stage: "QUERY", role: "a user asks through the widget", tech: ["Next.js widget"] },
        { stage: "GROUND", role: "pull live on-chain context at query time", tech: ["uAgents", "ENS"] },
        { stage: "RESPOND", role: "synthesize, with verifiable logs", tech: ["Fluence"] },
      ],
      stack: "Python 3.12 · uAgents (ASI) · Node · Next.js · TailwindCSS · ENS · Fluence",
    },
    {
      type: "cards",
      n: "03",
      title: "THE HARD PART",
      note: "live chain data at query time",
      intro: (
        <>
          The hardest challenge was coordinating the uAgent framework with{" "}
          <span className="font-mono text-sig">live blockchain data fetched at query time</span>{" "}
          — pulling token balances, transaction status, and contract state and
          fusing them with indexed docs, without hallucinating protocol specifics:
        </>
      ),
      cards: [
        { name: "query-time context", desc: "balances, tx status, contract state, fetched on demand" },
        { name: "doc + chain fusion", desc: "indexed knowledge synthesized with live data" },
        { name: "no hallucinated specifics", desc: "grounded answers, not plausible guesses" },
        { name: "verifiable identity", desc: "ENS-named agents, immutable chat logs" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–03 · the support platform",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567915/jagnani73/projects/flux/f631ab10-eee1-44d7-a70a-dfff0c2f353a.png", cap: "the admin dashboard" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766568390/jagnani73/projects/flux/a751cb71-afdd-4686-91bf-27dfd1231dec.png", cap: "an agent, configured" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766568408/jagnani73/projects/flux/2415a4c8-5508-4e49-b1fd-461240693a30.png", cap: "the support widget" },
      ],
      cta: { label: "visit flux ↗", href: "https://flux-support.vercel.app/" },
    },
  ],
  next: "daoscape",
};
