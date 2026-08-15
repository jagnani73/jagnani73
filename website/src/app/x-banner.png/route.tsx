// GET /x-banner.png — the X profile header, rendered on demand.
//
// Same shape as /linkedin-banner.png: dynamic so ?variant= and ?scale= work,
// with each combination rasterised once and then served from the CDN until the
// next deploy. Unlisted: not linked, not in the sitemap.
//
//   /x-banner.png                    → x-line at 3x (4500x1500)
//   /x-banner.png?variant=x-bare     → the same sky with the line pulled
//   /x-banner.png?scale=2

import type { NextRequest } from "next/server";
import {
  DEFAULT_X_VARIANT,
  MAX_SCALE,
  X_BANNER_VARIANTS,
  isXBannerVariant,
  parseScale,
  renderXBanner,
} from "@/utils/functions/banner";

export const runtime = "nodejs";

const bad = (message: string) =>
  new Response(message, {
    status: 400,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const variant = params.get("variant") ?? DEFAULT_X_VARIANT;
  if (!isXBannerVariant(variant)) {
    return bad(
      `unknown variant "${variant}" — expected one of ${Object.keys(X_BANNER_VARIANTS).join(", ")}`,
    );
  }

  const scale = parseScale(params.get("scale"));
  if (scale === null) {
    return bad(`scale must be a whole number from 1 to ${MAX_SCALE}`);
  }

  try {
    return await renderXBanner(variant, scale, {
      "cache-control":
        "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
      "content-disposition": `inline; filename="${variant}@${scale}x.png"`,
    });
  } catch (err) {
    console.error("[x-banner] render failed", err);
    return new Response("failed to render banner", { status: 500 });
  }
};
