import type { CaseData } from "@/utils/types/case.types";

export const storiesCase: CaseData = {
  slug: "stories",
  title: "STORIES",
  docTitle: "Stories — Case Study",
  seoDescription:
    "Anonymous peer support — matched by shared worries, with a toxicity gate on every message. HackCBS 3.0.",
  badge: "HACKCBS 3.0",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1714473758/jagnani73/projects/stories/2_1_wwqysl.png",
  deck: (
    <>
      anonymous peer support — matched by shared worries, with a{" "}
      <span className="text-tx">toxicity gate on every message</span>
    </>
  ),
  fig: "match",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "support, without exposure",
      serif: (
        <>
          People in distress need someone who{" "}
          <span className="text-tx">actually shares their worry</span> — and a
          guarantee the conversation stays safe and anonymous.
        </>
      ),
      body: "Stories matches users — as a seeker or a supporter — for anonymous, judgment-free conversation, pairing those who share the most concern tags. Real-time chat runs on Socket.IO with room state in Redis; every message passes a toxicity classifier before it reaches the seeker. Built for HackCBS 3.0.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "score-matched · filtered in transit",
      body: (
        <>
          Matching is{" "}
          <strong className="font-semibold text-tx">score-based</strong> — pairing
          users with the most shared tags. Messaging runs on{" "}
          <strong className="font-semibold text-tx">Socket.IO</strong> with room
          state in Redis; every outgoing message is scored by a{" "}
          <strong className="font-semibold text-tx">
            TensorFlow.js toxicity classifier
          </strong>{" "}
          and censored before delivery. Repeated reports trigger an IP + email ban
          via Redis-backed middleware.
        </>
      ),
      flow: [
        { stage: "TAG", role: "pick your worries", tech: ["React"] },
        { stage: "MATCH", role: "highest shared-tag score wins", tech: ["scoring"] },
        { stage: "CHAT", role: "real-time, room state in Redis", tech: ["Socket.IO", "Redis"] },
        { stage: "GATE", role: "toxic messages censored in transit", tech: ["TensorFlow.js"] },
      ],
      stack: "React · TypeScript · Node · Socket.IO · Redis · TensorFlow.js",
    },
    {
      type: "cards",
      n: "03",
      title: "WHAT I BUILT",
      note: "frontend · chat + admin",
      intro: (
        <>
          I built the complete frontend — the tag-selection flow, the live chat
          window, and the admin panel — around a{" "}
          <span className="font-mono text-sig">safety-first</span> model:
        </>
      ),
      cards: [
        { name: "tag matching", desc: "seekers and supporters paired by shared concerns" },
        { name: "toxicity filter", desc: "harmful messages censored before they land" },
        { name: "report + ban", desc: "IP + email ban via Redis middleware" },
        { name: "anonymous by design", desc: "no identities exchanged, ever" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–04 · the app",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473758/jagnani73/projects/stories/2_1_wwqysl.png", cap: "choosing your tags" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473761/jagnani73/projects/stories/3_1_xlmyej.png", cap: "an anonymous chat" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473755/jagnani73/projects/stories/4_1_ylfthn.png", cap: "the admin panel" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473752/jagnani73/projects/stories/1_1_rnugym.png", cap: "plate 04" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/stories" },
    },
  ],
  next: "bharat-beacon",
};
