"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { figPanel } from "./fig-style";

const M = "var(--font-mono)";

type RowColor = "sig" | "acc" | "ok";
const KIT_SETS: {
  type: string;
  json: string[];
  rows: { s: string; n: string; v: string; c: RowColor }[];
}[] = [
  {
    type: "TokenBalances",
    json: ['"items": [', '  { "ticker": "USDC",', '    "balance": "1240.50",', '    "quote": 1240.50 },', '  { "ticker": "WETH", … } ]'],
    rows: [
      { s: "USDC", n: "USD Coin", v: "1,240.50", c: "sig" },
      { s: "WETH", n: "Wrapped Ether", v: "3.82", c: "acc" },
      { s: "UNI", n: "Uniswap", v: "512.00", c: "ok" },
    ],
  },
  {
    type: "NFTWalletView",
    json: ['"nft_data": [', '  { "name": "Punk #1401",', '    "token_id": 1401 },', '  { "name": "Ape #88",', '    "token_id": 88 } ]'],
    rows: [
      { s: "#1401", n: "CryptoPunks", v: "32.0 Ξ", c: "sig" },
      { s: "#88", n: "Bored Ape YC", v: "12.4 Ξ", c: "acc" },
      { s: "#204", n: "Azuki", v: "4.1 Ξ", c: "ok" },
    ],
  },
  {
    type: "TransactionsList",
    json: ['"items": [', '  { "type": "swap",', '    "value": "0.50 ETH" },', '  { "type": "send", … } ]'],
    rows: [
      { s: "SWAP", n: "Uniswap V3", v: "0.50 ETH", c: "sig" },
      { s: "SEND", n: "→ vitalik.eth", v: "200 USDC", c: "acc" },
      { s: "MINT", n: "Seaport", v: "1 NFT", c: "ok" },
    ],
  },
];

// GoldRush Kit — a raw API response resolving into a rendered component.
export const FigKit = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const PER = 7;
  const tick = useTick(640, KIT_SETS.length * PER, active, 6);
  const set = KIT_SETS[Math.floor(tick / PER) % KIT_SETS.length];
  const shown = Math.min(tick % PER, set.rows.length);
  const panel = figPanel(t);

  return (
    <div>
      <FigCaption
        left="fig. 1 — a raw API response resolving into a rendered component"
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
        <div style={{ ...panel, padding: mob ? "12px 14px" : "16px 18px", minHeight: mob ? 0 : 204 }}>
          <p style={{ fontFamily: M, fontSize: 10.5, color: t.tx3, margin: "0 0 8px", letterSpacing: "0.1em" }}>
            RAW · GoldRush SDK
          </p>
          <pre style={{ margin: 0, fontFamily: M, fontSize: mob ? 10 : 11.5, lineHeight: 1.75, color: t.tx2, whiteSpace: "pre-wrap" }}>
            {set.json.join("\n")}
          </pre>
        </div>
        <div style={{ ...panel, padding: mob ? 12 : 14, minHeight: mob ? 0 : 204, display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: M, fontSize: 10.5, color: t.sig, margin: "0 0 2px", letterSpacing: "0.1em" }}>
            RENDERED · drop-in component
          </p>
          {set.rows.map((r, i) => {
            const vis = i < shown;
            return (
              <div
                key={set.type + r.s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: mob ? "7px 8px" : "9px 11px",
                  border: `1px solid ${t.rule}`,
                  borderRadius: 5,
                  background: t.bg,
                  opacity: vis ? 1 : 0,
                  transform: vis ? "translateY(0)" : "translateY(6px)",
                  transition: "all 0.35s",
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
                    fontSize: 8.5,
                    color: t[r.c],
                  }}
                >
                  {r.s.slice(0, 3)}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ margin: 0, fontFamily: M, fontSize: mob ? 11 : 12.5, color: t.tx }}>{r.s}</p>
                  <p style={{ margin: 0, fontFamily: M, fontSize: 10.5, color: t.tx3 }}>{r.n}</p>
                </div>
                <span style={{ fontFamily: M, fontSize: mob ? 10.5 : 12, color: t[r.c] }}>{r.v}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
