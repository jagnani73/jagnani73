import Link from "next/link";
import type { CaseDetail } from "@/utils/types/case.types";
import { CaseFig } from "./case-fig";

export const CaseMasthead = ({ caseData: c }: { caseData: CaseDetail }) => (
  <section>
    <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 font-mono text-[13.5px] text-tx3 rail:px-11 rail:pb-4 rail:pt-6">
      <Link href="/" className="text-tx2 transition-colors hover:text-sig">
        ↖ the front page
      </Link>
      <Link href="/record" className="text-tx2 transition-colors hover:text-sig">
        ← the record
      </Link>
      {c.idx ? (
        <span className="hidden rail:inline">
          CASE — {c.idx} / {String(c.rosterSize).padStart(2, "0")}
        </span>
      ) : null}
    </div>
    <div className="h-px bg-rule-strong" />

    <div className="flex flex-wrap items-baseline justify-between gap-3 px-4 pb-2.5 pt-4 rail:px-11 rail:pb-3.5 rail:pt-[26px]">
      <h1 className="m-0 whitespace-nowrap font-display text-[clamp(38px,11vw,52px)] uppercase tracking-[0.01em] rail:text-[clamp(56px,6.5vw,96px)]">
        {c.title}
      </h1>
      <span className="whitespace-nowrap rounded-full border border-pri-a40 px-2.5 py-1 font-mono text-[11px] text-sig rail:px-3.5 rail:py-[5px] rail:text-[13.5px]">
        {c.badge}
      </span>
    </div>

    <div className="px-4 pb-4 rail:px-11 rail:pb-[22px]">
      <span className="font-serif text-[clamp(22px,2.4vw,32px)] italic text-tx2">
        {c.deck}
      </span>
    </div>

    {c.fig ? <CaseFig fig={c.fig} alt={c.figAlt ?? ""} /> : null}
  </section>
);
