// Permanent-redirect factory for the legacy `/api/*` document routes.
//
// `/api/resume` and `/api/cover-letter` predate `/resume` and `/cover-letter`
// and are still reached by DNS forwards and by links shared long ago, several
// of them cached as permanent redirects by whatever followed them first. So
// they stay and forward instead of 404ing. The destination is read from
// `DOCUMENTS`, so there is still exactly one place that decides where a
// document lives.
//
// 308 rather than 302: the move is permanent and a crawler should treat the new
// path as canonical. A relative `Location` is valid (RFC 9110 §10.2.2) and
// avoids `NextResponse.redirect`'s need to guess the public origin from behind
// Vercel's proxy.
export const redirectRoute = (path: string) => () =>
  new Response(null, {
    status: 308,
    headers: {
      Location: path,
      // A 308 with no freshness is cached by browsers indefinitely, which is
      // how these links became hard to move in the first place. Bound it: the
      // CDN may hold it a day, a browser must revalidate.
      "Cache-Control": "public, max-age=0, must-revalidate, s-maxage=86400",
    },
  });
