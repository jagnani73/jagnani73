import { NextResponse, type NextRequest } from "next/server";
import { isPrivacyGatedCountry } from "@/utils/constants/privacy";

// Writes a coarse `arc_geo` cookie (gated | ok) from Vercel's edge geo header so
// the client can decide whether to create the persistent visitor id BEFORE
// touching localStorage (see utils/functions/visitor.ts). Country only — never
// the IP. Set once (only when absent), so only a visitor's first load carries a
// Set-Cookie; repeat loads stay cacheable. Scoped to the two routes that host
// the arcade. (Next 16 "proxy" — the renamed middleware convention.)
// NOTE: matcher paths are exact — a new arcade play surface (e.g. an
// `/arcade/<sub>` route) must be added below or its visitors won't get the gate.
export function proxy(req: NextRequest): NextResponse {
  const res = NextResponse.next();
  if (!req.cookies.has("arc_geo")) {
    const country = req.headers.get("x-vercel-ip-country");
    res.cookies.set(
      "arc_geo",
      isPrivacyGatedCountry(country) ? "gated" : "ok",
      {
        maxAge: 60 * 60 * 24, // 1 day — re-evaluated if the visitor returns later
        sameSite: "lax",
        path: "/",
        // intentionally NOT httpOnly: client JS must read it to gate the id
      },
    );
  }
  return res;
}

export const config = {
  matcher: ["/", "/arcade"],
};
