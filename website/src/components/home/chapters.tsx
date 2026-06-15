import Link from "next/link";
import { CHAPTERS } from "@/content/home";
import { SectionHead } from "./section-head";
import { Rule } from "./rule";

export const Chapters = () => (
  <section>
    <SectionHead
      id="chapters"
      n="01"
      title="THE CHAPTERS"
      note={
        <Link
          href="/work"
          className="text-tx3 transition-colors hover:text-sig"
        >
          full record at /work ↗
        </Link>
      }
    />
    {CHAPTERS.map((c, i) => (
      <div key={c.n}>
        {/* mobile */}
        <div className="px-4 pb-[22px] pt-5 rail:hidden">
          <div className="flex items-center gap-3.5">
            <span className="shrink-0 font-display text-[30px] text-transparent [-webkit-text-stroke:1px_var(--rule-strong)]">
              {c.n}
            </span>
            <span className="min-w-0">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[21px] tracking-[0.03em] text-tx transition-colors hover:text-sig"
              >
                {c.org}
              </a>
              <br />
              <span className="font-mono text-[12px] text-tx3">{c.role}</span>
            </span>
          </div>
          <p className="mt-3 font-sans text-[15.5px] leading-[1.6] text-tx2">
            {c.deck}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[12.5px]">
            {c.stats.map(([v, l]) => (
              <span key={l}>
                <span className="text-acc">{v}</span>
                <span className="text-tx2"> {l}</span>
              </span>
            ))}
          </div>
        </div>

        {/* desktop */}
        <div className="hidden items-center gap-x-7 px-11 py-[30px] rail:grid rail:grid-cols-[160px_320px_1fr_290px]">
          <span className="text-center font-display text-[46px] text-transparent [-webkit-text-stroke:1px_var(--rule-strong)]">
            {c.n}
          </span>
          <span>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[28px] tracking-[0.03em] text-tx transition-colors hover:text-sig"
            >
              {c.org}
            </a>
            <br />
            <span className="font-mono text-[12.5px] text-tx2">{c.role}</span>
          </span>
          <span className="font-sans text-[17.5px] leading-[1.65] text-tx2">
            {c.deck}
          </span>
          <span className="text-right font-mono text-[13px] leading-[2.1]">
            {c.stats.map(([v, l]) => (
              <span key={l}>
                <span className="text-acc">{v}</span>
                <span className="text-tx2"> {l}</span>
                <br />
              </span>
            ))}
          </span>
        </div>
        {i < CHAPTERS.length - 1 ? <Rule /> : null}
      </div>
    ))}
  </section>
);
