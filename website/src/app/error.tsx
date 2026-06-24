"use client";

import { useEffect } from "react";
import Link from "next/link";
import { StatusScreen } from "@/components/shared/status-screen";

// Route-segment error boundary: renders inside the root layout, so rail, tokens
// and fonts are present — it can lean on the editorial styles.
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
    <StatusScreen
      kicker="ERROR: 500 / THE PRESS JAMMED"
      code="5 · 0 · 0"
      line="something broke between the wire and the page"
    >
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
    </StatusScreen>
  );
};

export default Error;
