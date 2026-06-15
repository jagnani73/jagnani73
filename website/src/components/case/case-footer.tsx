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
    <div className="flex flex-col flex-wrap justify-between gap-3 px-4 pb-[22px] pt-4 font-mono text-[12px] text-tx3 rail:flex-row rail:items-center rail:gap-1.5 rail:px-11 rail:pb-6">
      <Link href="/work" className="text-tx3 transition-colors hover:text-sig">
        ← BACK TO THE RECORD
      </Link>
      <Link
        href={`/work/${nextSlug}`}
        className="text-sig transition-colors hover:text-pri"
      >
        NEXT CASE — {nextTitle} →
      </Link>
      <BackToTop />
    </div>
  </>
);
