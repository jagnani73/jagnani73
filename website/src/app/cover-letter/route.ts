import { DOCUMENTS } from "@/utils/constants/site";
import { documentRoute } from "@/utils/functions/document-route";

// GET /cover-letter — streams the general cover letter. See
// `app/resume/route.ts` for why there is no `dynamic` export and no slug.
export const runtime = "nodejs";

export const GET = documentRoute(DOCUMENTS.coverLetter);
