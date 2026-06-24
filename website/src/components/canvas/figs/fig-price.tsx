"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { MONO as M } from "./fig-style";

const PRICE_ROWS = [
  {
    item: "ICU bed · per day",
    proposed: "₹18,000",
    bench: "₹9,000",
    flag: true,
  },
  { item: "Oxygen cylinder", proposed: "₹6,500", bench: "₹6,200", flag: false },
  { item: "RT-PCR test", proposed: "₹500", bench: "₹500", flag: false },
  { item: "Remdesivir vial", proposed: "₹5,400", bench: "₹3,100", flag: true },
];

// Hospitatva — proposed rates checked against the benchmark.
export const FigPrice = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(760, PRICE_ROWS.length + 4, active, PRICE_ROWS.length + 3);
  const shown = Math.min(n, PRICE_ROWS.length);
  const cols = mob ? "1fr 84px 84px" : "1fr 120px 120px 90px";

  return (
    <div>
      <FigCaption
        left="fig. 1: proposed rates checked against the government benchmark, anomalies flagged"
        right="Zilliqa · ML price model"
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            gap: mob ? 10 : 14,
            padding: mob ? "0 11px" : "0 14px",
            border: "1px solid transparent",
            fontFamily: M,
            fontSize: 10,
            color: t.tx3,
            letterSpacing: "0.08em",
          }}
        >
          <span>COMMODITY</span>
          <span style={{ textAlign: "right" }}>
            {mob ? "PROP." : "PROPOSED"}
          </span>
          <span style={{ textAlign: "right" }}>BENCHMARK</span>
          {!mob ? <span /> : null}
        </div>
        {PRICE_ROWS.map((r, i) => {
          const vis = i < shown;
          const flagged = vis && r.flag;
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: cols,
                alignItems: "center",
                gap: mob ? 10 : 14,
                padding: mob ? "9px 11px" : "11px 14px",
                border: `1px solid ${flagged ? t.flag : t.rule}`,
                borderRadius: 6,
                background: t.bg,
                opacity: vis ? 1 : 0.18,
                transition: "all 0.4s",
              }}
            >
              <span
                style={{
                  fontFamily: M,
                  fontSize: mob ? 11 : 12.5,
                  color: t.tx,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.item}
              </span>
              <span
                style={{
                  fontFamily: M,
                  fontSize: mob ? 11 : 12.5,
                  color: flagged ? t.flag : t.tx2,
                  textAlign: "right",
                }}
              >
                {r.proposed}
              </span>
              <span
                style={{
                  fontFamily: M,
                  fontSize: mob ? 11 : 12.5,
                  color: t.tx3,
                  textAlign: "right",
                }}
              >
                {r.bench}
              </span>
              {!mob ? (
                <span
                  style={{
                    fontFamily: M,
                    fontSize: 10,
                    color: flagged ? t.flag : t.ok,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {vis ? (r.flag ? "⚠ FLAGGED" : "✓ fair") : ""}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
