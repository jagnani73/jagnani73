"use client";

import { Fragment, type ReactNode } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_HOLD,
  MONO as M,
  figH,
  figPanel,
  figType,
} from "./fig-style";

const S = "var(--font-sans)";

const FLUX_STEPS: {
  kind: "user" | "agent" | "tool";
  txt: string;
  facts?: string[];
}[] = [
  {
    kind: "user",
    txt: "I was charged twice for my mint. Can I get a refund?",
  },
  {
    kind: "agent",
    txt: "Of course. Send me the transaction hash and I'll verify the overpayment on-chain.",
  },
  { kind: "user", txt: "0x9f3c…a21" },
  { kind: "tool", txt: "read tx 0x9f3c… · status success" },
  { kind: "tool", txt: "paid 0.18 ETH · mint price 0.09 ETH" },
  {
    kind: "agent",
    txt: "Confirmed: you paid 0.18 ETH on a 0.09 ETH mint. A 0.09 ETH refund has been queued to your wallet.",
    facts: ["0.18 ETH", "0.09 ETH", "0.09 ETH refund"],
  },
];

// Flux — refund request verified against the transaction.
export const FigFlux = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(
    FIG_BEAT.slow,
    FLUX_STEPS.length + FIG_HOLD,
    active,
    FLUX_STEPS.length,
  );
  const shown = Math.min(n, FLUX_STEPS.length);
  // The fixed-height panel keeps the latest turns, the way a chat scrolls.
  const first = Math.max(0, shown - (mob ? 4 : 5));
  const chat = figType("title", mob);

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
      <FigCaption
        left="fig. 1: a refund request, verified against the transaction"
        right="flux · on-chain aware"
      />
      <div
        style={{
          ...figPanel(t),
          padding: mob ? 12 : "12px 16px",
          height: figH("lg", mob),
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 7,
          overflow: "hidden",
        }}
      >
        {FLUX_STEPS.slice(first, shown).map((s, j) => {
          const i = first + j;
          if (s.kind === "user")
            return (
              <div
                key={i}
                style={{
                  alignSelf: "flex-end",
                  flexShrink: 0,
                  maxWidth: "80%",
                  background: `${t.sig}1A`,
                  border: `1px solid ${t.sig}55`,
                  borderRadius: "11px 11px 3px 11px",
                  padding: "8px 13px",
                  fontFamily: S,
                  fontSize: chat,
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
                style={{
                  alignSelf: "flex-start",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: M,
                  fontSize: figType("body", mob),
                  color: t.tx3,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: t.acc,
                    flexShrink: 0,
                  }}
                />
                {s.txt}
                <span style={{ color: t.ok }}>✓</span>
              </div>
            );
          return (
            <div
              key={i}
              style={{
                alignSelf: "flex-start",
                flexShrink: 0,
                maxWidth: "88%",
                background: t.bg,
                border: `1px solid ${t.rule}`,
                borderRadius: "11px 11px 11px 3px",
                padding: "10px 14px",
                fontFamily: S,
                fontSize: chat,
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
