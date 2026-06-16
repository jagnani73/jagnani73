"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/"), 6000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.12em] text-tx3">
        ERROR — 404 / OFF THE RECORD
      </p>
      <h1 className="m-0 font-display text-[clamp(64px,18vw,180px)] leading-[0.9] text-tx">
        4 · 0 · 4
      </h1>
      <p className="font-serif text-[clamp(20px,3vw,32px)] italic text-tx2">
        this page was never entered into the record
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[13px] text-tx2">
        <Link href="/" className="transition-colors hover:text-sig">
          ← the front page
        </Link>
        <Link href="/record" className="transition-colors hover:text-sig">
          the record ↗
        </Link>
      </div>
      <p className="font-mono text-[11px] text-tx3">
        redirecting to the front page in a moment…
      </p>
    </main>
  );
};

export default NotFound;
