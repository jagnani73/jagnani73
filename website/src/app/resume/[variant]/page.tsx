import { DOCUMENTS } from "@/utils/constants/site";
import { documentMetadata, documentPage } from "@/utils/functions/document-page";

// /resume/<variant> — the viewer for one variant of the résumé. Variants are
// never listed here: the segment is validated by shape and the sibling `cv-cl`
// repo decides which exist. A variant it has not published redirects to /resume.
export const generateMetadata = documentMetadata(DOCUMENTS.resume);

export default documentPage(DOCUMENTS.resume);
