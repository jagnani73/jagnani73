import { AstroLine } from "./astro-line";
import { BackToTop } from "./back-to-top";
import { FooterArcadeCta } from "./footer-arcade-cta";
import { COPYRIGHT } from "@/utils/constants/site";

// Shared footer for every page — Home, The Record, and case studies — rendered
// once by PageShell. `relative z-[1] bg-bg` keeps it opaque over The Record's
// fixed constellation canvas; it's a no-op on the canvas-less pages.
// (Case pages carry their case-to-case "next case" CTA in the plates section.)
// Desktop is a 3-column grid (copyright | arcade CTA | back-to-top) so the centre
// CTA is anchored dead-centre regardless of the side widths — flex justify-between
// can't do that. Explicit `col-start-*` keeps back-to-top in column 3 even when
// the arcade CTA renders null (dev, or on /arcade itself). Mobile stacks them.
export const PageFooter = () => {
  return (
    <footer className="relative z-[1] flex flex-col gap-3 border-t border-rule bg-bg px-4 py-6 rail:grid rail:grid-cols-3 rail:items-center rail:px-11">
      <span className="font-mono text-[11px] tracking-[0.08em] text-tx3 rail:col-start-1 rail:justify-self-start">
        {COPYRIGHT} — <AstroLine />
      </span>
      <FooterArcadeCta />
      <div className="rail:col-start-3 rail:justify-self-end">
        <BackToTop />
      </div>
    </footer>
  );
};
