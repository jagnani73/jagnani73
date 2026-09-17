import type { CaseDetail } from "@/utils/types/case.types";
import { FigFacture } from "@/components/canvas/figs/fig-facture";

export const factureCase: CaseDetail = {
  seoDescription:
    "A market for invoice paper where buyers post standing bids by rating and tenor. Receivables become zero-coupon bonds on Hedera, and the cash settles on Arc.",
  badge: "HEDERA TOKENIZATION PRIZE · ETHONLINE 2026",
  deck: (
    <>
      an invoice is a zero-coupon bond nobody ever priced. buyers post standing
      bids by rating and tenor,{" "}
      <span className="text-tx">
        so every receivable arrives with a price already beside it.
      </span>
    </>
  ),
  fig: {
    component: FigFacture,
    alt: "MF-2080, sold on testnet, read against seven standing bids: two refused it on rating, two on debtor concentration, two priced it wider, and Harrow Point bought it at 8.50% for $19,813.69",
  },
  sections: {
    split: {
      title: "THE IDEA",
      note: "standardise the bid, not the paper",
      serif: (
        <>
          Factoring is bond pricing done over the phone. A business calls a
          factor, the paper is priced in private, and{" "}
          <span className="text-tx">
            the seller gives up two to five per cent of face for not waiting.
          </span>
        </>
      ),
      body: "Invoices never got an order book because no two are alike: a different debtor, a different amount, a different number of days to run. Facture standardises the bid instead. A buyer writes a standing mandate over a bucket, say A-rated paper, sixty days or less, at 8% annualised, and funds it. Each receivable is issued as a zero-coupon bond on Hedera's Asset Tokenization Studio and priced by reading those bids at its own rating and tenor. The paper stays unique while the buyers become interchangeable, so nobody waits for a counterparty.",
    },
    arch: {
      title: "FIVE MOVES",
      note: "the paper on Hedera · the money on Arc",
      body: (
        <>
          The bond never leaves Hedera and the cash never leaves Arc. Facture
          reads x402 as a settlement protocol rather than a paywall:{" "}
          <strong className="font-semibold text-tx">
            the challenge carries the asset leg and the payment signature is the
            cash leg
          </strong>
          , so delivery and payment happen together with no bridge.
        </>
      ),
      flow: [
        {
          stage: "LIST",
          role: "the receivable becomes an ATS zero-coupon bond, and its hash can mint only one token",
          tech: ["Hedera ATS", "UniquenessRegistry"],
        },
        {
          stage: "QUOTE",
          role: "standing mandates price it by simple discount, Actual/365, in integers",
          tech: ["@facture/shared", "bigint"],
        },
        {
          stage: "MATCH",
          role: "the security's own control list and KYC are read before matching, not at settlement",
          tech: ["AtsComplianceGate", "HCS"],
        },
        {
          stage: "SETTLE",
          role: "a funded bid pays out of its Arc vault in USDC; an unfunded one over x402 in HBAR",
          tech: ["x402 v2", "MandateVault"],
        },
        {
          stage: "MATURE",
          role: "a Scheduled Transaction pays face to whoever holds the token now",
          tech: ["Hedera", "Scheduled Tx"],
        },
      ],
      stack:
        "TypeScript monorepo · Solidity · Hardhat 3 · Next.js 15 · Hono · drizzle · SQLite · viem · Privy · Circle wallets · Hedera testnet · Arc testnet",
    },
    cards: {
      note: "where the guarantees actually live",
      intro: (
        <>
          Pricing the paper is arithmetic. These are the parts that had to hold{" "}
          <span className="text-tx">without anyone trusting the venue:</span>
        </>
      ),
      cards: [
        {
          name: "sold once, ever",
          desc: "a uniqueness registry on Hedera is keyed on debtor, invoice number and amount, and it is append-only with no release. a receivable already claimed by another instrument came back 409 here, which no local check could have produced",
        },
        {
          name: "refused before matching",
          desc: "an ineligible buyer is never matched, so a refusal is a 403 with a sentence instead of a reverted transfer. the first one on testnet read: Cordell Credit Partners is not permitted to hold this security by its control list",
        },
        {
          name: "a hash on a public topic",
          desc: "each refusal is committed to a Hedera Consensus Service topic as a SHA-256 digest and never as the reason, so a buyer can check the answer they were given without the topic broadcasting their exposure",
        },
        {
          name: "cash before paper",
          desc: "on the vault rail the cash commits before the bond moves, and the invoice counts as sold at the payout. the other order let a failed delivery leave a buyer holding paper nobody paid for, a double-spend caught in review",
        },
        {
          name: "maturity pays the holder",
          desc: "the payout is a Scheduled Transaction to whoever holds the token at maturity, left unsigned until the debtor's money has arrived, so paper that changed hands still gets paid",
        },
      ],
    },
    stats: {
      note: "measured on Hedera and Arc testnet",
      stats: [
        ["7.02M", "gas to issue one bond on Hedera; the first cost 7.93 HBAR"],
        [
          "0",
          "gas paid by the buyer on an x402 trade; the facilitator paid the 258,441 tinybar fee",
        ],
        [
          "0.49 HBAR",
          "for a trade's asset leg on Hedera, 445,892 gas, paid by the venue",
        ],
        [
          "$0.01",
          "between the on-chain book's price and the venue's on MF-2080, floor against ceil",
        ],
      ],
    },
    plates: {
      note: "screens from the demo book, then one real testnet sale",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1789390234/jagnani73/projects/facture/1._thesis_page_thv9eu.png",
          cap: "the front page, with a live invoice priced beside the argument: $128,400 due in 13 days, worth $128,091.31 at 6.75%",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1789390236/jagnani73/projects/facture/2._the_book_tywjvz.png",
          cap: "the seller's book: six invoices priced, five waiting on a customer, and three half-settled sales flagged at the top",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1789390234/jagnani73/projects/facture/3._invoice_with_a_live_price_wqxwiy.png",
          cap: "one price, line by line: $9,600 due in 4 days at 8.50% is an $8.95 discount, with nothing held back",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1789390234/jagnani73/projects/facture/4._standing_bids_cehml4.png",
          cap: "the buyer's side: two standing mandates, one escrowed on Arc and one not, and the invoices they declined, with the reason",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1789390234/jagnani73/projects/facture/5._proof_of_settlement_xhiriz.png",
          cap: "proof of settlement for MF-2080, sold on testnet: the bond on Hedera, the compliance decision read before matching, and its receipt on a public topic",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1789390234/jagnani73/projects/facture/6._debtor_confirmation_l7rp9z.png",
          cap: "what the customer gets: one sentence and two buttons, with no account to make and nothing to install",
        },
      ],
      cta: {
        label: "open the book",
        href: "https://facture-ethonline.vercel.app",
      },
      source: {
        label: "view the source",
        href: "https://github.com/jagnani73/facture",
      },
    },
  },
};
