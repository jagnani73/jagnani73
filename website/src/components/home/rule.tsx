// Full-bleed 1px hairline rule — the editorial separator used across the site.
export const Rule = ({ strong }: { strong?: boolean }) => (
  <div className={`h-px ${strong ? "bg-rule-strong" : "bg-rule"}`} />
);
