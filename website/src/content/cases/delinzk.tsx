import type { CaseDetail } from "@/utils/types/case.types";
import { FigZk } from "@/components/canvas/figs/fig-zk";

export const delinzkCase: CaseDetail = {
  seoDescription:
    "Prove you worked somewhere without revealing where: zero-knowledge proof-of-employment credentials. ETHForAll 2023.",
  badge: "ETHFORALL · 2023",
  deck: (
    <>
      prove you worked somewhere{" "}
      <span className="text-tx">without revealing where</span>: zk
      proof-of-employment credentials
    </>
  ),
  fig: {
    component: FigZk,
    alt: "proof-of-employment: proven true, employer kept private",
  },
  sections: {
    split: {
      note: "credentials are trust-me",
      serif: (
        <>
          Anyone can claim a job title with no way to verify it, and background
          checks are{" "}
          <span className="text-tx">
            slow, invasive, and still offer no cryptographic guarantee.
          </span>
        </>
      ),
      body: "deLinZK replaces trust-me credentials with mathematically unforgeable ones. Using Polygon ID and the Iden3 framework, a verified organization issues a Verifiable Credential encoding an employee's tenure. When the employee applies on the integrated job board, they generate a zero-knowledge proof of employment, revealing no underlying personal data. Built at ETHForAll Online VIII.",
    },
    arch: {
      note: "Polygon ID · Iden3 · zk-only auth",
      body: (
        <>
          After admin verification, an org issues a{" "}
          <strong className="font-semibold text-tx">
            Verifiable Credential
          </strong>{" "}
          to an employee&apos;s identity wallet. On the job board, the employee
          generates a{" "}
          <strong className="font-semibold text-tx">
            zero-knowledge proof
          </strong>{" "}
          that proves employment without revealing data.{" "}
          <strong className="font-semibold text-tx">Redis</strong> manages
          real-time state across the WebSocket and REST layers; ZK proofs
          replace JWTs entirely.
        </>
      ),
      flow: [
        {
          stage: "VET",
          role: "admin confirms the org is legitimate",
          tech: ["Next.js"],
        },
        {
          stage: "ISSUE",
          role: "credential of tenure to the identity wallet",
          tech: ["Polygon ID", "Iden3"],
        },
        {
          stage: "PROVE",
          role: "zk proof of employment on the job board",
          tech: ["zero-knowledge"],
        },
        {
          stage: "VERIFY",
          role: "checked, no personal data revealed",
          tech: ["Redis", "Supabase"],
        },
      ],
      stack: "Polygon ID · Iden3 · Next.js · Redis · Supabase · TypeScript",
    },
    cards: {
      note: "a 15-digit integer constraint",
      intro: (
        <>
          Polygon ID imposes a 15-digit integer limit on credential attributes;
          encoding employment tenure into one field was a real puzzle. I solved
          it with <span className="font-mono text-sig">SHAKE-128 hashing</span>,
          converting to hex then decimal radix to produce compact, uniquely
          deterministic 48-bit values:
        </>
      ),
      cards: [
        {
          name: "15-digit constraint",
          desc: "the hard limit on credential attributes",
        },
        {
          name: "SHAKE-128 encoding",
          desc: "hash → hex → decimal radix → 48-bit values that fit",
        },
        {
          name: "zk-only auth",
          desc: "JWTs replaced entirely by proofs; email is for comms only",
        },
        {
          name: "org verification",
          desc: "issuers vetted before they can vouch",
        },
      ],
    },
    plates: {
      note: "ETHForAll",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/70ffc667-d062-4948-97dc-85c438a7ef7d_irclpf.png",
          cap: "the credential flow",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/91a99762-16bf-4ba8-b12c-35ceaba31927_nixd6w.png",
          cap: "issuing a credential",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/e505aa8f-668a-40a8-822d-3fa261b68ff7_azumdi.png",
          cap: "proving employment",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/6a559df0-848d-46e9-9b81-a25383c5b89d_npadrq.jpg",
          cap: "the org dashboard",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766558075/jagnani73/projects/delinzk/ea9ad5d5-7066-41a4-b44b-bd2814f37f57_hftzqk.png",
          cap: "a zero-knowledge proof",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/350ad1c9-a430-42bb-ae52-d28f70b7ae34_to9t6l.png",
          cap: "the verifier view",
        },
      ],
      cta: {
        label: "view the source",
        href: "https://github.com/jagnani73/delinzk",
      },
    },
  },
};
