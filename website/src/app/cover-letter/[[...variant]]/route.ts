import { DOCUMENTS } from "@/utils/constants/site";
import { documentRoute } from "@/utils/functions/document-route";

// GET /cover-letter — the general cover letter.
// GET /cover-letter/<company> — the letter written for that company
// (`cv-cl/cover-letter-<company>.pdf`), or a 302 back to /cover-letter when
// there is no such letter. See `app/resume/[[...variant]]/route.ts` for why
// there is no static route file beside this one and no `dynamic` export.
//
// The company slugs are the reason there is no allowlist anywhere in this
// public repo: the list would outlive every application in it.
export const runtime = "nodejs";

export const GET = documentRoute(DOCUMENTS.coverLetter);
