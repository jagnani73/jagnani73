// GET /linkedin-banner.png — the profile banner, rendered on demand.
//
// Dynamic so ?variant= and ?scale= work, but each combination renders once and
// is then served from the CDN until the next deploy, so the raster cost is paid
// at most once per combination. Unlisted: not linked, not in the sitemap.
//
//   /linkedin-banner.png                       → b-safe at 3x (4752x1188)
//   /linkedin-banner.png?variant=c-dark        → the dark palette
//   /linkedin-banner.png?variant=d-quiet&scale=2

import type { NextRequest } from "next/server";
import {
  BANNER_VARIANTS,
  DEFAULT_VARIANT,
  MAX_SCALE,
  isBannerVariant,
  parseScale,
  renderBanner,
} from "@/utils/functions/banner";

export const runtime = "nodejs";

const bad = (message: string) =>
  new Response(message, {
    status: 400,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const variant = params.get("variant") ?? DEFAULT_VARIANT;
  if (!isBannerVariant(variant)) {
    return bad(
      `unknown variant "${variant}" — expected one of ${Object.keys(BANNER_VARIANTS).join(", ")}`,
    );
  }

  // Scale drives the raster size and is caller-controlled, so it is restricted
  // to whole numbers within range: 4x is already 6336x1584. Bounding it also
  // keeps the set of cache keys small.
  const scale = parseScale(params.get("scale"));
  if (scale === null) {
    return bad(`scale must be a whole number from 1 to ${MAX_SCALE}`);
  }

  try {
    return await renderBanner(variant, scale, {
      // Immutable per deploy: Vercel purges the edge cache on each deployment,
      // so a design change ships without a manual bust.
      "cache-control":
        "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
      "content-disposition": `inline; filename="${variant}@${scale}x.png"`,
    });
  } catch (err) {
    // Almost always the jsdelivr font fetch. Surface it in function logs rather
    // than letting a garbage buffer fail opaquely inside ImageResponse.
    console.error("[linkedin-banner] render failed", err);
    return new Response("failed to render banner", { status: 500 });
  }
};
