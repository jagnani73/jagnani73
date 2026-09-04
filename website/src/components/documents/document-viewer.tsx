"use client";

import dynamic from "next/dynamic";
import type { DocumentViewerProps } from "@/utils/types/component.types";

// The client boundary around the PDF renderer, and nothing else.
//
// It exists because handing someone a bare PDF fails them twice. A PDF response
// has no `<head>`, so a link pasted into LinkedIn or Slack unfurls as a bare
// blue URL with no name and no thumbnail. And Chrome on Android will not render
// a PDF inside a frame at all — it draws a placeholder card with its own
// "Open" button — which is the phone most shared links get opened on. Neither
// is fixable with headers: the endpoint sets `Content-Disposition: inline` and
// that is correct, those clients simply ignore it. So `pdf-view.tsx` draws the
// document with PDF.js instead of delegating to a viewer that may decline.
//
// `ssr: false` is required and can only be set from a client component. PDF.js
// reaches for `DOMMatrix` and `canvas` at module scope, so rendering it on the
// server throws before it can draw anything. Loading it dynamically also keeps
// ~400KB of renderer out of every other route's bundle — only the three
// document paths pay for it.
const PdfView = dynamic(
  () => import("./pdf-view").then((m) => m.PdfView),
  {
    ssr: false,
    loading: () => (
      <p className="px-4 py-16 text-center font-mono text-[13px] text-tx3">
        LOADING…
      </p>
    ),
  },
);

export const DocumentViewer = ({ label, filePath }: DocumentViewerProps) => (
  <div className="min-h-0 flex-1 bg-panel">
    <PdfView filePath={filePath} label={label} />
  </div>
);
