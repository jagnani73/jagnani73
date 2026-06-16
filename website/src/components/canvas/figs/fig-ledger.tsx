"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { MONO as M } from "./fig-style";
import type { FigAccent as C } from "@/utils/types/fig.types";

const LEDGER_ENTRIES: { act: string; who: string; note: string; c: C }[] = [
  { act: "created", who: "0xA1…", note: "Dinner · ₹2,400 · split 3 ways", c: "sig" },
  { act: "edited", who: "0xB2…", note: "amount → ₹2,700", c: "acc" },
  { act: "settled", who: "0xC3…", note: "paid ₹900 share", c: "ok" },
  { act: "settled", who: "0xA1…", note: "paid ₹900 share", c: "ok" },
];

// Contracts — every edit appended to an immutable on-chain log.
export const FigLedger = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const n = useTick(820, LEDGER_ENTRIES.length + 4, active, LEDGER_ENTRIES.length + 3);
  const shown = Math.min(n, LEDGER_ENTRIES.length);
  const panel = { border: `1px solid ${t.rule}`, borderRadius: 6, background: t.bg };

  return (
    <div>
      <FigCaption left="fig. 1 — every edit appended to an immutable, on-chain audit log" right="Hedera · tamper-proof" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {LEDGER_ENTRIES.map((e, i) => {
          const vis = i < shown;
          return (
            <div
              key={i}
              style={{
                ...panel,
                display: "grid",
                gridTemplateColumns: mob ? "auto 1fr auto" : "78px 90px 1fr auto",
                alignItems: "center",
                gap: mob ? 10 : 14,
                padding: mob ? "9px 11px" : "11px 14px",
                opacity: vis ? 1 : 0.18,
                transform: vis ? "translateX(0)" : "translateX(-8px)",
                transition: "all 0.4s",
              }}
            >
              <span style={{ fontFamily: M, fontSize: mob ? 10 : 11.5, color: t[e.c], border: `1px solid ${t[e.c]}`, borderRadius: 99, padding: "2px 9px", textAlign: "center" }}>
                {e.act}
              </span>
              {!mob ? <span style={{ fontFamily: M, fontSize: 11.5, color: t.tx2 }}>{e.who}</span> : null}
              <span style={{ fontFamily: M, fontSize: mob ? 11 : 12.5, color: t.tx, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {e.note}
              </span>
              <span style={{ fontFamily: M, fontSize: 10, color: t.tx3 }}>#{1041 + i}</span>
            </div>
          );
        })}
        <div style={{ fontFamily: M, fontSize: 10.5, color: t.tx3, marginTop: 2 }}>
          ↳ each entry hash-chained to the last — no silent edits
        </div>
      </div>
    </div>
  );
};
