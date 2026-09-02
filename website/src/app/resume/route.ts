import { DOCUMENTS } from "@/utils/constants/site";
import { documentRoute } from "@/utils/functions/document-route";

// GET /resume — streams the current résumé PDF from Cloudinary.
//
// Names one fixed `DOCUMENTS` entry: the three documents are a closed set and
// no part of this URL is user-controlled. See `document-route.ts`.
//
// No `dynamic`/`revalidate` export on purpose. Next's cacheable-route template
// buffers the body through `.blob()`, which would defeat the streaming; the
// Next 15+ default (GET handlers dynamic) is exactly what this wants.
export const runtime = "nodejs";

export const GET = documentRoute(DOCUMENTS.resume);
