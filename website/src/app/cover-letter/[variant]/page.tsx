import { DOCUMENTS } from "@/utils/constants/site";
import { documentMetadata, documentPage } from "@/utils/functions/document-page";

// /cover-letter/<variant> — the viewer for one variant of the cover letter. Variants are
// never listed here: the segment is validated by shape and the sibling `cv-cl`
// repo decides which exist. A variant it has not published redirects to /cover-letter.
export const generateMetadata = documentMetadata(DOCUMENTS.coverLetter);

export default documentPage(DOCUMENTS.coverLetter);
