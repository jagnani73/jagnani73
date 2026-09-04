import type { DocumentViewerProps } from "@/utils/types/component.types";

// The framed document. Everything else the reader needs lives in the bar above
// (`document-shell.tsx`); this is only the frame.
//
// It exists because handing someone a bare PDF fails them twice. A PDF response
// has no `<head>`, so a link pasted into LinkedIn or Slack unfurls as a bare
// blue URL with no name and no thumbnail. And several mobile in-app browsers —
// LinkedIn's and Gmail's among them — refuse to render a top-level PDF and
// raise a download prompt instead, which is a poor thing to show a recruiter
// opening a stranger's link on a work laptop. Neither is fixable with headers:
// the endpoint sets `Content-Disposition: inline` and that is correct, those
// clients simply ignore it.
//
// When a browser is one of the ones that will not render the frame, it draws
// nothing here and the download in the bar is already on screen — which is why
// that button sits above the frame rather than below it.

// `#toolbar=0` hides the built-in PDF toolbar in Chrome and Edge, which
// otherwise stacks a second bar under ours carrying its own download and print
// buttons. It is a viewer hint, not part of the request: the fragment never
// reaches the server, and engines that don't honour it (Firefox's pdf.js) just
// keep their toolbar. Anyone who wants the full native viewer has "OPEN" in the
// bar, which loads the same URL as a top-level document with its chrome intact.
export const DocumentViewer = ({ label, filePath }: DocumentViewerProps) => (
  <iframe
    src={`${filePath}#toolbar=0`}
    title={label}
    className="w-full flex-1 border-0 bg-panel"
  />
);
