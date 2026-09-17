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
  figTone,
  figType,
} from "./fig-style";

// Facture — one real invoice read against the whole book.
//
// Every row is MF-2080 as it sold on Hedera and Arc testnet on 6 Sep 2026
// (docs/deployments.md in the facture repo): B-rated, $20,000 face, 40 days.
// Seven standing bids screened it. The two A-floor bids (6.75% and 8.00%)
// refused it on rating, two refused on debtor concentration, two priced it and
// lost on yield, and Harrow Point's escrowed bid bought it at 850 bps.
// $19,813.69 is 2,000,000 × 850 × 40 / 3,650,000 cents rounded up in the
// buyer's favour, so changing any input means re-deriving the price.
const ROWS = [
  {
    bids: 2,
    terms: ["A floor", "A floor · 6.75% and 8.00%"],
    screen: "RATING_BELOW_MANDATE",
    result: ["rating", "refused"],
    state: "refused",
  },
  {
    bids: 2,
    terms: ["debtor cap", "too little room under the debtor cap"],
    screen: "DEBTOR_CONCENTRATION",
    result: ["concentration", "refused"],
    state: "refused",
  },
  {
    bids: 2,
    terms: ["priced wider", "eligible, priced wider"],
    screen: "ELIGIBLE",
    result: ["outbid", "outbid"],
    state: "muted",
  },
  {
    bids: 1,
    terms: ["Harrow Point 8.50%", "Harrow Point · 8.50% · escrowed on Arc"],
    screen: "LOWEST YIELD",
    result: ["$19,813.69", "$19,813.69"],
    state: "ok",
  },
] as const;

export const FigFacture = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  // Beat n screens row n; the finished book holds for FIG_HOLD beats.
  const n = useTick(FIG_BEAT.base, ROWS.length + FIG_HOLD, active, ROWS.length);
  const v = mob ? 0 : 1;
  const cols = mob ? "1fr auto" : "40px 1fr 180px 92px";
  const body = figType("body", mob);

  return (
    <div>
      <FigCaption
        left="fig. 1: seven standing bids read one invoice, and the tightest that could take it bought it"
        right={
          mob
            ? "MF-2080 · testnet"
            : "MF-2080 · B · $20,000 · 40 days · testnet"
        }
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            gap: mob ? 8 : 14,
            padding: mob ? "0 11px" : "0 15px",
            fontFamily: M,
            fontSize: figType("label", mob),
            letterSpacing: FIG_TRACK,
            color: t.tx3,
          }}
        >
          {!mob ? <span>BIDS</span> : null}
          <span>TERMS</span>
          {!mob ? <span>SCREEN</span> : null}
          <span style={{ textAlign: "right" }}>RESULT</span>
        </div>
        {ROWS.map((r, i) => {
          const done = i < n;
          const screening = i === n;
          const tone = figTone(t, r.state);
          const edge = screening
            ? figTone(t, "active")
            : done && r.state !== "muted"
              ? tone
              : t.rule;
          return (
            <div
              key={r.screen}
              style={{
                ...figBox(t, edge),
                display: "grid",
                gridTemplateColumns: cols,
                alignItems: "center",
                gap: mob ? 8 : 14,
                padding: mob ? "7px 10px" : "8px 14px",
                opacity: done || screening ? 1 : FIG_DIM,
                transition: FIG_EASE,
              }}
            >
              {!mob ? (
                <span style={{ fontFamily: M, fontSize: body, color: t.tx3 }}>
                  {r.bids}
                </span>
              ) : null}
              <span
                style={{
                  fontFamily: M,
                  fontSize: body,
                  color: t.tx,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.terms[v]}
              </span>
              {!mob ? (
                <span
                  style={{
                    fontFamily: M,
                    fontSize: figType("sub", mob),
                    letterSpacing: FIG_TRACK,
                    color: done ? t.tx2 : t.tx3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.screen}
                </span>
              ) : null}
              <span
                style={{
                  fontFamily: M,
                  fontSize: body,
                  color: done ? tone : t.tx3,
                  textAlign: "right",
                  whiteSpace: "nowrap",
                  transition: FIG_EASE,
                }}
              >
                {done ? r.result[v] : "·"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
