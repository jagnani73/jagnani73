"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rule } from "./rule";
import { CtaTerm } from "./cta-term";
import { STATUS } from "@/utils/constants/site";

// The shared top bar — rendered once by PageShell on every page. STATUS sits
// right on every page and the `jagnani73` brand sits left on desktop only (mobile
// shows it in the SiteRail bar); the centered CTA is chosen from the route
// (home → the record · the record → the front page · a case → the record).
// `relative z-[1] bg-bg` keeps it opaque over The Record's fixed constellation.
const ctaPos = "rail:-translate-x-8 rail:justify-self-center";

export const MastheadBar = () => {
  const pathname = usePathname();
  const cta =
    pathname === "/" ? (
      <CtaTerm href="/record" className={ctaPos}>
        the record
      </CtaTerm>
    ) : pathname === "/record" ? (
      <CtaTerm href="/" arrow="←" arrowSide="left" className={ctaPos}>
        the front page
      </CtaTerm>
    ) : (
      <CtaTerm href="/record" arrow="←" arrowSide="left" className={ctaPos}>
        the record
      </CtaTerm>
    );

  return (
    // relative z-[1] lifts the whole bar — including the trailing rule — above
    // The Record's fixed z-0 constellation; a bare rule would be painted over.
    <div className="relative z-[1]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 bg-bg px-4 py-3 font-mono text-[13.5px] text-tx3 rail:grid rail:grid-cols-[1fr_auto_1fr] rail:px-11 rail:pb-4 rail:pt-6">
        <Link
          href="/"
          className="hidden transition-colors hover:text-sig rail:inline rail:justify-self-start"
        >
          jagnani73
        </Link>
        {cta}
        <span className="rail:justify-self-end">
          STATUS: <span className="text-acc">{STATUS}</span>
        </span>
      </div>
      <Rule strong />
    </div>
  );
};
