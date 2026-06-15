import type { ReactNode } from "react";

// Case-study section header — Anton title with an outlined leading numeral.
export const CaseSectionHead = ({
  n,
  title,
  note,
}: {
  n: string;
  title: string;
  note?: ReactNode;
}) => (
  <div>
    <div className="h-px bg-rule-strong" />
    <div className="flex flex-wrap items-baseline justify-between gap-1.5 px-4 py-3.5 rail:px-11 rail:py-4">
      <span className="font-display text-[22px] tracking-[0.04em] text-tx rail:text-[30px]">
        <span className="mr-4 text-transparent [-webkit-text-stroke:1px_var(--pri)]">
          {n}
        </span>
        {title}
      </span>
      {note ? <span className="font-mono text-[13px] text-tx3">{note}</span> : null}
    </div>
    <div className="h-px bg-rule" />
  </div>
);
