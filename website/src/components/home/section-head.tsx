import { Rule } from "./rule";

interface SectionHeadProps {
  /** Outlined leading numeral, e.g. "01". */
  n: string;
  title: string;
  note?: React.ReactNode;
  id?: string;
}

// "01 THE CHAPTERS" — Anton title with an outlined leading numeral and a mono note.
export const SectionHead = ({ n, title, note, id }: SectionHeadProps) => (
  <div id={id} className="scroll-mt-16">
    <Rule strong />
    <div className="flex flex-wrap items-baseline justify-between gap-1.5 px-4 py-3.5 rail:px-11 rail:py-[18px]">
      <span className="font-display text-[23px] tracking-[0.04em] text-tx rail:text-[32px]">
        <span className="mr-4 text-transparent [-webkit-text-stroke:1px_var(--pri)]">
          {n}
        </span>
        {title}
      </span>
      {note ? <span className="font-mono text-[13px] text-tx3">{note}</span> : null}
    </div>
    <Rule />
  </div>
);
