"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_DIM,
  FIG_EASE,
  FIG_HOLD,
  FIG_TRACK,
  MONO as M,
  figBox,
  figH,
  figPanel,
  figType,
} from "./fig-style";
import type { FigAccent as C } from "@/utils/types/fig.types";

const LEDGER_ENTRIES: { act: string; who: string; note: string; c: C }[] = [
  {
    act: "created",
    who: "0xA1…",
    note: "Dinner · ₹2,400 · split 3 ways",
    c: "sig",
  },
  { act: "edited", who: "0xB2…", note: "amount → ₹2,700", c: "acc" },
  { act: "settled", who: "0xC3…", note: "paid ₹900 share", c: "ok" },
  { act: "settled", who: "0xA1…", note: "paid ₹900 share", c: "ok" },
];

// Contracts — every edit appended to an immutable on-chain log.
export const FigLedger = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(
    FIG_BEAT.base,
    LEDGER_ENTRIES.length + FIG_HOLD,
    active,
    LEDGER_ENTRIES.length,
  );
  const shown = Math.min(n, LEDGER_ENTRIES.length);
  const sub = figType("sub", mob);

  return (
    <div>
      <FigCaption
        left="fig. 1: every edit appended to an immutable, on-chain audit log"
        right="Hedera · tamper-proof"
      />
      <div
        style={{
          ...figPanel(t),
          height: figH("lg", mob),
          overflow: "hidden",
          padding: mob ? 10 : "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {LEDGER_ENTRIES.map((e, i) => {
          const vis = i < shown;
          return (
            <div
              key={i}
              style={{
                ...figBox(t),
                display: "grid",
                gridTemplateColumns: mob
                  ? "auto 1fr auto"
                  : "78px 90px 1fr auto",
                alignItems: "center",
                gap: mob ? 10 : 14,
                padding: mob ? "7px 10px" : "8px 14px",
                flexShrink: 0,
                opacity: vis ? 1 : FIG_DIM,
                transform: vis ? "translateX(0)" : "translateX(-8px)",
                transition: FIG_EASE,
              }}
            >
              <span
                style={{
                  fontFamily: M,
                  fontSize: sub,
                  color: t[e.c],
                  border: `1px solid ${t[e.c]}`,
                  borderRadius: 99,
                  padding: "1px 9px",
                  textAlign: "center",
                }}
              >
                {e.act}
              </span>
              {!mob ? (
                <span style={{ fontFamily: M, fontSize: sub, color: t.tx2 }}>
                  {e.who}
                </span>
              ) : null}
              <span
                style={{
                  fontFamily: M,
                  fontSize: figType("body", mob),
                  color: t.tx,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {e.note}
              </span>
              <span
                style={{
                  fontFamily: M,
                  fontSize: figType("label", mob),
                  letterSpacing: FIG_TRACK,
                  color: t.tx3,
                }}
              >
                #{1041 + i}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ fontFamily: M, fontSize: sub, color: t.tx3, marginTop: 8 }}>
        ↳ each entry hash-chained to the last, no silent edits
      </div>
    </div>
  );
};
