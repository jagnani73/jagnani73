import type { CaseData } from "@/content/case-types";

export const nudgeLabCase: CaseData = {
  slug: "nudge-lab",
  title: "NUDGELAB",
  docTitle: "NudgeLab — Case Study",
  seoDescription:
    "No-code in-app nudges — design, configure, and ship user guidance without touching the product codebase. HackRx 3.0 Dark Horse.",
  badge: "HACKRX 3.0 · DARK HORSE",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1714473687/jagnani73/projects/nudge-lab/preview1_r2k59y.png",
  deck: (
    <>
      no-code in-app nudges — design, configure, and ship guidance{" "}
      <span className="text-tx">without touching the product codebase</span>
    </>
  ),
  fig: "nudge",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "every nudge is an engineering ticket",
      serif: (
        <>
          Onboarding flows, feature announcements, contextual prompts — each one
          traditionally means{" "}
          <span className="text-tx">another engineering ticket, another deploy.</span>
        </>
      ),
      body: "NudgeLab is a no-code, platform-independent nudge management service. Wrap any product with a lightweight SDK script tag, and a self-serve admin panel lets teams design, configure, and deploy in-app nudges — no codebase changes, no deploys. Built at HackRx 3.0, Bajaj Finserv's national hackathon, where it won the Dark Horse and Power & Pace awards.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "two delivery modes · backend-owned",
      body: (
        <>
          Two delivery paths.{" "}
          <strong className="font-semibold text-tx">Campaign nudges</strong> are
          pushed to a CDN edge and fetched by the client SDK on load — no per-user
          server roundtrip.{" "}
          <strong className="font-semibold text-tx">Trigger nudges</strong> run
          through HTTP polling: the backend SDK intercepts API calls, injects an
          event_label into a message queue, and the client polls for matching
          responses.
        </>
      ),
      flow: [
        { stage: "CONFIGURE", role: "design a nudge in the admin panel", tech: ["Next.js admin"] },
        { stage: "DISTRIBUTE", role: "campaign → CDN edge, cached", tech: ["CDN", "Client SDK"] },
        { stage: "TRIGGER", role: "event_label into a message queue", tech: ["Backend SDK", "queue"] },
        { stage: "DELIVER", role: "client polls + renders the nudge", tech: ["HTTP polling"] },
      ],
      stack: "Node · Express · Next.js · CDN delivery · message queue",
    },
    {
      type: "cards",
      n: "03",
      title: "WHAT I BUILT",
      note: "backend · both SDK layers",
      intro: (
        <>
          My work was entirely backend — both SDK layers, the queue pipeline, and
          the CDN mechanism. The subtle part was{" "}
          <span className="font-mono text-sig">cache invalidation</span>: making
          nudge updates propagate reliably without stale content reaching users:
        </>
      ),
      cards: [
        { name: "client + backend SDKs", desc: "one script tag wraps any existing product" },
        { name: "CDN distribution", desc: "static configs at the edge, no per-user roundtrip" },
        { name: "message queue", desc: "event_label routing for trigger-based nudges" },
        { name: "cache invalidation", desc: "config serialization so updates never go stale" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–03 · the admin panel",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473687/jagnani73/projects/nudge-lab/preview1_r2k59y.png", cap: "the admin panel" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473684/jagnani73/projects/nudge-lab/preview2_rdp0vp.png", cap: "configuring a nudge" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473690/jagnani73/projects/nudge-lab/preview4_dzkwog.png", cap: "a nudge, live" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/nudge-lab" },
    },
  ],
  next: "contracts",
};
