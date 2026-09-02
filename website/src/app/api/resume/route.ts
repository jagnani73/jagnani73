import { DOCUMENTS } from "@/utils/constants/site";
import { redirectRoute } from "@/utils/functions/redirect-route";

// Legacy path — kept, never deleted. See `redirect-route.ts`.
export const GET = redirectRoute(DOCUMENTS.resume.path);
