"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";

// Claude Controller — phone drives the laptop's Claude Code CLI over an encrypted Tailscale tunnel; a packet ping-pongs the link.
const X1 = 28;
const X2 = 66;

export const FigTunnel = ({
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
      setP((time * 0.0004) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  const tri = reduced ? 0.5 : p < 0.5 ? p * 2 : 2 - p * 2; // 0..1..0 ping-pong
  const dotX = X1 + (X2 - X1) * tri;

  const H = mob ? 160 : 178;
  const title = mob ? 11 : 13;
  const sub = mob ? 9 : 10.5;
  const laptopRows = [
    { label: "Caddy · TLS", c: t.tx3 },
    { label: "backend · 127.0.0.1", c: t.tx3 },
    { label: "Claude Code CLI", c: t.sig },
  ];

  return (
    <div>
      <FigCaption
        left="fig. 1 — your phone drives the real Claude Code CLI over an encrypted tunnel"
        right="WSS · Tailscale · WireGuard"
      />
      <div
        className="relative overflow-hidden rounded-md"
        style={{ height: H, border: `1px solid ${t.rule}`, background: t.panel }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <line
            x1={`${X1}%`}
            y1="50%"
            x2={`${X2}%`}
            y2="50%"
            stroke={t.ruleStrong}
            strokeWidth={1.5}
            strokeDasharray="2 5"
          />
          <circle cx={`${dotX}%`} cy="50%" r={6} fill={`${t.sig}33`} />
          <circle cx={`${dotX}%`} cy="50%" r={3} fill={t.sig} />
        </svg>

        <div
          className="absolute flex flex-col items-center rounded-md border font-mono"
          style={{
            left: "15%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: t.sig,
            background: t.bg,
            padding: mob ? "8px 12px" : "12px 18px",
          }}
        >
          <span style={{ fontSize: title, color: t.sig, letterSpacing: "0.06em" }}>
            PHONE
          </span>
          <span style={{ fontSize: sub, color: t.tx3 }}>PWA</span>
        </div>

        <div
          className="absolute rounded-md border font-mono"
          style={{
            left: "81%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: t.ruleStrong,
            background: t.bg,
            padding: mob ? "7px 10px" : "10px 14px",
          }}
        >
          <span
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: title,
              color: t.tx,
              letterSpacing: "0.06em",
            }}
          >
            LAPTOP
          </span>
          {laptopRows.map((r) => (
            <span
              key={r.label}
              style={{ display: "block", fontSize: sub, color: r.c, lineHeight: 1.55 }}
            >
              {r.label}
            </span>
          ))}
        </div>

        <span
          className="absolute font-mono"
          style={{
            left: `${(X1 + X2) / 2}%`,
            top: "29%",
            transform: "translateX(-50%)",
            fontSize: sub,
            color: t.acc,
            whiteSpace: "nowrap",
          }}
        >
          encrypted tunnel
        </span>
        <span
          className="absolute font-mono"
          style={{
            left: `${(X1 + X2) / 2}%`,
            top: "63%",
            transform: "translateX(-50%)",
            fontSize: sub,
            color: t.tx3,
            whiteSpace: "nowrap",
          }}
        >
          Tailscale · WireGuard
        </span>
      </div>
    </div>
  );
};
