import { AstroLine } from "./astro-line";
import { BackToTop } from "./back-to-top";
import { COPYRIGHT } from "@/utils/constants/site";

// Shared footer for every page — Home, The Record, and case studies — rendered
// once by PageShell. `relative z-[1] bg-bg` keeps it opaque over The Record's
// fixed constellation canvas; it's a no-op on the canvas-less pages.
// (Case pages carry their case-to-case "next case" CTA in the plates section.)
export const PageFooter = () => {
  return (
    <footer className="relative z-[1] flex flex-col gap-3 border-t border-rule bg-bg px-4 py-6 rail:flex-row rail:items-center rail:justify-between rail:px-11">
      <span className="font-mono text-[11px] tracking-[0.08em] text-tx3">
        {COPYRIGHT} — <AstroLine />
      </span>
      <BackToTop />
    </footer>
  );
};
