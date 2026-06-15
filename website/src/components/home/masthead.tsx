import Link from "next/link";
import { BandCanvas } from "@/components/canvas/band-canvas";
import { DECK_LINES } from "@/content/home";
import { Rule } from "./rule";

const navLink =
  "cursor-pointer text-tx2 transition-colors hover:text-sig";

export const Masthead = () => (
  <section>
    {/* nav row */}
    <div className="flex flex-wrap items-baseline justify-between gap-4 px-4 py-3 font-mono text-[13.5px] text-tx3 rail:grid rail:grid-cols-[1fr_auto_1fr] rail:px-11 rail:pb-4 rail:pt-6">
      <span className="hidden rail:inline rail:justify-self-start">jagnani73</span>
      <span className="flex gap-4 rail:-translate-x-8 rail:justify-self-center rail:gap-[26px]">
        <a href="#chapters" className={navLink}>
          chapters
        </a>
        <a href="#work" className={navLink}>
          selected work
        </a>
        <a href="#person" className={navLink}>
          the person
        </a>
        <Link href="/work" className={navLink}>
          the record ↗
        </Link>
      </span>
      <span className="rail:justify-self-end">
        STATUS: <span className="text-acc">NTU SINGAPORE — AUG 2026</span>
      </span>
    </div>
    <Rule strong />

    {/* name */}
    <h1 className="m-0 overflow-hidden px-4 pb-3 pt-[18px] font-display text-[clamp(40px,13.5vw,60px)] leading-[0.95] tracking-[0.005em] text-tx rail:whitespace-nowrap rail:px-11 rail:pb-4 rail:pt-[26px] rail:text-[clamp(64px,8.6vw,126px)]">
      YASHVARDHAN JAGNANI
    </h1>
    <Rule />

    {/* BLOCKCHAIN lockup + deck */}
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 overflow-hidden px-4 py-3 rail:flex-nowrap rail:gap-5 rail:whitespace-nowrap rail:px-11 rail:py-[15px]">
      <span className="font-display text-[clamp(26px,3.3vw,48px)] tracking-[0.02em] text-pri">
        BLOCKCHAIN
      </span>
      <span className="font-serif text-[clamp(22px,2.7vw,39px)] italic text-tx">
        {DECK_LINES[0]}
      </span>
      <span className="font-serif text-[clamp(22px,2.7vw,39px)] italic text-tx">
        {DECK_LINES[1]}
      </span>
    </div>
    <Rule />

    {/* fig. 1 band */}
    <div className="relative h-40 overflow-hidden rail:h-[220px]">
      <BandCanvas />
      <span className="pointer-events-none absolute bottom-2.5 right-4 z-[2] font-mono text-[12px] text-tx3">
        fig. 1 — a slow map of a place that doesn&apos;t exist · your cursor is a
        hill
      </span>
    </div>
    <Rule />

    {/* 3-col summary */}
    <div className="grid grid-cols-1 font-mono text-[14px] leading-[1.8] text-tx2 rail:grid-cols-3">
      <div className="border-b border-rule px-4 py-3.5 rail:border-b-0 rail:border-r rail:px-11 rail:py-[18px]">
        <span className="text-tx3">LATEST —</span>
        <br />
        Covalent &apos;23–&apos;25 · InsidePoly &apos;26
        <br />
        next: <span className="text-sig">NTU Singapore · MSc, Aug 2026</span>
      </div>
      <div className="border-b border-rule px-4 py-3.5 rail:border-b-0 rail:border-r rail:px-11 rail:py-[18px]">
        <span className="text-tx3">RECORD —</span>
        <br />
        35+ projects · <span className="text-acc">9</span> hackathon awards
        <br />
        <span className="text-acc">3</span> IEEE papers · 105k+ npm downloads
      </div>
      <div className="px-4 py-3.5 rail:px-11 rail:py-[18px]">
        <span className="text-tx3">INSIDE —</span>
        <br />
        <a href="#work" className={navLink}>
          selected work, p.2 ↓
        </a>
        <br />
        <Link
          href="/work"
          className="text-tx2 transition-colors hover:text-sig"
        >
          full record at /work ↗
        </Link>
      </div>
    </div>
  </section>
);
