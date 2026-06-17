import { SiteRail } from "./site-rail";
import { MastheadBar } from "./masthead-bar";
import { PageFooter } from "./page-footer";
import type { PageShellProps } from "@/utils/types/component.types";

// Wraps a page with the rail and offsets content by the 64px rail on desktop.
// The shared masthead bar and footer are rendered here, so every page gets them
// automatically.
export const PageShell = ({ page, home, children }: PageShellProps) => {
  return (
    <>
      <SiteRail page={page} home={home} />
      <div className="min-h-screen rail:ml-16">
        <MastheadBar />
        {children}
        <PageFooter />
      </div>
    </>
  );
};
