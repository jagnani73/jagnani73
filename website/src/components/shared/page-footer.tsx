import { AstroLine } from "./astro-line";
import { BackToTop } from "./back-to-top";

// Shared footer for Home and The Record. Case pages render their own footer
// (back-to-record + next-case cycling).
export const PageFooter = () => {
  return (
    <footer className="flex flex-col gap-3 border-t border-rule px-4 py-6 rail:flex-row rail:items-center rail:justify-between rail:px-11">
      <span className="font-mono text-[11px] tracking-[0.08em] text-tx3">
        © 2026 YASHVARDHAN JAGNANI — <AstroLine />
      </span>
      <BackToTop />
    </footer>
  );
};
