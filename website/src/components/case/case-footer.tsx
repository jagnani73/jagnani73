import Link from "next/link";
import { BackToTop } from "@/components/shared/back-to-top";

export const CaseFooter = ({
  nextSlug,
  nextTitle,
}: {
  nextSlug: string;
  nextTitle: string;
}) => (
  <>
    <div className="h-px bg-rule-strong" />
    <div className="flex flex-col gap-3 px-4 pb-[22px] pt-4 font-mono text-[12px] text-tx3 rail:flex-row rail:items-center rail:justify-between rail:gap-1.5 rail:px-11 rail:pb-6">
      {/* back-to-record + next-case share one row on mobile; on desktop the
          wrapper dissolves (display:contents) into the 3-way justify-between row */}
      <div className="flex items-center justify-between gap-4 rail:contents">
        <Link
          href="/record"
          className="shrink-0 text-tx3 transition-colors hover:text-sig"
        >
          <span className="rail:hidden">← RECORD</span>
          <span className="hidden rail:inline">← BACK TO THE RECORD</span>
        </Link>
        <Link
          href={`/record/${nextSlug}`}
          className="flex min-w-0 items-center gap-1.5 text-sig transition-colors hover:text-pri"
        >
          <span className="shrink-0">
            <span className="rail:hidden">NEXT —</span>
            <span className="hidden rail:inline">NEXT CASE —</span>
          </span>
          {/* truncates if the case name is unusually long, so the row never wraps */}
          <span className="min-w-0 truncate">{nextTitle}</span>
          <span className="shrink-0">→</span>
        </Link>
      </div>
      <BackToTop />
    </div>
  </>
);
