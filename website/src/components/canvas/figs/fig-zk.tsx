"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { figPanel, MONO as M } from "./fig-style";

// deLinZK — proof-of-employment, employer kept private.
export const FigZk = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(440, 12, active, 9);
  const inCircuit = n >= 3 && n <= 6;
  const verified = n >= 7;
  const panel = figPanel(t);

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
            ...panel,
            padding: mob ? "12px 14px" : 16,
            borderColor: t.acc,
          }}
        >
          <p
            style={{
              fontFamily: M,
              fontSize: 10,
              color: t.tx3,
              margin: "0 0 8px",
              letterSpacing: "0.1em",
            }}
          >
            CREDENTIAL · private
          </p>
          <p
            style={{
              fontFamily: M,
              fontSize: mob ? 12 : 13,
              color: t.tx,
              margin: 0,
            }}
          >
            employer: <span style={{ color: t.acc }}>Covalent</span>
          </p>
          <p
            style={{
              fontFamily: M,
              fontSize: mob ? 12 : 13,
              color: t.tx,
              margin: "5px 0 0",
            }}
          >
            tenure: <span style={{ color: t.acc }}>2y 4m</span>
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: 14,
            color: inCircuit ? t.sig : t.tx3,
            transition: "color 0.3s",
          }}
        >
          {mob ? "↓" : "→"}
        </div>
        <div
          style={{
            ...panel,
            padding: mob ? 12 : "16px 10px",
            borderColor: inCircuit ? t.sig : t.rule,
            textAlign: "center",
            transition: "border-color 0.3s",
          }}
        >
          <p
            style={{
              fontFamily: M,
              fontSize: 10,
              color: t.tx3,
              margin: "0 0 8px",
              letterSpacing: "0.1em",
            }}
          >
            ZK CIRCUIT
          </p>
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
                  transition: "all 0.18s",
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: 14,
            color: verified ? t.ok : t.tx3,
            transition: "color 0.3s",
          }}
        >
          {mob ? "↓" : "→"}
        </div>
        <div
          style={{
            ...panel,
            padding: mob ? "12px 14px" : 16,
            borderColor: verified ? t.ok : t.rule,
            transition: "all 0.3s",
            opacity: verified ? 1 : 0.4,
          }}
        >
          <p
            style={{
              fontFamily: M,
              fontSize: 10,
              color: t.tx3,
              margin: "0 0 8px",
              letterSpacing: "0.1em",
            }}
          >
            VERIFIED · public
          </p>
          <p
            style={{
              fontFamily: M,
              fontSize: mob ? 12 : 13,
              color: t.tx,
              margin: 0,
            }}
          >
            employed:{" "}
            <span style={{ color: t.ok }}>{verified ? "true ✓" : "…"}</span>
          </p>
          <p
            style={{
              fontFamily: M,
              fontSize: mob ? 12 : 13,
              color: t.tx,
              margin: "5px 0 0",
            }}
          >
            employer:{" "}
            <span style={{ color: t.tx3, letterSpacing: "2px" }}>█████</span>
          </p>
        </div>
      </div>
    </div>
  );
};
