"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";

const M = "var(--font-mono)";
const S = "var(--font-sans)";

const STORY_TAGS = ["burnout", "anxiety", "loneliness", "family"];
const STORY_MSGS: { who: "seeker" | "supporter"; txt: string; ok: boolean }[] = [
  { who: "seeker", txt: "some days I just can't focus at all.", ok: true },
  { who: "supporter", txt: "that sounds exhausting — I've been there too.", ok: true },
  { who: "supporter", txt: "████████████", ok: false },
];

// Stories — peers matched on shared tags; every message passes a toxicity gate.
export const FigMatch = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const n = useTick(900, STORY_MSGS.length + 5, active, STORY_MSGS.length + 4);
  const matched = n >= 2;
  const msgsShown = Math.max(0, Math.min(n - 2, STORY_MSGS.length));
  const panel = { border: `1px solid ${t.rule}`, borderRadius: 6, background: t.panel };

  return (
    <div>
      <FigCaption left="fig. 1 — peers matched on shared tags; every message passes a toxicity gate" right="score-matched · TF.js filter" />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 10 : 16, alignItems: "start" }}>
        <div style={{ ...panel, padding: mob ? 11 : 13 }}>
          <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "0 0 9px", letterSpacing: "0.08em" }}>
            MATCH · {matched ? "3 shared tags" : "scoring…"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {STORY_TAGS.map((tag, i) => {
              const on = matched && i < 3;
              return (
                <span key={tag} style={{ fontFamily: M, fontSize: 10.5, color: on ? t.bg : t.tx3, background: on ? t.sig : "transparent", border: `1px solid ${on ? t.sig : t.rule}`, borderRadius: 99, padding: "2px 9px", transition: "all 0.3s" }}>
                  {tag}
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: M, fontSize: 11, color: t.tx2 }}>
            <span style={{ color: t.sig }}>seeker</span>
            <span>⇄</span>
            <span style={{ color: t.acc }}>supporter</span>
          </div>
        </div>
        <div style={{ ...panel, padding: mob ? 11 : 13, display: "flex", flexDirection: "column", gap: 7, minHeight: mob ? 0 : 118 }}>
          <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "0 0 2px", letterSpacing: "0.08em" }}>ANONYMOUS CHAT</p>
          {STORY_MSGS.slice(0, msgsShown).map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.who === "seeker" ? "flex-start" : "flex-end",
                maxWidth: "90%",
                fontFamily: S,
                fontSize: mob ? 11.5 : 12.5,
                padding: "6px 10px",
                borderRadius: m.who === "seeker" ? "9px 9px 9px 2px" : "9px 9px 2px 9px",
                background: m.ok ? (m.who === "seeker" ? `${t.sig}1A` : `${t.acc}1A`) : "transparent",
                border: `1px solid ${m.ok ? t.rule : t.flag}`,
                color: m.ok ? t.tx : t.flag,
              }}
            >
              {m.ok ? (
                m.txt
              ) : (
                <span>
                  {m.txt} <span style={{ fontFamily: M, fontSize: 9.5 }}>· censored</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
