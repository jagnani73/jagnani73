import { DOCUMENTS } from "@/utils/constants/site";
import { documentMetadata, documentPage } from "@/utils/functions/document-page";

// /cv — the viewer for the current academic CV. The PDF itself is at
// `/cv` under /f; this page frames it and links to it. See
// `utils/functions/document-page.tsx`.
export const generateMetadata = documentMetadata(DOCUMENTS.cv);

export default documentPage(DOCUMENTS.cv);
