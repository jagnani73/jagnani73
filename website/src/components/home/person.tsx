import { Fragment } from "react";
import { PERSON } from "@/content/home";
import { SectionHead } from "@/components/shared/section-head";
import { CtaTerm } from "@/components/shared/cta-term";
import { Arcade } from "@/components/home/arcade";
import { MusicPanel } from "@/components/home/music-panel";
import { SkyMap } from "@/components/home/sky-map";

// 03 · THE PERSON — "who, not just what": pull-quote + bio + the arcade, a
// "currently" signal strip, an off-the-clock media row (music + sky), contacts.
export const Person = () => (
  <section>
    <SectionHead source="page" id="person" n="03" title="THE PERSON" />

    {/* statement + arcade */}
    <div className="flex flex-col gap-[26px] px-4 pb-2 pt-6 rail:flex-row rail:items-start rail:gap-12 rail:px-11 rail:pb-[14px] rail:pt-9">
      <div className="rail:min-w-0 rail:flex-1">
        <p className="m-0 font-serif text-[26px] italic leading-tight text-tx2 rail:text-[38px]">
          {PERSON.quote.pre}
          <span className="text-tx">{PERSON.quote.emphasis}</span>
        </p>
        {PERSON.bio.map((para, i) => (
          <p
            key={i}
            className={`font-sans text-[15px] leading-[1.7] text-tx2 rail:text-[16.5px] ${
              i === 0 ? "mt-[22px]" : "mt-4"
            }`}
          >
            {para.map((seg, j) => (
              <Fragment key={j}>
                {seg.em ? <span className="text-tx">{seg.t}</span> : seg.t}
              </Fragment>
            ))}
          </p>
        ))}
      </div>
      <div className="rail:flex rail:flex-1 rail:justify-center">
        <div className="mx-auto flex w-full max-w-[480px] flex-col gap-3">
          <Arcade />
          <span className="text-center font-mono text-[11px] tracking-[0.08em] text-tx3">
            {PERSON.arcadeCaption}
          </span>
        </div>
      </div>
    </div>

    {/* currently — signal strip */}
    <div className="px-4 pb-1 pt-4 rail:px-11 rail:pb-1.5 rail:pt-5">
      <div className="grid grid-cols-2 gap-px border border-rule bg-rule rail:grid-cols-4">
        {PERSON.currently.map(([k, v]) => (
          <div
            key={k}
            className="bg-bg px-[14px] py-[13px] rail:px-4 rail:py-[15px]"
          >
            <p className="m-0 mb-[7px] font-mono text-[10.5px] tracking-[0.12em] text-pri">
              {k}
            </p>
            <p className="m-0 font-mono text-[11.5px] leading-[1.55] text-tx2 rail:text-[12.5px]">
              {v}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* off the clock — music + sky */}
    <div className="grid grid-cols-1 gap-4 px-4 pb-1 pt-[18px] rail:grid-cols-2 rail:gap-5 rail:px-11 rail:pb-1.5 rail:pt-[22px]">
      <MusicPanel />
      <SkyMap />
    </div>

    {/* contacts */}
    <div className="px-4 pb-[26px] pt-8 rail:px-11 rail:pb-10 rail:pt-12">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-[13px] text-tx2">
        {PERSON.links.map((l, i) => (
          <Fragment key={l.href}>
            {i > 0 && (
              <span aria-hidden className="text-tx3/50">
                /
              </span>
            )}
            <a
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="transition-colors hover:text-sig"
            >
              {l.label}
            </a>
          </Fragment>
        ))}
        <span className="ml-auto">
          <CtaTerm href={PERSON.resume.href} external>
            {PERSON.resume.label}
          </CtaTerm>
        </span>
      </div>
    </div>
  </section>
);
