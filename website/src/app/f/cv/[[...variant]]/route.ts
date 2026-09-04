import { DOCUMENTS } from "@/utils/constants/site";
import { documentRoute } from "@/utils/functions/document-route";

// GET /f/cv — the current academic CV's bytes.
// GET /f/cv/<variant> — a variant of it (`cv-cl/cv-<variant>.pdf`), or a 302
// back to /f/cv when the sibling repo has not published that one.
//
// Identical in every respect to the résumé and cover-letter endpoints: all three
// categories are optional catch-alls, there is no special case anywhere. See
// `app/f/resume/[[...variant]]/route.ts`.
export const runtime = "nodejs";

export const GET = documentRoute(DOCUMENTS.cv);
