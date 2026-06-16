"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-segment error boundary. Renders inside the root layout, so the rail,
// theme tokens, and fonts are all present — it can lean on the editorial styles.
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.12em] text-tx3">
        ERROR — 500 / THE PRESS JAMMED
      </p>
      <h1 className="m-0 font-display text-[clamp(64px,18vw,180px)] leading-[0.9] text-tx">
        5 · 0 · 0
      </h1>
      <p className="font-serif text-[clamp(20px,3vw,32px)] italic text-tx2">
        something broke between the wire and the page
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[13px] text-tx2">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer transition-colors hover:text-sig"
        >
          ↻ try again
        </button>
        <Link href="/" className="transition-colors hover:text-sig">
          ← the front page
        </Link>
      </div>
    </main>
  );
};

export default Error;
