import { DOCUMENTS } from "@/utils/constants/site";
import { documentRoute } from "@/utils/functions/document-route";

// GET /cv — the current academic CV.
// GET /cv/<variant> — a variant of it (`cv-cl/cv-<variant>.pdf`), or a 302 back
// to /cv when the sibling repo has not published that one.
//
// Identical in every respect to the résumé and cover-letter routes: all three
// categories are optional catch-alls, there is no special case anywhere. See
// `app/resume/[[...variant]]/route.ts`.
export const runtime = "nodejs";

export const GET = documentRoute(DOCUMENTS.cv);
