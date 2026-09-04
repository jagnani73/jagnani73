import { DOCUMENTS } from "@/utils/constants/site";
import { documentMetadata, documentPage } from "@/utils/functions/document-page";

// /resume — the viewer for the current résumé. The PDF itself is at
// `/resume` under /f; this page frames it and links to it. See
// `utils/functions/document-page.tsx`.
export const generateMetadata = documentMetadata(DOCUMENTS.resume);

export default documentPage(DOCUMENTS.resume);
