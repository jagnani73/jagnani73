import type { CaseDetail } from "@/utils/types/case.types";
import { FigLedger } from "@/components/canvas/figs/fig-ledger";

export const contractsCase: CaseDetail = {
  seoDescription:
    "Split expenses with friends on-chain — every edit, settle, and delete kept in an immutable audit log. Best Hedera, Rookie Hacks II.",
  badge: "ROOKIE HACKS II · BEST HEDERA",
  deck: (
    <>
      split expenses with friends on-chain — every edit, settle, and delete kept
      in an <span className="text-tx">immutable audit log</span>
    </>
  ),
  fig: { component: FigLedger, alt: "every edit appended to an immutable, on-chain audit log" },
  sections: {
    split: {
      note: "someone always edits the record",
      serif: (
        <>
          Splitting expenses is easy until someone disputes a transaction — or{" "}
          <span className="text-tx">quietly edits a record nobody else can see.</span>
        </>
      ),
      body: "Contracts moves the whole expense-splitting workflow onto a blockchain, where the ledger's immutability means no transaction can be altered without a visible, permanent trace. Built at Rookie Hacks II 2022, where it won Best Blockchain Project Using Hedera.",
    },
    arch: {
      note: "Hedera contracts as the database",
      body: (
        <>
          Instead of a traditional database, the backbone is{" "}
          <strong className="font-semibold text-tx">
            Hedera-deployed Solidity contracts
          </strong>
          . Users authenticate with blockchain accounts; every mutation — an edit,
          a deletion, a settlement — is captured in an{" "}
          <strong className="font-semibold text-tx">immutable audit log</strong>,
          so all participants share one tamper-proof history.
        </>
      ),
      flow: [
        { stage: "AUTH", role: "sign in with a blockchain account", tech: ["Hedera"] },
        { stage: "RECORD", role: "add / edit / settle a shared expense", tech: ["Solidity"] },
        { stage: "APPEND", role: "every mutation logged immutably", tech: ["audit log"] },
        { stage: "VIEW", role: "one transparent history for all", tech: ["Next.js"] },
      ],
      stack: "Solidity · Hedera · Next.js · Express · Node · TailwindCSS",
    },
    cards: {
      note: "Hedera, newly launched",
      intro: (
        <>
          I built the full frontend — the blockchain auth flow and the transaction
          UI. The challenge was{" "}
          <span className="font-mono text-sig">Hedera&apos;s nascent tooling</span>:
          sparse docs for a freshly-launched platform meant first-principles
          debugging to get auth and contract calls working together:
        </>
      ),
      cards: [
        { name: "blockchain auth", desc: "wallet-account sign-in, no passwords" },
        { name: "contract-as-database", desc: "expenses persisted as on-chain state" },
        { name: "immutable audit log", desc: "edits and settlements traceable forever" },
        { name: "sparse-docs debugging", desc: "first-principles work on a new platform" },
      ],
    },
    plates: {
      note: "Rookie Hacks II",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473805/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-39_lskus9.png", cap: "the expense view" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473807/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-25_hpuchh.png", cap: "splitting an expense" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473811/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-20_hxrgok.png", cap: "the audit trail" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473801/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-58_qpcdoj.png", cap: "settling up" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/contracts" },
    },
  },
};
