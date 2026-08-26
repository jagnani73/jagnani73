import type { CaseDetail } from "@/utils/types/case.types";
import { FigGantry } from "@/components/canvas/figs/fig-gantry";

export const gantryCase: CaseDetail = {
  seoDescription:
    "One payment rail, two doors: a tourist scans a printed QR, an AI agent pays over x402, and one contract settles both to the merchant in XSGD.",
  badge: "NTU INNOVATEX 2026 · 3RD",
  deck: (
    <>
      a hawker integrates once and gets paid by anyone:{" "}
      <span className="text-tx">
        a tourist scanning a printed QR, or an AI agent paying over x402.
      </span>{" "}
      both are the same on-chain intent.
    </>
  ),
  fig: {
    component: FigGantry,
    alt: "a printed QR and an HTTP 402 are two encodings of one payment intent, paid in USDC or EURC and settled to the merchant in XSGD by one contract",
  },
  sections: {
    split: {
      title: "THE IDEA",
      note: "the payers PayNow cannot reach",
      serif: (
        <>
          PayNow is free and it works, if you hold a Singapore bank account.
          Roughly 16 million people visit Singapore each year without one, and{" "}
          <span className="text-tx">software cannot open one at all.</span>
        </>
      ),
      body: "Gantry is one payment rail with two doors. A merchant registers once, on-chain, and gets back a printed QR and an HTTP endpoint. A tourist scans the standee and signs an EIP-3009 authorization on their phone, holding no ETH. An AI agent hits the same endpoint, gets a 402 Payment Required carrying an x402 v2 challenge, and pays inside the limits its owner set on-chain. Both are the same PaymentIntent, both land in the same merchant feed, and the shop is paid in XSGD whatever token arrived.",
    },
    arch: {
      title: "THE RAIL",
      note: "one intent · two encodings · one settlement",
      body: (
        <>
          Each door is a thin encoding layer over the same settlement path.
          Everything below{" "}
          <strong className="font-semibold text-tx">GantryCore._settle</strong>{" "}
          is written once: pull the funds, swap to XSGD behind a min-out guard,
          pay the merchant, emit the event the dashboard is listening to.
        </>
      ),
      flow: [
        {
          stage: "INTENT",
          role: "the relayer pins a quote on-chain: token, amount, expiry",
          tech: ["Solidity", "Foundry"],
        },
        {
          stage: "HUMAN DOOR",
          role: "printed QR → payer page → one typed-data signature, no gas",
          tech: ["EIP-3009", "Next.js 15"],
        },
        {
          stage: "AGENT DOOR",
          role: "402 challenge offering the standard scheme and a policy scheme",
          tech: ["x402 v2", "gantry-pbm"],
        },
        {
          stage: "POLICY",
          role: "the agent's wallet checks signature, caps, category, expiry",
          tech: ["EIP-712", "AgentPBMWallet"],
        },
        {
          stage: "SETTLE",
          role: "pull → swap → pay the merchant → one event, both doors",
          tech: ["GantryCore", "viem"],
        },
      ],
      stack:
        "TypeScript monorepo · Solidity · Foundry · Next.js 15 · Express · viem · SQLite · Vercel AI SDK · Base Sepolia",
    },
    cards: {
      note: "where the guarantees actually live",
      intro: (
        <>
          Two payer types on one contract is mostly plumbing. These are the
          parts that had to hold{" "}
          <span className="text-tx">without anyone trusting the operator:</span>
        </>
      ),
      cards: [
        {
          name: "the nonce is the intent",
          desc: "the EIP-3009 nonce is the intent id, so a signature can only settle the payment it was signed for. vanilla x402 clients generate their own nonce, so a facilitator bridge collects and re-signs instead of forking the standard",
        },
        {
          name: "refusal by revert",
          desc: "an agent buying outside its category is refused by AgentPBMWallet, not by a backend if-statement; the revert is caught by simulate-before-send, so CategoryNotAllowed rides out on the cancel and reaches the agent verbatim as the x402 error reason",
        },
        {
          name: "no key can raise a cap",
          desc: "agent wallets are payer-owned and setPolicy/revoke are onlyOwner, so there is no policy endpoint and no server key that can arm or lift a spend limit",
        },
        {
          name: "zero gas for the payer",
          desc: "the relayer holds the only gas key and submits every settlement, so a tourist with a stablecoin balance and no ETH can still pay a hawker",
        },
        {
          name: "labelled mocks",
          desc: "XSGD exists on no testnet, so it is mocked and the UI says so. the FX rate is owner-set, merchant categories are self-attested, and the one custodial hop on the standard scheme is named on the screen where it happens",
        },
      ],
    },
    stats: {
      note: "running on Base Sepolia",
      stats: [
        ["0", "ETH the payer needs; the relayer submits every settlement"],
        ["0.5%", "protocol fee, against ~2.8% on cards"],
        ["581", "tests: 201 Foundry, 189 backend, 187 shared, 4 agent"],
        ["4", "contracts deployed and verified on Basescan"],
      ],
    },
    plates: {
      note: "both doors, one feed",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1787719059/jagnani73/projects/gantry/02-landing-two-doors_b1svan.png",
          cap: "one rail, two doors: a printed QR, an HTTP 402, and the one contract that consumes both",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1787719063/jagnani73/projects/gantry/03-tourist-confirm-euros_tfw3sa.png",
          cap: "paying in euros: 0.894040 EURC out, 1.35 XSGD to the shop, gas paid for you",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1787719059/jagnani73/projects/gantry/05-agent-policy_signam.png",
          cap: "what the agent may spend: S$4.50 of a S$50 day, allowed at food and beverage, turned away at electronics, retail and transport",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1787719060/jagnani73/projects/gantry/01-overview-live-feed_nkfkff.png",
          cap: "the merchant's month: 106 agent payments and 50 human ones, dollars and euros, in one feed",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1787719063/jagnani73/projects/gantry/06-terminal-proof_xbg357.png",
          cap: "an unmodified x402 client pays, and a refusal is recomputed from public state at the block it happened",
          fit: "contain",
        },
      ],
      cta: {
        label: "view the source",
        href: "https://github.com/jagnani73/gantry",
      },
    },
  },
};
