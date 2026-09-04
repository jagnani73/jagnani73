import { DOCUMENTS } from "@/utils/constants/site";
import { documentMetadata, documentPage } from "@/utils/functions/document-page";

// /cv/<variant> — the viewer for one variant of the academic CV. Variants are
// never listed here: the segment is validated by shape and the sibling `cv-cl`
// repo decides which exist. A variant it has not published redirects to /cv.
export const generateMetadata = documentMetadata(DOCUMENTS.cv);

export default documentPage(DOCUMENTS.cv);
