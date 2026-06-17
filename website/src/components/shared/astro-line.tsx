"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ASTRO_FACTS } from "@/utils/constants/site";

// The footer fact. The base index is derived deterministically from the path,
// so it's stable across SSR/CSR (no hydration mismatch) yet differs from page to
// page; hovering the line advances to the next fact. The wrapping span carries
// no type of its own, so it inherits the surrounding footer styling.
const pathIndex = (path: string): number => {
  let h = 0;
  for (let i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
  return h % ASTRO_FACTS.length;
};

export const AstroLine = () => {
  const base = pathIndex(usePathname());
  const [step, setStep] = useState(0);
  const idx = (base + step) % ASTRO_FACTS.length;

  return (
    <span
      onMouseEnter={() => setStep((s) => s + 1)}
      className="cursor-default transition-colors hover:text-tx2"
    >
      {ASTRO_FACTS[idx]}
    </span>
  );
};
