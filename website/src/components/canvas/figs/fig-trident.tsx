"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";

const W = 400;
const H = 116;
const FIG_H = 160;
const N = 120;
const Z_MAX = 2.8;
const STEP = 0.2;

// Deterministic mean-reverting walk: three incommensurate sines, so the series
// never visibly repeats and breaches +/-2 sigma every few cycles without an RNG
// (which would hydrate differently than it rendered on the server).
const zAt = (x: number) =>
  1.42 * Math.sin(x * 0.7) +
  0.86 * Math.sin(x * 1.7 + 1.1) +
  0.58 * Math.sin(x * 0.31 + 2.3);

const yOf = (z: number) =>
  H / 2 - (Math.max(-Z_MAX, Math.min(Z_MAX, z)) / Z_MAX) * (H / 2 - 7);

// Trident: the SOL/ETH price ratio, z-scored against its rolling window. The
// pairs trade opens at 2 sigma and closes back inside 0.5 sigma. The viewBox is
// stretched to a fixed-height box, so every stroke carries non-scaling-stroke.
export const FigTrident = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    let raf = 0;
    const loop = (time: number) => {
      setPhase(time * 0.00042);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  // Parks the head on a breach (z = +2.15), so the reduced-motion still frame
  // shows the entry it describes rather than a quiet stretch.
  const head = reduced ? 18.725 : phase;
  const pts = Array.from({ length: N }, (_, i) => {
    const z = zAt(head + (i - (N - 1)) * STEP);
    return { x: (i / (N - 1)) * W, y: yOf(z), z };
  });

  const z = pts[N - 1].z;
  const armed = Math.abs(z) >= 2;
  const line = armed ? t.acc : t.sig;
  const d = pts
    .map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <div>
      <FigCaption
        left={
          mob
            ? "fig. 1: SOL/ETH, z-scored"
            : "fig. 1: the SOL/ETH ratio, z-scored against a 2880-point window"
        }
        right={`z ${z >= 0 ? "+" : ""}${z.toFixed(2)} · ${armed ? "ENTRY" : "HOLD"}`}
      />

      <div
        className="relative overflow-hidden rounded-md"
        style={{
          height: FIG_H,
          border: `1px solid ${t.rule}`,
          background: t.panel,
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          className="absolute inset-0"
          role="presentation"
        >
          {/* back inside 0.5 sigma and an open spread is closed */}
          <rect
            x={0}
            y={yOf(0.5)}
            width={W}
            height={yOf(-0.5) - yOf(0.5)}
            fill={t.tx}
            opacity={0.05}
          />
          <line
            x1={0}
            y1={H / 2}
            x2={W}
            y2={H / 2}
            stroke={t.rule}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          {/* the 2 sigma entry thresholds */}
          {[2, -2].map((s) => (
            <line
              key={s}
              x1={0}
              y1={yOf(s)}
              x2={W}
              y2={yOf(s)}
              stroke={t.acc}
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.6}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path
            d={d}
            fill="none"
            stroke={line}
            strokeWidth={1.6}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* the head, as a tick rather than a dot: a circle would distort */}
          <line
            x1={W - 6}
            y1={yOf(z)}
            x2={W}
            y2={yOf(z)}
            stroke={line}
            strokeWidth={armed ? 3.5 : 2.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div
        className="mt-2 flex justify-between font-mono text-[11.5px]"
        style={{ color: t.tx3 }}
      >
        <span>{mob ? "±2σ enter" : "±2σ · open the pairs trade"}</span>
        <span>{mob ? "±0.5σ exit" : "±0.5σ · close it back out"}</span>
      </div>
    </div>
  );
};
