"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";

export const FigCaption = ({ left, right }: { left: string; right: string }) => {
  const t = useThemeTokens();
  return (
    <div
      className="mb-2.5 flex flex-wrap justify-between gap-1 font-mono text-[12.5px]"
      style={{ color: t.tx3 }}
    >
      <span>{left}</span>
      <span style={{ color: t.sig }}>{right}</span>
    </div>
  );
};
