import type { CaseSection as CaseSectionType } from "@/utils/types/case.types";
import { SectionHead } from "@/components/shared/section-head";
import { PlateViewer } from "./plate-viewer";

const SECTION_TITLE: Record<CaseSectionType["type"], string> = {
  split: "THE PROBLEM",
  arch: "THE ARCHITECTURE",
  cards: "THE HARD PART",
  stats: "BY THE NUMBERS",
  plates: "IN THE WILD",
};

export const CaseSection = ({
  section: s,
  index,
}: {
  section: CaseSectionType;
  index: number;
}) => {
  const n = String(index + 1).padStart(2, "0");
  const title = s.title ?? SECTION_TITLE[s.type];

  if (s.type === "split") {
    return (
      <section>
        <SectionHead source="case" n={n} title={title} note={s.note} />
        <div className="grid grid-cols-1 gap-[18px] px-4 pb-6 pt-5 rail:grid-cols-2 rail:gap-10 rail:px-11 rail:pb-[34px] rail:pt-7">
          <p className="m-0 font-sans text-[19px] leading-[1.5] text-tx2 rail:text-[23px]">
            {s.serif}
          </p>
          <p className="m-0 text-[16px] leading-[1.7] text-tx2">{s.body}</p>
        </div>
      </section>
    );
  }

  if (s.type === "arch") {
    return (
      <section>
        <SectionHead source="case" n={n} title={title} note={s.note} />
        <div className="px-4 pb-1 pt-5 rail:px-11 rail:pb-1.5 rail:pt-7">
          <p className="m-0 max-w-[860px] text-[16px] leading-[1.7] text-tx2">
            {s.body}
          </p>
        </div>
        <div className="flex flex-col items-stretch px-4 pb-2 pt-4 rail:flex-row rail:px-11 rail:pb-2.5 rail:pt-6">
          {s.flow.map((st, i) => (
            <div key={st.stage} className="contents">
              <div className="flex min-w-0 flex-1 flex-col rounded-md border border-rule bg-panel p-4 rail:px-[18px] rail:pb-3.5 rail:pt-4">
                <span className="font-mono text-[11px] tracking-[0.08em] text-tx3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 mb-1.5 mt-[7px] font-mono text-[13.5px] tracking-[0.08em] text-sig">
                  {st.stage}
                </p>
                <p className="m-0 text-[13.5px] leading-[1.55] text-tx2">
                  {st.role}
                </p>
                {st.tech ? (
                  <p className="m-0 mt-auto pt-2.5 font-mono text-[11.5px] leading-[1.7] text-tx3">
                    {st.tech.join(" · ")}
                  </p>
                ) : null}
              </div>
              {i < s.flow.length - 1 ? (
                <span className="shrink-0 self-center py-1 text-center font-mono text-[14px] text-rule-strong rail:px-2.5 rail:py-0">
                  <span className="rail:hidden">↓</span>
                  <span className="hidden rail:inline">→</span>
                </span>
              ) : null}
            </div>
          ))}
        </div>
        {s.stack ? (
          <div className="px-4 pb-[22px] pt-2.5 font-mono text-[13px] leading-[1.9] text-tx2 rail:px-11 rail:pb-[30px] rail:pt-3">
            <span className="text-tx3">STACK —</span> {s.stack}
          </div>
        ) : null}
      </section>
    );
  }

  if (s.type === "cards") {
    return (
      <section>
        <SectionHead source="case" n={n} title={title} note={s.note} />
        <div className="px-4 pb-1 pt-5 rail:px-11 rail:pb-2 rail:pt-7">
          <p className="m-0 max-w-[860px] text-[16px] leading-[1.7] text-tx2">
            {s.intro}
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-2.5 px-4 pb-6 pt-4 rail:gap-3.5 rail:px-11 rail:pb-[34px] rail:pt-[22px] rail:[grid-template-columns:repeat(var(--cards),minmax(0,1fr))]"
          style={{ "--cards": String(s.cards.length) } as React.CSSProperties}
        >
          {s.cards.map((c, i) => (
            <div
              key={c.name}
              className="rounded-md border border-rule bg-panel px-4 pb-3.5 pt-4"
            >
              <span className="font-display text-[26px] text-transparent [-webkit-text-stroke:1px_var(--rule-strong)]">
                0{i + 1}
              </span>
              <p className="m-0 mb-1 mt-2.5 font-mono text-[13.5px] tracking-[0.04em] text-tx">
                {c.name}
              </p>
              <p className="m-0 font-mono text-[12px] leading-[1.6] text-tx3">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (s.type === "stats") {
    return (
      <section>
        <SectionHead source="case" n={n} title={title} note={s.note} />
        <div className="grid grid-cols-2 gap-2.5 px-4 pb-[26px] pt-5 rail:grid-cols-4 rail:gap-3.5 rail:px-11 rail:pb-9 rail:pt-7">
          {s.stats.map(([big, label]) => (
            <div
              key={label}
              className="rounded-md border border-rule bg-panel p-4 rail:px-5 rail:py-[22px]"
            >
              <span className="font-display text-[32px] tracking-[0.02em] text-acc rail:text-[44px]">
                {big}
              </span>
              <p className="m-0 mt-1.5 font-mono text-[12.5px] tracking-[0.05em] text-tx3">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHead
        source="case"
        n={n}
        title={title}
        note={
          <>
            plates 01–{String(s.plates.length).padStart(2, "0")}
            {s.note ? <> · {s.note}</> : null}
          </>
        }
      />
      <PlateViewer plates={s.plates} cta={s.cta} />
    </section>
  );
};
