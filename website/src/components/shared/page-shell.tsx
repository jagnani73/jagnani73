import { SiteRail } from "./site-rail";
import { MastheadBar } from "./masthead-bar";
import { PageFooter } from "./page-footer";
import type { PageShellProps } from "@/utils/types/component.types";

// Wraps a page with the rail and offsets content by the 64px rail on desktop.
// The shared masthead bar and footer are rendered here, so every page gets them
// automatically. The shell is a min-h-screen flex column with the `<main>` set to
// flex-1, so a short page (e.g. /arcade) still pins the footer to the viewport
// bottom instead of floating it mid-screen.
export const PageShell = ({ page, home, children }: PageShellProps) => {
  return (
    <>
      <SiteRail page={page} home={home} />
      <div className="flex min-h-screen flex-col rail:ml-16">
        <MastheadBar />
        <main className="flex-1">{children}</main>
        <PageFooter />
      </div>
    </>
  );
};
