import { NextResponse } from "next/server";

// Liveness probe, for uptime monitors and post-deploy smoke checks. Answers
// "is this deployment up and serving?" — and deliberately nothing else.
//
// **It probes no dependency.** Neon is optional here (`utils/functions/db.ts`
// exports `db` as null when unconfigured, and every caller already handles
// that), so a slow or down database would flip this red while the site itself
// renders perfectly — which trains whoever watches it to ignore the alert. A DB
// outage surfaces where it actually matters, on `/arcade/stats`. Spotify is the
// same story: `/api/spotify` degrades to an idle panel by design.
//
// Already covered by the standing `Disallow: /api/` in `app/robots.ts`, so it
// needs no rule of its own to stay out of the index.
//
// HEAD comes free: Next aliases it to GET when no HEAD is exported and strips
// the body at send time, so a monitor configured for HEAD works unchanged.
//
// Nothing is logged. A monitor hits this every minute; a line per hit buys
// nothing and buries the logs that matter.

/** `process.uptime()` below is a Node API. */
export const runtime = "nodejs";

export const GET = () =>
  NextResponse.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
      // Age of *this* serverless instance, not of the deployment — a near-zero
      // value means the request paid a cold start, not that something restarted.
      uptime: Math.round(process.uptime()),
      // Which deploy answered. `VERCEL_ENV` is unset locally, the commit SHA is
      // unset off Vercel; the repo is public, so neither is a disclosure.
      env: process.env.VERCEL_ENV ?? "development",
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    // Route Handlers are uncached by default in Next 15+, so this needs no
    // `dynamic` export — but the CDN and any proxy in front still need telling.
    { headers: { "Cache-Control": "no-store" } },
  );
