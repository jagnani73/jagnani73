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
  figBox,
  figH,
  figPanel,
  figTone,
  figType,
} from "./fig-style";

// The repayment lands by beat 13; the settled pair holds after it.
const BEATS = 13 + FIG_HOLD;

// LenDen — collateral locked on one chain, loan released on another.
export const FigLenden = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(FIG_BEAT.quick, BEATS, active, 9);
  const deposited = n >= 1;
  const sending = n >= 3 && n <= 6;
  const loaned = n >= 7;
  const repaying = n >= 11 && n <= 13;
  const pkgX = sending
    ? ((n - 3) / 3) * 100
    : repaying
      ? (1 - (n - 11) / 2) * 100
      : loaned
        ? 100
        : 0;
  const moving = sending || repaying;
  const idle = figTone(t, "idle");
  const title = figType("title", mob);
  const sub = figType("sub", mob);

  // The three columns never stack, so the chains share one height at every width.
  const card: CSSProperties = {
    ...figPanel(t),
    padding: mob ? 12 : "16px 18px",
    height: figH("sm", mob),
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  const label: CSSProperties = {
    fontFamily: M,
    fontSize: figType("label", mob),
    letterSpacing: FIG_TRACK,
    color: t.tx3,
    margin: 0,
  };

  return (
    <div>
      <FigCaption
        left="fig. 1: collateral locked on one chain, a loan released on another"
        right="Router cross-talk"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: mob ? 6 : 10,
          alignItems: "stretch",
        }}
      >
        <div style={card}>
          <p style={label}>CHAIN A · Polygon</p>
          <div
            style={{
              ...figBox(t, deposited ? t.acc : idle),
              borderStyle: "dashed",
              padding: mob ? 9 : "11px 13px",
              opacity: deposited ? 1 : FIG_DIM,
              transition: FIG_EASE,
            }}
          >
            <p
              style={{
                fontFamily: M,
                fontSize: title,
                color: deposited ? t.acc : t.tx3,
                margin: 0,
              }}
            >
              250 USDC + 1 NFT
            </p>
            <p
              style={{
                fontFamily: M,
                fontSize: sub,
                color: t.tx3,
                margin: "4px 0 0",
              }}
            >
              collateral · locked
            </p>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            minWidth: mob ? 44 : 76,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 4,
              right: 4,
              height: 1,
              background: idle,
            }}
          />
          {moving ? (
            <span
              style={{
                position: "absolute",
                left: `${pkgX}%`,
                transform: "translateX(-50%)",
                fontFamily: M,
                fontSize: sub,
                color: repaying ? t.ok : t.sig,
                background: t.bg,
                border: `1px solid ${repaying ? t.ok : t.sig}`,
                borderRadius: 3,
                padding: "2px 5px",
                whiteSpace: "nowrap",
                transition: `left ${FIG_BEAT.quick}ms linear`,
              }}
            >
              {repaying ? "repay →" : "← msg"}
            </span>
          ) : (
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: M,
                fontSize: sub,
                color: t.tx3,
                background: t.bg,
                padding: "2px 5px",
              }}
            >
              Router
            </span>
          )}
        </div>
        <div style={card}>
          <p style={label}>CHAIN B · Ethereum</p>
          <div
            style={{
              ...figBox(t, loaned ? t.ok : idle),
              padding: mob ? 9 : "11px 13px",
              opacity: loaned ? 1 : FIG_DIM,
              transition: FIG_EASE,
            }}
          >
            <p
              style={{
                fontFamily: M,
                fontSize: title,
                color: loaned ? t.ok : t.tx3,
                margin: 0,
              }}
            >
              0.08 WETH
            </p>
            <p
              style={{
                fontFamily: M,
                fontSize: sub,
                color: t.tx3,
                margin: "4px 0 0",
              }}
            >
              loan · released
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
