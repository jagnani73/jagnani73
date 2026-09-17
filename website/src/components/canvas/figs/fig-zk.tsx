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

// Beats 3-6 run the circuit; from beat 7 the verified claim holds.
const VERIFIED_AT = 7;

// deLinZK — proof-of-employment, employer kept private.
export const FigZk = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(
    FIG_BEAT.quick,
    VERIFIED_AT + FIG_HOLD,
    active,
    VERIFIED_AT,
  );
  const inCircuit = n >= 3 && n < VERIFIED_AT;
  const verified = n >= VERIFIED_AT;
  const title = figType("title", mob);

  // The cards stack on mobile and never change size, so they fit their content there.
  const card: CSSProperties = {
    ...figPanel(t),
    height: mob ? undefined : figH("sm", mob),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const label: CSSProperties = {
    fontFamily: M,
    fontSize: figType("label", mob),
    letterSpacing: FIG_TRACK,
    color: t.tx3,
    margin: "0 0 8px",
  };
  const value: CSSProperties = {
    fontFamily: M,
    fontSize: title,
    color: t.tx,
    margin: 0,
  };

  return (
    <div>
      <FigCaption
        left="fig. 1: proof-of-employment: proven true, employer kept private"
        right="Polygon ID · zk"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 40px 0.8fr 40px 1fr",
          gap: mob ? 10 : 6,
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...card,
            padding: mob ? "12px 14px" : 16,
            borderColor: t.acc,
          }}
        >
          <p style={label}>CREDENTIAL · private</p>
          <p style={value}>
            employer: <span style={{ color: t.acc }}>Covalent</span>
          </p>
          <p style={{ ...value, margin: "5px 0 0" }}>
            tenure: <span style={{ color: t.acc }}>2y 4m</span>
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: title,
            color: inCircuit ? t.sig : t.tx3,
            transition: FIG_EASE,
          }}
        >
          {mob ? "↓" : "→"}
        </div>
        <div
          style={{
            ...card,
            padding: mob ? 12 : "16px 10px",
            borderColor: inCircuit ? t.sig : t.rule,
            textAlign: "center",
            transition: FIG_EASE,
          }}
        >
          <p style={label}>ZK CIRCUIT</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              height: mob ? 20 : 28,
              alignItems: "center",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                style={{
                  width: 5,
                  height: "100%",
                  borderRadius: 2,
                  background: inCircuit ? t.sig : t.tx3,
                  opacity: inCircuit
                    ? 0.35 + 0.65 * Math.abs(Math.sin((n + i) * 1.5))
                    : 0.3,
                  transition: FIG_EASE,
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: title,
            color: verified ? t.ok : t.tx3,
            transition: FIG_EASE,
          }}
        >
          {mob ? "↓" : "→"}
        </div>
        <div
          style={{
            ...card,
            padding: mob ? "12px 14px" : 16,
            borderColor: verified ? t.ok : t.rule,
            opacity: verified ? 1 : FIG_DIM,
            transition: FIG_EASE,
          }}
        >
          <p style={label}>VERIFIED · public</p>
          <p style={value}>
            employed:{" "}
            <span style={{ color: t.ok }}>{verified ? "true ✓" : "…"}</span>
          </p>
          <p style={{ ...value, margin: "5px 0 0" }}>
            employer:{" "}
            <span style={{ color: t.tx3, letterSpacing: "2px" }}>█████</span>
          </p>
        </div>
      </div>
    </div>
  );
};
