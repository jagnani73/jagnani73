import { SiteRail } from "./site-rail";
import type { PageShellProps } from "@/utils/types/component.types";

// Wraps a page with the rail and offsets content by the 64px rail on desktop.
export const PageShell = ({ page, home, children }: PageShellProps) => {
  return (
    <>
      <SiteRail page={page} home={home} />
      <div className="min-h-screen rail:ml-16">{children}</div>
    </>
  );
};
