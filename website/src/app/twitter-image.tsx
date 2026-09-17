// Route-config fields must be declared directly — Next can't analyze re-exports.
// Only the renderer is reused.
import { SITE_CARD_ALT } from "@/utils/constants/site";

export { default } from "./opengraph-image";

export const runtime = "nodejs";
export const alt = SITE_CARD_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
