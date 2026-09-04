"use client";

import { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import type { PdfViewProps } from "@/utils/types/component.types";

// PDF.js, rendering the document into the page itself.
//
// The obvious implementation — an `<iframe src="…pdf">` — is the one thing that
// cannot work here. **Chrome on Android refuses to render a PDF in a frame**
// and substitutes a grey placeholder card with its own "Open" button, which is
// exactly the phone a recruiter opens a shared link on. (Top-level navigation
// to the same URL renders fine; only the framed case is refused.) No header or
// URL fragment changes that, so the document has to be drawn by us.
//
// Rendering it ourselves also keeps what an image-stack fallback would have
// thrown away: real text. The layers below are selectable and searchable, and
// the links inside the PDF stay clickable.

// `new URL(..., import.meta.url)` rather than a CDN or a hand-copied file in
// `public/`: the bundler rewrites it to a hashed asset it emits itself, so the
// worker can never drift from the `pdfjs-dist` version react-pdf is compiled
// against — the mismatch that makes PDF.js fail with an opaque version error.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

/**
 * Cap the render width so a wide monitor doesn't rasterise an A4 page at 2000px
 * and hand back something blurry-edged and slow. Past this the page just
 * centres in the remaining space, the way a PDF viewer does.
 */
const MAX_PAGE_W = 900;

const Fallback = ({ text }: { text: string }) => (
  <p className="px-4 py-16 text-center font-mono text-[13px] text-tx3">
    {text}
  </p>
);

export const PdfView = ({ filePath, label }: PdfViewProps) => {
  const [pages, setPages] = useState(0);
  const [width, setWidth] = useState(0);

  // Measured, not CSS-scaled. react-pdf draws the canvas, the text layer and
  // the annotation layer separately; resizing the canvas with CSS moves only
  // that one and leaves selection boxes floating off the glyphs. Feeding a
  // pixel `width` keeps all three in step.
  //
  // A callback ref rather than an effect: it runs when the node attaches and
  // the ResizeObserver reports the first size immediately, so there is no
  // frame rendered at width 0 and no state written from an effect body.
  const observer = useRef<ResizeObserver | null>(null);
  const measure = useCallback((node: HTMLDivElement | null) => {
    observer.current?.disconnect();
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      // `- 32` leaves the page its gutter at every width without a media query.
      setWidth(Math.max(0, entry.contentRect.width - 32));
    });
    ro.observe(node);
    observer.current = ro;
  }, []);

  return (
    <div ref={measure} className="h-full overflow-y-auto overscroll-contain">
      <Document
        file={filePath}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
        loading={<Fallback text="LOADING…" />}
        error={
          <Fallback text="This document could not be displayed. Download it instead." />
        }
        // Announced by screen readers in place of the canvas soup.
        aria-label={label}
      >
        {Array.from({ length: pages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={Math.min(width, MAX_PAGE_W)}
            className="mx-auto my-4 w-fit shadow-lg"
            loading=""
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfView;
