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

const S = "var(--font-sans)";

const STORY_TAGS = ["burnout", "anxiety", "loneliness", "family"];
const STORY_MSGS: { who: "seeker" | "supporter"; txt: string; ok: boolean }[] =
  [
    { who: "seeker", txt: "some days I just can't focus at all.", ok: true },
    {
      who: "supporter",
      txt: "that sounds exhausting. I've been there too.",
      ok: true,
    },
    { who: "supporter", txt: "████████████", ok: false },
  ];

// Matching takes two beats, then one message per beat, then the hold.
const DONE = 2 + STORY_MSGS.length;

// Stories — peers matched on shared tags, messages gated for toxicity.
export const FigMatch = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(FIG_BEAT.base, DONE + FIG_HOLD, active, DONE);
  const matched = n >= 2;
  const msgsShown = Math.max(0, Math.min(n - 2, STORY_MSGS.length));
  const height = figH("md", mob);
  const sub = figType("sub", mob);
  const label: CSSProperties = {
    fontFamily: M,
    fontSize: figType("label", mob),
    letterSpacing: FIG_TRACK,
    color: t.tx3,
  };

  return (
    <div>
      <FigCaption
        left="fig. 1: peers matched on shared tags; every message passes a toxicity gate"
        right="score-matched · TF.js filter"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: mob ? 10 : 16,
          alignItems: "stretch",
        }}
      >
        {/* The tags never change size, so stacked on mobile this card fits them. */}
        <div
          style={{
            ...figPanel(t),
            padding: mob ? 11 : 13,
            height: mob ? undefined : height,
          }}
        >
          <p style={{ ...label, margin: "0 0 9px" }}>
            MATCH · {matched ? "3 shared tags" : "scoring…"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {STORY_TAGS.map((tag, i) => {
              const on = matched && i < 3;
              return (
                <span
                  key={tag}
                  style={{
                    fontFamily: M,
                    fontSize: sub,
                    color: on ? t.bg : t.tx3,
                    background: on ? t.sig : "transparent",
                    border: `1px solid ${on ? t.sig : t.rule}`,
                    borderRadius: 99,
                    padding: "2px 9px",
                    transition: FIG_EASE,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              fontFamily: M,
              fontSize: sub,
              color: t.tx2,
            }}
          >
            <span style={{ color: t.sig }}>seeker</span>
            <span>⇄</span>
            <span style={{ color: t.acc }}>supporter</span>
          </div>
        </div>
        <div
          style={{
            ...figPanel(t),
            padding: mob ? 11 : 13,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            height,
            overflow: "hidden",
          }}
        >
          <p style={{ ...label, margin: "0 0 2px" }}>ANONYMOUS CHAT</p>
          {STORY_MSGS.slice(0, msgsShown).map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.who === "seeker" ? "flex-start" : "flex-end",
                flexShrink: 0,
                maxWidth: "90%",
                fontFamily: S,
                fontSize: figType("title", mob),
                padding: "6px 10px",
                borderRadius:
                  m.who === "seeker" ? "9px 9px 9px 2px" : "9px 9px 2px 9px",
                background: m.ok
                  ? m.who === "seeker"
                    ? `${t.sig}1A`
                    : `${t.acc}1A`
                  : "transparent",
                border: `1px solid ${m.ok ? t.rule : t.flag}`,
                color: m.ok ? t.tx : t.flag,
              }}
            >
              {m.ok ? (
                m.txt
              ) : (
                <span>
                  {m.txt}{" "}
                  <span style={{ fontFamily: M, fontSize: sub }}>
                    · censored
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
