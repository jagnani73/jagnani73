import type { CaseData } from "@/content/case-types";

const MARQUEE_CODE = `import Marquee from "react-easy-marquee";

<Marquee
  duration={8000}
  axis="X"
  reverse
  pauseOnHover
  height="80px"
>
  <img src="/logo-a.svg" />
  <h2>any children — text, images, JSX</h2>
</Marquee>`;

export const marqueeCase: CaseData = {
  slug: "marquee",
  title: "REACT-EASY-MARQUEE",
  docTitle: "react-easy-marquee — Case Study",
  seoDescription:
    "A zero-dependency React marquee driven entirely by CSS keyframes — my most-installed npm package, 105K+ downloads.",
  badge: "NPM · 105K+ DOWNLOADS",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1714473627/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-10_vyyznz.png",
  deck: (
    <>
      a zero-dependency React marquee driven entirely by{" "}
      <span className="text-tx">CSS keyframes</span> — my most-installed artifact
    </>
  ),
  fig: "marquee",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "the ecosystem was too opinionated",
      serif: (
        <>
          Every React marquee package I tried was{" "}
          <span className="text-tx">
            too opinionated, leaned on JavaScript animation timers, or barely let
            you customize anything.
          </span>
        </>
      ),
      body: "So I built one from scratch: a fully customizable Marquee component that accepts any children — plain text, images, or arbitrary JSX — and scrolls them in a seamless loop. I designed, architected, and maintain the whole package end to end, from the CSS animation model to the prop API and the live demo site.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "three copies · one CSS keyframe",
      body: (
        <>
          No timers, no{" "}
          <strong className="font-semibold text-tx">requestAnimationFrame</strong>
          , no scroll listeners. The component renders{" "}
          <strong className="font-semibold text-tx">three offset copies</strong>{" "}
          of your children and drives them with a single CSS{" "}
          <strong className="font-semibold text-tx">@keyframes</strong> translate
          — so the loop is seamless and the whole thing stays lightweight and
          zero-dependency.
        </>
      ),
      flow: [
        { stage: "ACCEPT", role: "any children — text, images, JSX", tech: ["React"] },
        { stage: "DUPLICATE", role: "three offset copies: −1, 0, +1", tech: ["offset spans"] },
        {
          stage: "ANIMATE",
          role: "one @keyframes translate, GPU-driven",
          tech: ["CSS keyframes"],
        },
        {
          stage: "LOOP",
          role: "seamless — no JS, no scroll listeners",
          tech: ["zero deps"],
        },
      ],
      stack:
        "React · TypeScript · CSS keyframes · Rollup · zero runtime dependencies",
    },
    {
      type: "cards",
      n: "03",
      title: "THE HARD PART",
      note: "perceived speed, made consistent",
      intro: (
        <>
          One non-trivial nuance most competing packages ignore entirely:{" "}
          <span className="font-mono text-sig">
            perceived loop speed changes with content width
          </span>{" "}
          — few or many children should still feel like the same speed. The rest
          is a deliberately small, sharp API:
        </>
      ),
      cards: [
        {
          name: "consistent speed",
          desc: "the loop feels the same regardless of child count",
        },
        {
          name: "zero dependencies",
          desc: "nothing pulled in beyond React itself",
        },
        {
          name: "CSS-only motion",
          desc: "no timers or rAF — the browser does the work",
        },
        {
          name: "a sharp prop API",
          desc: "duration, axis, reverse, pauseOnHover, background, h/w",
        },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–03 · npm + the demo",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473627/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-10_vyyznz.png",
          cap: "the live demo site",
        },
        { kind: "code", code: MARQUEE_CODE, cap: "drop it in — any children" },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473624/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-55_skdcwe.png",
          cap: "axes, direction, pause-on-hover",
        },
      ],
      cta: {
        label: "view on npm ↗",
        href: "https://www.npmjs.com/package/react-easy-marquee",
      },
    },
  ],
  next: "shikshak",
};
