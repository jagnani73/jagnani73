import { DOCUMENTS } from "@/utils/constants/site";
import { documentMetadata, documentPage } from "@/utils/functions/document-page";

// /cover-letter — the viewer for the current cover letter. The PDF itself is at
// `/cover-letter` under /f; this page frames it and links to it. See
// `utils/functions/document-page.tsx`.
export const generateMetadata = documentMetadata(DOCUMENTS.coverLetter);

export default documentPage(DOCUMENTS.coverLetter);
