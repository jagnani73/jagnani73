"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const pct = (n: number) => `${n}%`;

// Left panel (Ed25519): beam reaches the secret key fast — discrete log is easy for Shor.
const O = { x: 16, y: 80 };
const K = { x: 82, y: 24 };
const CURVE = [
  { x: 32, y: 62 },
  { x: 52, y: 48 },
  { x: 68, y: 36 },
];

// Right panel (ML-DSA-44): probe hops lattice points, never lands on the off-grid target — nearest-vector stays hard.
const GRID: { x: number; y: number }[] = [];
for (const y of [24, 44, 64, 84]) for (const x of [16, 39, 62, 85]) GRID.push({ x, y });
const O2 = { x: 16, y: 84 };
const TARGET = { x: 56, y: 40 };

export const FigLattice = ({
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
      setP((time * 0.00022) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  const phase = reduced ? 0.85 : p;
  const a = easeOut(Math.min(1, phase * 2.2)); // attack reaches the key fast
  const solved = a > 0.97;
  const beam = { x: O.x + (K.x - O.x) * a, y: O.y + (K.y - O.y) * a };
  const probe = GRID[Math.floor(phase * GRID.length) % GRID.length];
  const tpulse = 0.55 + 0.45 * Math.sin(phase * Math.PI * 6);

  const H = mob ? 152 : 170;
  const title = mob ? 10.5 : 12;
  const sub = mob ? 9 : 10.5;

  return (
    <div>
      <FigCaption
        left="fig. 1 — a quantum attack on each scheme's foundation"
        right="Ed25519: solved · ML-DSA-44: hard"
      />
      <div
        className="relative grid grid-cols-2 overflow-hidden rounded-md"
        style={{ height: H, border: `1px solid ${t.rule}`, background: t.panel }}
      >
        {/* ── Ed25519 — broken ── */}
        <div className="relative" style={{ borderRight: `1px solid ${t.rule}` }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            {[O, ...CURVE, K].slice(0, -1).map((d, i) => {
              const n = [O, ...CURVE, K][i + 1];
              return (
                <line
                  key={i}
                  x1={pct(d.x)}
                  y1={pct(d.y)}
                  x2={pct(n.x)}
                  y2={pct(n.y)}
                  stroke={t.ruleStrong}
                  strokeWidth={1}
                />
              );
            })}
            <line
              x1={pct(O.x)}
              y1={pct(O.y)}
              x2={pct(beam.x)}
              y2={pct(beam.y)}
              stroke={t.flag}
              strokeWidth={1.9}
            />
            <circle cx={pct(O.x)} cy={pct(O.y)} r={2.2} fill={t.tx3} />
            {solved ? (
              <circle cx={pct(K.x)} cy={pct(K.y)} r={7} fill={`${t.flag}33`} />
            ) : null}
            <circle
              cx={pct(K.x)}
              cy={pct(K.y)}
              r={solved ? 3.6 : 2.4}
              fill={solved ? t.flag : t.ruleStrong}
            />
          </svg>
          <span
            className="absolute left-2.5 top-2 font-mono tracking-[0.08em]"
            style={{ fontSize: title, color: t.flag }}
          >
            ED25519
          </span>
          <span
            className="absolute left-2.5 font-mono"
            style={{ top: mob ? 19 : 22, fontSize: sub, color: t.tx3 }}
          >
            discrete log
          </span>
          <span
            className="absolute bottom-2 left-2.5 font-mono tracking-[0.06em]"
            style={{ fontSize: sub, color: solved ? t.flag : t.tx3 }}
          >
            {solved ? "key recovered" : "recovering…"}
          </span>
        </div>

        {/* ── ML-DSA-44 — holds ── */}
        <div className="relative">
          <svg width="100%" height="100%" className="absolute inset-0">
            {GRID.map((d, i) => {
              const hit = d === probe;
              return (
                <circle
                  key={i}
                  cx={pct(d.x)}
                  cy={pct(d.y)}
                  r={hit ? 2.6 : 1.7}
                  fill={hit ? t.ok : t.ruleStrong}
                  opacity={hit ? 1 : 0.5}
                />
              );
            })}
            {/* probe vector — never lands on the target */}
            <line
              x1={pct(O2.x)}
              y1={pct(O2.y)}
              x2={pct(probe.x)}
              y2={pct(probe.y)}
              stroke={t.ok}
              strokeWidth={1.4}
              opacity={0.75}
            />
            <circle cx={pct(O2.x)} cy={pct(O2.y)} r={2.2} fill={t.tx3} />
            <circle
              cx={pct(TARGET.x)}
              cy={pct(TARGET.y)}
              r={6}
              fill="none"
              stroke={t.ok}
              strokeWidth={1.3}
              opacity={0.35 + 0.5 * tpulse}
            />
            <circle cx={pct(TARGET.x)} cy={pct(TARGET.y)} r={1.7} fill={t.ok} />
          </svg>
          <span
            className="absolute left-2.5 top-2 font-mono tracking-[0.08em]"
            style={{ fontSize: title, color: t.ok }}
          >
            ML-DSA-44
          </span>
          <span
            className="absolute left-2.5 font-mono"
            style={{ top: mob ? 19 : 22, fontSize: sub, color: t.tx3 }}
          >
            module lattice
          </span>
          <span
            className="absolute bottom-2 left-2.5 font-mono tracking-[0.06em]"
            style={{ fontSize: sub, color: t.ok }}
          >
            shortest vector: hard
          </span>
        </div>
      </div>
    </div>
  );
};
