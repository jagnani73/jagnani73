import type { ResolvedCase } from "@/utils/types/case.types";
import { CaseFig } from "./case-fig";

export const CaseMasthead = ({ caseData: c }: { caseData: ResolvedCase }) => (
  <section>
    <div className="flex flex-wrap items-baseline justify-between gap-3 px-4 pt-4 pb-2.5 rail:px-11 rail:pt-[26px] rail:pb-3.5">
      <h1 className="m-0 font-display text-[clamp(38px,11vw,52px)] tracking-[0.01em] whitespace-nowrap uppercase rail:text-[clamp(56px,6.5vw,96px)]">
        {c.title}
      </h1>
      <span className="rounded-full border border-pri-a40 px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-sig rail:px-3.5 rail:py-[5px] rail:text-[13.5px]">
        {c.badge}
      </span>
    </div>

    <div className="px-4 pb-4 rail:px-11 rail:pb-[22px]">
      <span className="font-serif text-[clamp(22px,2.4vw,32px)] text-tx2 italic">
        {c.deck}
      </span>
    </div>

    {c.fig ? <CaseFig {...c.fig} /> : null}
  </section>
);
