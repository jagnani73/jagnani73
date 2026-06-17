import Link from "next/link";
import { BandCanvas } from "@/components/canvas/band-canvas";
import { DECK } from "@/content/home";
import { RECORD, getRecordCounts } from "@/content/record";
import { Rule } from "@/components/shared/rule";

const navLink =
  "cursor-pointer whitespace-nowrap text-tx2 transition-colors hover:text-sig";

export const Masthead = () => {
  const counts = getRecordCounts();
  const hackathonWins = RECORD.filter(
    (r) => r.kind === "HACKATHON" && r.win,
  ).length;

  return (
    <section>
      <h1 className="m-0 overflow-hidden px-4 pb-3 pt-[18px] font-display text-[clamp(40px,13.5vw,60px)] leading-[0.95] tracking-[0.005em] text-tx rail:whitespace-nowrap rail:px-11 rail:pb-4 rail:pt-[26px] rail:text-[clamp(64px,8.6vw,126px)]">
        YASHVARDHAN JAGNANI
      </h1>
      <Rule />

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 overflow-hidden px-4 py-3 rail:flex-nowrap rail:gap-5 rail:whitespace-nowrap rail:px-11 rail:py-[15px]">
        <span className="font-display text-[clamp(26px,3.3vw,48px)] tracking-[0.02em] text-pri">
          BLOCKCHAIN
        </span>
        <span className="font-serif text-[clamp(22px,2.7vw,39px)] italic text-tx">
          {DECK}
        </span>
      </div>
      <Rule />

      <div className="relative h-40 overflow-hidden rail:h-[220px]">
        <BandCanvas />
        <span className="pointer-events-none absolute inset-x-4 bottom-2.5 z-[2] text-right font-mono text-[12px] text-tx3">
          fig. 1 — a slow map of a place that doesn&apos;t exist · your cursor is
          a hill
        </span>
      </div>
      <Rule />

      <div className="grid grid-cols-1 font-mono text-[14px] leading-[1.8] text-tx2 rail:grid-cols-3">
        <div className="border-b border-rule px-4 py-3.5 rail:border-b-0 rail:border-r rail:px-11 rail:py-[18px]">
          <span className="text-tx3">LATEST —</span>
          <br />
          Infinia &apos;26 · Covalent &apos;23–&apos;25
          <br />
          next: <span className="text-sig">NTU Singapore · MSc, Aug 2026</span>
        </div>
        <div className="border-b border-rule px-4 py-3.5 rail:border-b-0 rail:border-r rail:px-11 rail:py-[18px]">
          <span className="text-tx3">RECORD —</span>
          <br />
          {counts.PROJECT} projects ·{" "}
          <span className="text-acc">{hackathonWins}</span> hackathon awards
          <br />
          <span className="text-acc">{counts.RESEARCH}</span> IEEE papers · 105k+
          npm downloads
        </div>
        <div className="px-4 py-3.5 rail:px-11 rail:py-[18px]">
          <span className="text-tx3">INSIDE —</span>
          <br />
          <a href="#work" className={navLink}>
            selected work, p.2 ↓
          </a>
          <br />
          <Link
            href="/record"
            className="text-tx2 transition-colors hover:text-sig"
          >
            the full record ↗
          </Link>
        </div>
      </div>
    </section>
  );
};
