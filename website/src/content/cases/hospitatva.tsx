import type { CaseData } from "@/content/case-types";

export const hospitatvaCase: CaseData = {
  slug: "hospitatva",
  title: "HOSPITATVA",
  docTitle: "Hospitatva — Case Study",
  badge: "SMART INDIA HACKATHON · 2022",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1714473710/jagnani73/projects/hospitatva/preview1_1_ghtg1s.png",
  deck: (
    <>
      a national portal against pandemic price-gouging — hospital rates{" "}
      <span className="text-tx">recorded immutably, checked by ML</span>
    </>
  ),
  fig: "price",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "price-gouging in a crisis",
      serif: (
        <>
          During COVID, private hospitals inflated costs for beds, oxygen, and
          treatment — and{" "}
          <span className="text-tx">opacity around availability left families helpless.</span>
        </>
      ),
      body: "Hospitatva is a national information portal bringing full transparency to hospital pricing and commodity availability. A distributed ledger on Zilliqa records the rates hospitals propose and charge; a 30-input ML model detects billing anomalies before invoices are finalized. Built for Smart India Hackathon Internals 2022.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "Zilliqa · Scilla · three portals",
      body: (
        <>
          Scilla smart contracts on{" "}
          <strong className="font-semibold text-tx">Zilliqa</strong> immutably
          record proposed rates and live commodity counts. Three portals serve
          patients, hospital staff, and officials; a{" "}
          <strong className="font-semibold text-tx">30-input ML price model</strong>{" "}
          flags anomalies, and I built the frontend logic — including DID-based
          auth via MagicLink, grounded in the Web of Trust.
        </>
      ),
      flow: [
        { stage: "RECORD", role: "proposed rates + commodity counts on-chain", tech: ["Zilliqa", "Scilla"] },
        { stage: "AUTH", role: "DID sign-in, Web of Trust", tech: ["MagicLink"] },
        { stage: "PREDICT", role: "30-input model flags anomalies", tech: ["scikit-learn", "TensorFlow"] },
        { stage: "REVIEW", role: "officials triage patient complaints", tech: ["Next.js"] },
      ],
      stack: "Zilliqa · Scilla · Next.js · TypeScript · MagicLink (DID) · scikit-learn",
    },
    {
      type: "cards",
      n: "03",
      title: "THE HARD PART",
      note: "decentralized identity at the app layer",
      intro: (
        <>
          I integrated{" "}
          <span className="font-mono text-sig">DID-based authentication</span> via
          MagicLink — which meant rethinking how auth context flows through a
          Next.js app when identity is cryptographic, not a session cookie:
        </>
      ),
      cards: [
        { name: "DID auth", desc: "wallet-native sign-in on the Web of Trust model" },
        { name: "no sessions / JWTs", desc: "auth state tied to cryptographic identity" },
        { name: "three-portal flow", desc: "patients, hospitals, and officials, one ledger" },
        { name: "anomaly pipeline", desc: "ML flags inflated bills before they finalize" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–03 · the portal",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473710/jagnani73/projects/hospitatva/preview1_1_ghtg1s.png", cap: "the patient portal" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473707/jagnani73/projects/hospitatva/preview2_ov2nxo.png", cap: "browsing hospitals" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473715/jagnani73/projects/hospitatva/preview3_cl9fz1.png", cap: "verifying a price" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/hospitatva" },
    },
  ],
  next: "shikshak",
};
