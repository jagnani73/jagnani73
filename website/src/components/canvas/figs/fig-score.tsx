"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";
import {
  FIG_SPEED,
  FIG_TRACK,
  MONO as M,
  figBox,
  figH,
  figPanel,
  figType,
} from "./fig-style";

// The tier boundaries, labelled under the meter on desktop.
const TICKS = [0, 30, 60, 80, 100];

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
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    let raf = 0;
    const loop = (time: number) => {
      setP((time * FIG_SPEED.slow) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  // One sweep up and back per cycle; the static frame parks on a flagged wallet.
  const shown = reduced ? 84 : 50 - 50 * Math.cos(p * Math.PI * 2);
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
      <div
        style={{
          ...figPanel(t),
          height: figH("sm", mob),
          padding: mob ? "0 12px" : "0 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div
          className="relative flex gap-[3px]"
          style={{ height: mob ? 56 : 52 }}
        >
          {tiers
            .slice()
            .reverse()
            .map((tier) => (
              <div
                key={tier.name}
                className="relative overflow-hidden"
                style={{
                  ...figBox(t, `${tier.c}44`),
                  borderRadius: 3,
                  width: tier.w + "%",
                }}
              >
                <span
                  className="absolute top-1/2 left-2 -translate-y-1/2 whitespace-nowrap"
                  style={{
                    fontFamily: M,
                    fontSize: figType("label", mob),
                    letterSpacing: FIG_TRACK,
                    color: tier.c,
                  }}
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
        {!mob ? (
          <div className="relative" style={{ height: 16 }}>
            {TICKS.map((v) => (
              <span
                key={v}
                className="absolute"
                style={{
                  left: `${v}%`,
                  transform: `translateX(${v === 0 ? "0" : v === 100 ? "-100%" : "-50%"})`,
                  fontFamily: M,
                  fontSize: figType("sub", mob),
                  color: t.tx3,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
