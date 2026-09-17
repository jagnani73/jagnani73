"use client";

import type { CSSProperties } from "react";
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
  figH,
  figPanel,
  figType,
} from "./fig-style";

const DEC_EVENTS: {
  name: string;
  raw: string[];
  fields: [string, string][];
}[] = [
  {
    name: "Transfer",
    raw: [
      "topic0  0xddf252ad…b3ef",
      "topic1  0x000…d8dA…96045",
      "topic2  0x000…aB58…aeC9B",
      "data    0x0000…1158e46091",
    ],
    fields: [
      ["from", "vitalik.eth"],
      ["to", "0xAb58…aeC9B"],
      ["value", "1.25 WETH"],
      ["value_usd", "$4,180.00"],
    ],
  },
  {
    name: "Swap",
    raw: [
      "topic0  0xd78ad95f…f1c4",
      "topic1  0x000…1F98…1F984",
      "data    0x0000…0de0b6b3a76…",
    ],
    fields: [
      ["sender", "0x1F98…1F984"],
      ["amount_in", "500 USDC"],
      ["amount_out", "0.18 WETH"],
      ["value_usd", "$498.20"],
    ],
  },
  {
    name: "Approval",
    raw: [
      "topic0  0x8c5be1e5…b925",
      "topic1  0x000…owner",
      "topic2  0x000…spender",
      "data    0xffff…ffffffff",
    ],
    fields: [
      ["owner", "0xd8dA…96045"],
      ["spender", "Uniswap V3"],
      ["amount", "unlimited"],
    ],
  },
];

// One blank beat, up to four fields, then the hold.
const PER = 5 + FIG_HOLD;

// GoldRush Decoder — raw event log → named, enriched event.
export const FigDecoder = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const tick = useTick(
    FIG_BEAT.quick,
    DEC_EVENTS.length * PER,
    active,
    PER - 1,
  );
  const ev = DEC_EVENTS[Math.floor(tick / PER) % DEC_EVENTS.length];
  const shown = Math.min(tick % PER, ev.fields.length);
  const title = figType("title", mob);

  // The event changes every cycle, so both cards keep a fixed height at every width.
  const card: CSSProperties = {
    ...figPanel(t),
    padding: mob ? "12px 14px" : "16px 18px",
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
        left="fig. 1: a raw event log decoding into a named, enriched event"
        right={`decode() · ${ev.name}`}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 54px 1fr",
          gap: mob ? 10 : 8,
          alignItems: "center",
        }}
      >
        <div style={card}>
          <p style={{ ...label, color: t.tx3, margin: "0 0 10px" }}>
            RAW LOG · hex
          </p>
          {ev.raw.map((l, i) => (
            <p
              key={i}
              style={{
                margin: "0 0 7px",
                fontFamily: M,
                fontSize: figType("sub", mob),
                color: t.tx2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {l}
            </p>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: title,
            color: t.sig,
          }}
        >
          {mob ? "↓" : "→"}
        </div>
        <div style={{ ...card, borderColor: t.sig }}>
          <p style={{ ...label, color: t.sig, margin: "0 0 8px" }}>
            DECODED · structured
          </p>
          <p
            style={{
              fontFamily: M,
              fontSize: title,
              color: t.tx,
              margin: "0 0 8px",
            }}
          >
            {ev.name} <span style={{ color: t.tx3 }}>{"{"}</span>
          </p>
          {ev.fields.map(([k, v], i) => {
            const vis = i < shown;
            return (
              <p
                key={k}
                style={{
                  margin: "0 0 6px 14px",
                  fontFamily: M,
                  fontSize: figType("body", mob),
                  opacity: vis ? 1 : FIG_DIM,
                  transition: FIG_EASE,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: t.tx3 }}>{k}:</span>{" "}
                <span
                  style={{
                    color: vis ? (k === "value_usd" ? t.ok : t.acc) : t.tx3,
                  }}
                >
                  {vis ? v : "…"}
                </span>
              </p>
            );
          })}
          <p
            style={{
              fontFamily: M,
              fontSize: title,
              color: t.tx3,
              margin: "2px 0 0",
            }}
          >
            {"}"}
          </p>
        </div>
      </div>
    </div>
  );
};
