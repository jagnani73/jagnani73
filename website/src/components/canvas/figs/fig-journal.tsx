"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { figPanel, MONO as M } from "./fig-style";
import type { JournalColor as C } from "@/utils/types/fig.types";

const FREN_KEYS: [string, C][] = [
  ["anxious", "flag"],
  ["work", "tx2"],
  ["sleep", "acc"],
  ["hopeful", "ok"],
];

// Fren — therapist sees the analysis, never the raw entry.
export const FigJournal = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(560, 11, active, 8);
  const analyzing = n >= 2 && n <= 4;
  const done = n >= 5;
  const keysShown = done ? FREN_KEYS.length : 0;
  const mood = done ? 34 : 0;
  const panel = figPanel(t);

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
          alignItems: "stretch",
        }}
      >
        <div style={{ ...panel, padding: mob ? 12 : 14, borderColor: t.acc }}>
          <p
            style={{
              fontFamily: M,
              fontSize: 10,
              color: t.tx3,
              margin: "0 0 9px",
              letterSpacing: "0.08em",
            }}
          >
            JOURNAL · private
          </p>
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
          <span style={{ fontFamily: M, fontSize: 10, color: t.acc }}>
            🔒 encrypted to the client
          </span>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: M,
            fontSize: 12,
            color: analyzing ? t.sig : t.tx3,
            transition: "color 0.3s",
          }}
        >
          {analyzing ? (mob ? "↓ NLP" : "NLP →") : mob ? "↓" : "→"}
        </div>
        <div
          style={{
            ...panel,
            padding: mob ? 12 : 14,
            borderColor: done ? t.sig : t.rule,
            transition: "border-color 0.3s",
          }}
        >
          <p
            style={{
              fontFamily: M,
              fontSize: 10,
              color: t.sig,
              margin: "0 0 9px",
              letterSpacing: "0.08em",
            }}
          >
            THERAPIST · analysis
          </p>
          <div
            style={{
              fontFamily: M,
              fontSize: 10.5,
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
              background: t.panel,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${mood}%`,
                background: t.flag,
                transition: "width 0.6s",
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FREN_KEYS.slice(0, keysShown).map(([k, c]) => (
              <span
                key={k}
                style={{
                  fontFamily: M,
                  fontSize: 10.5,
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
