import { SiteRail } from "./site-rail";

interface PageShellProps {
  /** Page tag shown in the rail, e.g. "P.01", "R.01", "P.03". */
  page: string;
  /** True only on the home page (logo stops linking to itself). */
  home?: boolean;
  children: React.ReactNode;
}

// Wraps a page with the left rail (desktop) / top bar (mobile) and offsets the
// content by the 64px rail width on desktop. Pages render their own footer.
export const PageShell = ({ page, home, children }: PageShellProps) => {
  return (
    <>
      <SiteRail page={page} home={home} />
      <div className="min-h-screen rail:ml-16">{children}</div>
    </>
  );
};
