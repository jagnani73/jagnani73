"use client";

import { Fragment, type ReactNode } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { MONO as M } from "./fig-style";

const S = "var(--font-sans)";

const FLUX_STEPS: { kind: "user" | "agent" | "tool"; txt: string; facts?: string[] }[] = [
  { kind: "user", txt: "I was charged twice for my mint — can I get a refund?" },
  { kind: "agent", txt: "Of course. Send me the transaction hash and I'll verify the overpayment on-chain." },
  { kind: "user", txt: "0x9f3c…a21" },
  { kind: "tool", txt: "read tx 0x9f3c… · status success" },
  { kind: "tool", txt: "paid 0.18 ETH · mint price 0.09 ETH" },
  {
    kind: "agent",
    txt: "Confirmed — you paid 0.18 ETH on a 0.09 ETH mint. A 0.09 ETH refund has been queued to your wallet.",
    facts: ["0.18 ETH", "0.09 ETH", "0.09 ETH refund"],
  },
];

// Flux — refund request verified against the transaction.
export const FigFlux = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const n = useTick(1000, FLUX_STEPS.length + 3, active, FLUX_STEPS.length + 2);
  const shown = Math.min(n, FLUX_STEPS.length);

  const highlight = (txt: string, facts?: string[]): ReactNode => {
    let parts: ReactNode[] = [txt];
    (facts || []).forEach((f) => {
      const next: ReactNode[] = [];
      parts.forEach((p) => {
        if (typeof p !== "string") {
          next.push(p);
          return;
        }
        const idx = p.indexOf(f);
        if (idx < 0) {
          next.push(p);
          return;
        }
        next.push(p.slice(0, idx));
        next.push(
          <span key={f + idx} style={{ color: t.sig }}>
            {f}
          </span>,
        );
        next.push(p.slice(idx + f.length));
      });
      parts = next;
    });
    return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
  };

  return (
    <div>
      <FigCaption left="fig. 1 — a refund request, verified against the transaction" right="flux · on-chain aware" />
      <div
        style={{
          border: `1px solid ${t.rule}`,
          borderRadius: 6,
          background: t.panel,
          boxSizing: "border-box",
          padding: mob ? 12 : "16px 18px",
          height: mob ? 298 : 248,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 9,
          overflow: "hidden",
        }}
      >
        {FLUX_STEPS.slice(0, shown).map((s, i) => {
          if (s.kind === "user")
            return (
              <div
                key={i}
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "80%",
                  background: `${t.sig}1A`,
                  border: `1px solid ${t.sig}55`,
                  borderRadius: "11px 11px 3px 11px",
                  padding: "8px 13px",
                  fontFamily: S,
                  fontSize: mob ? 12.5 : 13.5,
                  color: t.tx,
                }}
              >
                {s.txt}
              </div>
            );
          if (s.kind === "tool")
            return (
              <div
                key={i}
                style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, fontFamily: M, fontSize: mob ? 10 : 11.5, color: t.tx3 }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.acc, flexShrink: 0 }} />
                {s.txt}
                <span style={{ color: t.ok }}>✓</span>
              </div>
            );
          return (
            <div
              key={i}
              style={{
                alignSelf: "flex-start",
                maxWidth: "88%",
                background: t.bg,
                border: `1px solid ${t.rule}`,
                borderRadius: "11px 11px 11px 3px",
                padding: "10px 14px",
                fontFamily: S,
                fontSize: mob ? 12.5 : 13.5,
                color: t.tx2,
                lineHeight: 1.55,
              }}
            >
              {highlight(s.txt, s.facts)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
