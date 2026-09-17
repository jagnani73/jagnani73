"use client";

import type { CSSProperties } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_EASE,
  FIG_HOLD,
  FIG_TRACK,
  MONO as M,
  figBox,
  figH,
  figPanel,
  figType,
} from "./fig-style";
import type { FigAccent } from "@/utils/types/fig.types";

const KIT_SETS: {
  type: string;
  json: string[];
  rows: { s: string; n: string; v: string; c: FigAccent }[];
}[] = [
  {
    type: "TokenBalances",
    json: [
      '"items": [',
      '  { "ticker": "USDC",',
      '    "balance": "1240.50",',
      '    "quote": 1240.50 },',
      '  { "ticker": "WETH", … } ]',
    ],
    rows: [
      { s: "USDC", n: "USD Coin", v: "1,240.50", c: "sig" },
      { s: "WETH", n: "Wrapped Ether", v: "3.82", c: "acc" },
      { s: "UNI", n: "Uniswap", v: "512.00", c: "ok" },
    ],
  },
  {
    type: "NFTWalletView",
    json: [
      '"nft_data": [',
      '  { "name": "Punk #1401",',
      '    "token_id": 1401 },',
      '  { "name": "Ape #88",',
      '    "token_id": 88 } ]',
    ],
    rows: [
      { s: "#1401", n: "CryptoPunks", v: "32.0 Ξ", c: "sig" },
      { s: "#88", n: "Bored Ape YC", v: "12.4 Ξ", c: "acc" },
      { s: "#204", n: "Azuki", v: "4.1 Ξ", c: "ok" },
    ],
  },
  {
    type: "TransactionsList",
    json: [
      '"items": [',
      '  { "type": "swap",',
      '    "value": "0.50 ETH" },',
      '  { "type": "send", … } ]',
    ],
    rows: [
      { s: "SWAP", n: "Uniswap V3", v: "0.50 ETH", c: "sig" },
      { s: "SEND", n: "→ vitalik.eth", v: "200 USDC", c: "acc" },
      { s: "MINT", n: "Seaport", v: "1 NFT", c: "ok" },
    ],
  },
];

// One blank beat, three rows, then the hold.
const PER = 4 + FIG_HOLD;

// GoldRush Kit — raw API response → rendered component.
export const FigKit = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const tick = useTick(FIG_BEAT.quick, KIT_SETS.length * PER, active, PER - 1);
  const set = KIT_SETS[Math.floor(tick / PER) % KIT_SETS.length];
  const shown = Math.min(tick % PER, set.rows.length);
  const sub = figType("sub", mob);
  const body = figType("body", mob);

  // The response changes every cycle, so both cards keep a fixed height at
  // every width.
  const card: CSSProperties = {
    ...figPanel(t),
    height: figH("lg", mob),
    overflow: "hidden",
  };
  const label: CSSProperties = {
    fontFamily: M,
    fontSize: figType("label", mob),
    letterSpacing: FIG_TRACK,
  };

  return (
    <div>
      <FigCaption
        left="fig. 1: a raw API response resolving into a rendered component"
        right={`<${set.type} />`}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: mob ? 10 : 18,
          alignItems: "stretch",
        }}
      >
        <div style={{ ...card, padding: mob ? "12px 14px" : "16px 18px" }}>
          <p style={{ ...label, color: t.tx3, margin: "0 0 8px" }}>
            RAW · GoldRush SDK
          </p>
          <pre
            style={{
              margin: 0,
              fontFamily: M,
              fontSize: body,
              lineHeight: 1.75,
              color: t.tx2,
              whiteSpace: "pre-wrap",
            }}
          >
            {set.json.join("\n")}
          </pre>
        </div>
        <div
          style={{
            ...card,
            padding: mob ? 12 : 14,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <p style={{ ...label, color: t.sig, margin: "0 0 2px" }}>
            RENDERED · drop-in component
          </p>
          {set.rows.map((r, i) => {
            const vis = i < shown;
            return (
              <div
                key={set.type + r.s}
                style={{
                  ...figBox(t),
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: mob ? "6px 8px" : "7px 10px",
                  flexShrink: 0,
                  opacity: vis ? 1 : 0,
                  transform: vis ? "translateY(0)" : "translateY(6px)",
                  transition: FIG_EASE,
                }}
              >
                <span
                  style={{
                    width: mob ? 26 : 30,
                    height: mob ? 26 : 30,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: `${t[r.c]}22`,
                    border: `1px solid ${t[r.c]}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: M,
                    fontSize: sub,
                    color: t[r.c],
                  }}
                >
                  {r.s.slice(0, 3)}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: M,
                      fontSize: body,
                      color: t.tx,
                    }}
                  >
                    {r.s}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: M,
                      fontSize: sub,
                      color: t.tx3,
                    }}
                  >
                    {r.n}
                  </p>
                </div>
                <span style={{ fontFamily: M, fontSize: body, color: t[r.c] }}>
                  {r.v}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
