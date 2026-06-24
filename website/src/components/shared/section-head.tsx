import type { SectionHeadProps } from "@/utils/types/component.types";
import { Rule } from "@/components/shared/rule";

// Numbered section header (outlined numeral + title + note between two rules).
// `source` picks the home ("page") vs case-study sizing; "page" is also anchored.
export const SectionHead = ({
  n,
  title,
  note,
  source,
  id,
}: SectionHeadProps) => {
  const page = source === "page";
  return (
    <div id={id} className={page ? "scroll-mt-16" : undefined}>
      <Rule strong />
      <div
        className={`flex flex-col items-start gap-1.5 px-4 py-3.5 rail:flex-row rail:flex-wrap rail:items-baseline rail:justify-between rail:px-11 ${
          page ? "rail:py-[18px]" : "rail:py-4"
        }`}
      >
        <span
          className={`font-display tracking-[0.04em] text-tx ${
            page
              ? "text-[23px] rail:text-[32px]"
              : "text-[22px] rail:text-[30px]"
          }`}
        >
          <span className="mr-4 text-transparent [-webkit-text-stroke:1px_var(--pri)]">
            {n}
          </span>
          {title}
        </span>
        {note ? (
          <span className="font-mono text-[13px] text-tx3">{note}</span>
        ) : null}
      </div>
      <Rule />
    </div>
  );
};
