import type { ReactNode } from "react";

// The centered editorial status page shared by the 404 page and the route error
// boundary: mono kicker → outlined display code → serif line → an action row.
// (global-error.tsx stays standalone — it renders without the root layout.)
export const StatusScreen = ({
  kicker,
  code,
  line,
  children,
}: {
  kicker: string;
  code: string;
  line: string;
  /** The action row — links and/or buttons. */
  children: ReactNode;
}) => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
    <p className="font-mono text-[11px] tracking-[0.12em] text-tx3">{kicker}</p>
    <h1 className="m-0 font-display text-[clamp(64px,18vw,180px)] leading-[0.9] text-tx">
      {code}
    </h1>
    <p className="font-serif text-[clamp(20px,3vw,32px)] italic text-tx2">
      {line}
    </p>
    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[13px] text-tx2">
      {children}
    </div>
  </main>
);
