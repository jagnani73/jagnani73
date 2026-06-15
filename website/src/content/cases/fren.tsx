import type { CaseData } from "@/content/case-types";

export const frenCase: CaseData = {
  slug: "fren",
  idx: "14",
  rosterSize: 16,
  title: "FREN",
  docTitle: "Fren — Case Study",
  badge: "HACKTHEMOUNTAINS 2020 · 4TH",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1714473737/jagnani73/projects/fren/screenshot-therapist_1_xy2335.png",
  deck: (
    <>
      privacy-first therapy journaling — therapists see the{" "}
      <span className="text-tx">emotional picture, never the raw words</span>
    </>
  ),
  fig: "journal",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "openness vs. privacy",
      serif: (
        <>
          Honest journaling needs total privacy — but a therapist still needs{" "}
          <span className="text-tx">the emotional signal behind the writing.</span>
        </>
      ),
      body: "Fren lets clients write diary entries freely, but therapists never see the raw notes. An NLP layer — sentiment analysis, TF-IDF word analysis, and a network graph of context-related terms — surfaces the emotional picture instead. Built at HackTheMountains 2020, where it placed Fourth.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "MERN + a Flask ML service",
      body: (
        <>
          A <strong className="font-semibold text-tx">MERN</strong> stack logs
          timestamped entries through a Node/Express API on MongoDB, while a{" "}
          <strong className="font-semibold text-tx">Flask microservice</strong>{" "}
          runs the Python ML pipeline (scikit-learn, spaCy, NLTK, TextBlob) — a
          multi-layer perceptron for sentiment, TF-IDF for keywords — so only the
          analysis ever crosses to the therapist.
        </>
      ),
      flow: [
        { stage: "WRITE", role: "client journals privately", tech: ["React", "MongoDB"] },
        { stage: "ANALYZE", role: "sentiment + TF-IDF + term graph", tech: ["Flask", "scikit-learn"] },
        { stage: "SURFACE", role: "the emotional picture, not the text", tech: ["spaCy", "NLTK"] },
        { stage: "REVIEW", role: "therapist reads the analysis only", tech: ["React"] },
      ],
      stack: "React · TypeScript · Node · Express · MongoDB · Flask · scikit-learn · spaCy",
    },
    {
      type: "cards",
      n: "03",
      title: "WHAT I BUILT",
      note: "frontend · both surfaces",
      intro: (
        <>
          I built the full React/TypeScript frontend — both the client journaling
          interface and the{" "}
          <span className="font-mono text-sig">therapist analytics panel</span>,
          where raw entries are deliberately never shown:
        </>
      ),
      cards: [
        { name: "private journaling", desc: "free-form entries, encrypted to the client" },
        { name: "sentiment gauge", desc: "MLP classifier surfaces mood over time" },
        { name: "TF-IDF keywords", desc: "the themes behind the writing" },
        { name: "therapist panel", desc: "analysis only — never the raw notes" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plate 01 · the therapist view",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473737/jagnani73/projects/fren/screenshot-therapist_1_xy2335.png", cap: "the therapist analytics panel" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/fren" },
    },
  ],
  next: "stories",
};
