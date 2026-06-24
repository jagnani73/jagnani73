"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";

// InsidePoly — 0–100 insider-likelihood meter.
export const FigScore = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const reduced = useReducedMotion();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    let raf = 0;
    const loop = (time: number) => {
      setScore(50 + 50 * Math.sin(time * 0.00035));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  const shown = reduced ? 84 : score;
  const tiers = [
    { name: "FLAGGED INSIDER", range: "80–100", w: 20, c: t.flag },
    { name: "SUSPICIOUS", range: "60–79", w: 20, c: t.acc },
    { name: "WATCHLIST", range: "30–59", w: 30, c: t.sig },
    { name: "NORMAL", range: "0–29", w: 30, c: t.tx3 },
  ];

  return (
    <div>
      <FigCaption
        left="fig. 1: the 0–100 insider-likelihood scale, scoring live"
        right={`wallet 0x4f2…a91 · score ${shown.toFixed(0)}`}
      />
      <div className="relative flex gap-[3px]" style={{ height: 34 }}>
        {tiers
          .slice()
          .reverse()
          .map((tier) => (
            <div
              key={tier.name}
              className="relative overflow-hidden"
              style={{
                width: tier.w + "%",
                background: `${t.tx}0A`,
                border: `1px solid ${tier.c}44`,
              }}
            >
              <span
                className="absolute top-1/2 left-2 -translate-y-1/2 font-mono text-[11.5px] tracking-[0.08em]"
                style={{ color: tier.c }}
              >
                {mob ? tier.range : `${tier.name} ${tier.range}`}
              </span>
            </div>
          ))}
        <div
          className="absolute"
          style={{
            left: shown + "%",
            top: -6,
            bottom: -6,
            width: 2,
            background: t.tx,
            boxShadow: `0 0 10px ${t.tx}cc`,
          }}
        />
      </div>
    </div>
  );
};
