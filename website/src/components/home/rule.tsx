export const Rule = ({ strong }: { strong?: boolean }) => (
  <div className={`h-px ${strong ? "bg-rule-strong" : "bg-rule"}`} />
);
