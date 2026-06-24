"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { useInView } from "@/hooks/use-in-view";
import { Rule } from "@/components/shared/rule";
import type { CaseFigure } from "@/utils/types/case.types";

// The fig component + its label come straight from the case data — no registry.
export const CaseFig = ({ component: FigComponent, alt }: CaseFigure) => {
  const mob = useIsMobile();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "200px" });
  return (
    <>
      <Rule />
      <div className="px-4 pt-4 pb-5 rail:px-11 rail:pt-5 rail:pb-6">
        <div ref={ref} role="img" aria-label={`Figure 1: ${alt}`}>
          <FigComponent mob={mob} active={inView} />
        </div>
      </div>
    </>
  );
};
