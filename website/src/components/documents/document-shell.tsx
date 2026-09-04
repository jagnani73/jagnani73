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
  // `h-screen` (100vh) is the floor; `100dvh` wins wherever it is supported.
  // Mobile browsers shrink the visual viewport as their chrome slides away, and
  // a `vh`-sized frame leaves the bottom strip of the document stranded under
  // it. The `supports` guard rather than a bare `dvh` so an older engine still
  // gets a full-height page instead of a collapsed one.
  <div className="flex h-screen flex-col bg-bg supports-[height:100dvh]:h-[100dvh]">
    <header className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-rule px-3 rail:px-5">
      <Link
        href="/"
        className="flex items-center gap-2.5 text-tx3 transition-colors hover:text-tx2"
        aria-label="jagnani73 — home"
      >
        <Mark size={26} className="block" />
        <span className="hidden font-mono text-[13px] tracking-[0.04em] min-[420px]:inline">
          jagnani73
        </span>
      </Link>

      {/* The document's own name, not a page title — this is a viewer. */}
      <span className="truncate font-mono text-[13px] tracking-[0.06em] text-tx2">
        {label.toUpperCase()}
      </span>

      <div className="flex shrink-0 items-center gap-x-4">
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

    {/* The frame is a flex child, never `h-full`. A percentage height resolves
        against the containing block's *specified* height, and this one's is
        `auto` — so `h-full` on the iframe silently collapsed it to the 150px
        CSS default while `<main>` itself measured the full 1097px. `min-h-0`
        lets it shrink below its content instead of overflowing the bar. */}
    <main className="flex min-h-0 flex-1 flex-col">{children}</main>
  </div>
);
