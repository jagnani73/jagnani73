import type { CaseDetail } from "@/utils/types/case.types";
import { FigJournal } from "@/components/canvas/figs/fig-journal";

export const frenCase: CaseDetail = {
  seoDescription:
    "Privacy-first therapy journaling: therapists see the emotional picture, never the raw words. HackTheMountains 2020.",
  badge: "HACKTHEMOUNTAINS 2020 · 4TH",
  deck: (
    <>
      privacy-first therapy journaling: therapists see the{" "}
      <span className="text-tx">emotional picture, never the raw words</span>
    </>
  ),
  fig: {
    component: FigJournal,
    alt: "the therapist sees the analysis, never the raw entry",
  },
  sections: {
    split: {
      note: "openness vs. privacy",
      serif: (
        <>
          Honest journaling needs total privacy, but a therapist still needs{" "}
          <span className="text-tx">
            the emotional signal behind the writing.
          </span>
        </>
      ),
      body: "Fren lets clients write diary entries freely, but therapists never see the raw notes. An NLP layer (sentiment analysis, TF-IDF word analysis, and a network graph of context-related terms) surfaces the emotional picture instead. Built at HackTheMountains 2020, where it placed Fourth.",
    },
    arch: {
      note: "MERN + a Flask ML service",
      body: (
        <>
          A <strong className="font-semibold text-tx">MERN</strong> stack logs
          timestamped entries through a Node/Express API on MongoDB, while a{" "}
          <strong className="font-semibold text-tx">Flask microservice</strong>{" "}
          runs the Python ML pipeline (scikit-learn, spaCy, NLTK, TextBlob): a
          multi-layer perceptron for sentiment, TF-IDF for keywords, so only the
          analysis ever crosses to the therapist.
        </>
      ),
      flow: [
        {
          stage: "WRITE",
          role: "client journals privately",
          tech: ["React", "MongoDB"],
        },
        {
          stage: "ANALYZE",
          role: "sentiment + TF-IDF + term graph",
          tech: ["Flask", "scikit-learn"],
        },
        {
          stage: "SURFACE",
          role: "the emotional picture, not the text",
          tech: ["spaCy", "NLTK"],
        },
        {
          stage: "REVIEW",
          role: "therapist reads the analysis only",
          tech: ["React"],
        },
      ],
      stack:
        "React · TypeScript · Node · Express · MongoDB · Flask · scikit-learn · spaCy",
    },
    cards: {
      title: "WHAT I BUILT",
      note: "frontend · both surfaces",
      intro: (
        <>
          I built the full React/TypeScript frontend: both the client journaling
          interface and the{" "}
          <span className="font-mono text-sig">therapist analytics panel</span>,
          where raw entries are deliberately never shown:
        </>
      ),
      cards: [
        {
          name: "private journaling",
          desc: "free-form entries, encrypted to the client",
        },
        {
          name: "sentiment gauge",
          desc: "MLP classifier surfaces mood over time",
        },
        { name: "TF-IDF keywords", desc: "the themes behind the writing" },
        {
          name: "therapist panel",
          desc: "analysis only, never the raw notes",
        },
      ],
    },
    plates: {
      note: "the therapist view",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473737/jagnani73/projects/fren/screenshot-therapist_1_xy2335.png",
          cap: "the therapist analytics panel",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473741/jagnani73/projects/fren/screenshot-client_1_ftnrvo.png",
          cap: "the client view",
        },
      ],
      cta: {
        label: "view the source",
        href: "https://github.com/jagnani73/fren",
      },
    },
  },
};
