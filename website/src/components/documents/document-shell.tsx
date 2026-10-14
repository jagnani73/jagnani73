import Link from "next/link";
import { CtaTerm } from "@/components/shared/cta-term";
import { Mark } from "@/components/shared/mark";
import type { DocumentShellProps } from "@/utils/types/component.types";

// The document viewer's own shell, deliberately not `PageShell`.
//
// A recruiter opening a résumé link came for one thing, and the site furniture
// competes with it: the rail, the masthead status line, and a footer carrying a
// copyright, a rotating astronomy fact and a CTA to play the arcade. The
// masthead is worse than noisy here — its centre CTA is chosen by pathname and
// falls through to a default, so a document page was inviting the reader to go
// "← the record", somewhere they have never been.
//
// So: one hairline bar and the document. The bar keeps the single thing the
// full shell was there to provide — a route back to the site — because that
// route is the entire reason the PDF is served from this origin rather than
// pasted as a Drive link. The download sits in the bar rather than under the
// frame so it is reachable without scrolling on the phones whose in-app
// browsers refuse to render the frame at all.

export const DocumentShell = ({
  label,
  filePath,
  children,
}: DocumentShellProps) => (
  // A floor, not a fixed height: the document scrolls on the root, never inside
  // a box. A pinch-zoom pans the root scroller, and a nested `overflow-y-auto`
  // container splits each drag between the two — iOS locks the gesture to
  // whichever claimed it first (vertical *or* horizontal, never diagonal) and
  // Android wouldn't pan the zoomed page at all. One scroller avoids both.
  //
  // `svh` rather than `dvh` so the floor doesn't move as the mobile chrome
  // slides away mid-scroll; the `supports` guard keeps a full-height page on an
  // engine without it.
  <div className="flex min-h-screen flex-col bg-bg supports-[height:100svh]:min-h-svh">
    {/* Grid, not flex. `justify-between` centres the label in the space *left
        over* by the two side items, so an asymmetric bar (a 26px mark on the
        left, two CTAs on the right) pushes it off true centre — visibly so on a
        phone. Equal `1fr` tracks either side of an `auto` middle pin it to the
        real centre of the bar no matter what the sides weigh. */}
    {/* Sticky, so the download stays one tap away while the root scrolls. */}
    <header className="sticky top-0 z-10 grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-rule bg-bg px-3 rail:px-5">
      <Link
        href="/"
        className="flex items-center gap-2.5 justify-self-start text-tx3 transition-colors hover:text-tx2"
        aria-label="jagnani73, home"
      >
        <Mark size={26} className="block" />
        <span className="hidden font-mono text-[13px] tracking-[0.04em] min-[420px]:inline">
          jagnani73
        </span>
      </Link>

      {/* The document's own name, not a page title — this is a viewer. */}
      <span className="min-w-0 truncate justify-self-center font-mono text-[13px] tracking-[0.06em] text-tx2">
        {label.toUpperCase()}
      </span>

      <div className="flex shrink-0 items-center gap-x-4 justify-self-end">
        {/* Both labels key off the SAME `min-[560px]` predicate, so exactly one
            is ever showing. Pairing `max-[560px]` with `min-[561px]` instead
            leaves a gap: a viewport is not always a whole number of CSS pixels
            (a 1.25 device pixel ratio lands on 560.8), and at that width
            neither query matched and the button read "DOWNLOADPDF". */}
        <CtaTerm href={filePath} download arrow="↓">
          <span className="hidden min-[560px]:inline">DOWNLOAD</span>
          <span className="min-[560px]:hidden">PDF</span>
        </CtaTerm>
        <span className="hidden min-[560px]:inline">
          <CtaTerm href={filePath} external arrow="↗">
            OPEN
          </CtaTerm>
        </span>
      </div>
    </header>

    {/* `flex-1` so the panel behind the pages reaches the bottom of the
        screen when the document is shorter than it. */}
    <main className="flex flex-1 flex-col">{children}</main>
  </div>
);
