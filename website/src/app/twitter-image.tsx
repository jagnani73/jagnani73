// Route-config fields (runtime/alt/size/contentType) must be declared directly —
// Next can't statically analyze them as re-exports. Only the renderer is reused.
export { default } from "./opengraph-image";

export const runtime = "nodejs";
export const alt = "Yashvardhan Jagnani — software, shipped at agent speed";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
