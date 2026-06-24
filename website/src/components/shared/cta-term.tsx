import Link from "next/link";
import type { CtaTermProps } from "@/utils/types/component.types";

// Shared "terminal" CTA — a bracketed mono label with a sliding arrow (styles in
// globals.css → `.cta-term`). Renders a next/link for internal hrefs, an external
// `<a>` when `external`, or a plain `<span>` when no `href` is given (e.g. a badge
// inside an already-clickable row).
export const CtaTerm = ({
  href,
  children,
  external,
  arrow = "→",
  arrowSide = "right",
  className,
}: CtaTermProps) => {
  const cls = [
    "cta-term",
    arrowSide === "left" ? "cta-term--left" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Order inside the brackets: [ label → ] — arrow enclosed with the label.
  const inner = (
    <>
      <span className="bracket">[</span>
      {arrowSide === "left" ? <span className="arrow">{arrow}</span> : null}
      <span>{children}</span>
      {arrowSide === "right" ? <span className="arrow">{arrow}</span> : null}
      <span className="bracket">]</span>
    </>
  );

  if (!href) {
    return <span className={cls}>{inner}</span>;
  }
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
};
