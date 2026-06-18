"use client";

import { usePathname } from "next/navigation";
import { CtaTerm } from "./cta-term";

// The single entry point into the otherwise-unlisted /arcade board, hidden when
// you're already on /arcade. Sits in the footer's centre grid column
// (`col-start-2` so the back-to-top stays in column 3 even when this is null).
export const FooterArcadeCta = () => {
  const pathname = usePathname();

  if (pathname === "/arcade") {
    return null;
  }

  return (
    <CtaTerm
      href="/arcade"
      className="cta-term--sm rail:col-start-2 rail:justify-self-center"
    >
      the arcade
    </CtaTerm>
  );
};
