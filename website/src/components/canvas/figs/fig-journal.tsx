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
  figH,
  figPanel,
  figType,
} from "./fig-style";
import type { JournalColor as C } from "@/utils/types/fig.types";

const FREN_KEYS: [string, C][] = [
  ["anxious", "flag"],
  ["work", "tx2"],
  ["sleep", "acc"],
  ["hopeful", "ok"],
];

// Beats 0-1 idle, 2-4 analysing, then the finished analysis holds.
const DONE = 5;

// Fren — therapist sees the analysis, never the raw entry.
export const FigJournal = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(FIG_BEAT.quick, DONE + FIG_HOLD, active, DONE);
  const analyzing = n >= 2 && n < DONE;
  const done = n >= DONE;
  const keysShown = done ? FREN_KEYS.length : 0;
  const mood = done ? 34 : 0;
  const sub = figType("sub", mob);

  // The analysis card fills in over the cycle, so both cards keep a fixed
  // height at every width.
  const card: CSSProperties = {
    ...figPanel(t),
    padding: mob ? 12 : 14,
    height: figH("sm", mob),
    overflow: "hidden",
  };
  const label: CSSProperties = {
    fontFamily: M,
    fontSize: figType("label", mob),
    letterSpacing: FIG_TRACK,
    margin: "0 0 9px",
  };

  return (
    <div>
      <FigCaption
        left="fig. 1: the therapist sees the analysis, never the raw entry"
        right="NLP · sentiment + TF-IDF"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 40px 1fr",
          gap: mob ? 10 : 6,
          alignItems: "center",
        }}
      >
        <div style={{ ...card, borderColor: t.acc }}>
          <p style={{ ...label, color: t.tx3 }}>JOURNAL · private</p>
          {[96, 88, 92, 70].map((w, i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: 8,
                width: `${w}%`,
                borderRadius: 3,
                background: t.tx2,
                opacity: 0.5,
                filter: "blur(2.5px)",
                margin: "0 0 8px",
              }}
            />
          ))}
          <span style={{ fontFamily: M, fontSize: sub, color: t.acc }}>
            🔒 encrypted to the client
          </span>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: figType("body", mob),
            color: analyzing ? t.sig : t.tx3,
            transition: FIG_EASE,
          }}
        >
          {analyzing ? (mob ? "↓ NLP" : "NLP →") : mob ? "↓" : "→"}
        </div>
        <div
          style={{
            ...card,
            borderColor: done ? t.sig : t.rule,
            transition: FIG_EASE,
          }}
        >
          <p style={{ ...label, color: t.sig }}>THERAPIST · analysis</p>
          <div
            style={{
              fontFamily: M,
              fontSize: sub,
              color: t.tx3,
              margin: "0 0 5px",
            }}
          >
            mood index
          </div>
          <div
            style={{
              height: 9,
              borderRadius: 99,
              background: t.bg,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${mood}%`,
                background: t.flag,
                transition: FIG_EASE,
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FREN_KEYS.slice(0, keysShown).map(([k, c]) => (
              <span
                key={k}
                style={{
                  fontFamily: M,
                  fontSize: sub,
                  color: t[c],
                  border: `1px solid ${t[c]}`,
                  borderRadius: 99,
                  padding: "2px 9px",
                }}
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
