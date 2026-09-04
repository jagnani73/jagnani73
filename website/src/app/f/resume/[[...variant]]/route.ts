import { DOCUMENTS } from "@/utils/constants/site";
import { documentRoute } from "@/utils/functions/document-route";

// GET /f/resume — the current résumé's bytes, streamed from Cloudinary.
// GET /f/resume/<variant> — a profile variant of it (`cv-cl/resume-<variant>.pdf`),
// or a 302 back to /f/resume when the sibling repo has not published that one.
//
// This is the endpoint, not the page. `/resume` is the viewer people are given
// and the URL worth sharing; it frames this one and links to it to download.
//
// The optional catch-all is why there is no `route.ts` beside this file: a
// static route file and its `[[...]]` sibling cannot coexist. All three
// document categories are shaped this way — `/f/cv` included — so none of them
// is a special case. **Variants are never listed here** — the segment is
// validated by shape and the upstream decides what exists; see
// `document-route.ts` for the three rules that make a request-derived slug safe.
//
// No `dynamic`/`revalidate` export on purpose. Next's cacheable-route template
// buffers the body through `.blob()`, which would defeat the streaming; the
// Next 15+ default (GET handlers dynamic) is exactly what this wants.
export const runtime = "nodejs";

export const GET = documentRoute(DOCUMENTS.resume);
