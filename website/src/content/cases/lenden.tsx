import type { CaseData } from "@/content/case-types";

export const lendenCase: CaseData = {
  slug: "lenden",
  idx: "08",
  rosterSize: 9,
  title: "LENDEN",
  docTitle: "LenDen — Case Study",
  badge: "ROUTER PRIZE · UNFOLD 2023",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/578f68d4-e848-4a3f-a5c5-b7cc74cf9a88_gg0aqw.png",
  deck: (
    <>
      lend on one chain, borrow on another —{" "}
      <span className="text-tx">cross-chain credit</span> with a reputation
      layer, over Router cross-talk
    </>
  ),
  fig: "lenden",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "liquidity is siloed per chain",
      serif: (
        <>
          Assets sit scattered across Avalanche, Polygon, and beyond — with{" "}
          <span className="text-tx">
            no unified way to unlock liquidity without selling.
          </span>
        </>
      ),
      body: "LenDen lets borrowers collateralize assets on one chain and receive loans on another, while lenders earn interest supplying a multi-chain treasury. It tracks repayment behavior to build a cross-chain credibility score — and on default, retains the collateral or routes it through an on-chain auction. Won First Place in the Router track at Unfold 2023.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "Router cross-talk · credibility scoring",
      body: (
        <>
          The platform runs on{" "}
          <strong className="font-semibold text-tx">
            Router Protocol&apos;s cross-talk contracts
          </strong>
          , which carry the messaging that coordinates collateral locks and loan
          disbursements across networks. Borrowers post NFT or token collateral;
          the system tracks repayment to build a{" "}
          <strong className="font-semibold text-tx">
            cross-chain credibility score
          </strong>{" "}
          that surfaces trusted users and tunes risk.
        </>
      ),
      flow: [
        { stage: "COLLATERALIZE", role: "lock NFT / token on the source chain", tech: ["Solidity"] },
        { stage: "MESSAGE", role: "cross-chain coordination", tech: ["Router cross-talk"] },
        { stage: "BORROW", role: "loan released on the destination chain", tech: ["Solidity"] },
        { stage: "SETTLE", role: "repay → credibility, or default → auction", tech: ["Push Protocol"] },
      ],
      stack: "Solidity · Router cross-talk · Next.js · Express · Node · Supabase · Push Protocol",
    },
    {
      type: "cards",
      n: "03",
      title: "THE HARD PART",
      note: "two chains, one atomic state",
      intro: (
        <>
          The hardest challenge was orchestrating reliable state sync across two
          chains — keeping the collateral lock on the source and the loan release
          on the destination{" "}
          <span className="font-mono text-sig">atomic and recoverable under failure</span>:
        </>
      ),
      cards: [
        { name: "atomic cross-chain state", desc: "lock and release coordinated as one operation" },
        { name: "recoverable on failure", desc: "no stranded collateral when a hop fails" },
        { name: "credibility scoring", desc: "repayment history as a cross-chain reputation layer" },
        { name: "default auction", desc: "on-chain liquidation when a loan goes bad" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–03 · Unfold 2023",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/578f68d4-e848-4a3f-a5c5-b7cc74cf9a88_gg0aqw.png", cap: "the borrower dashboard" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/1d59ea1e-69b3-4cde-9ab9-8fabf58de774_blm70w.png", cap: "posting collateral" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/903d5d31-763d-4c5e-8a60-4593464e465d_eicstt.png", cap: "a cross-chain loan" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/lenden" },
    },
  ],
  next: "delinzk",
};
