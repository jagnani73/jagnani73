"use client";

import type { CSSProperties } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";

const M = "var(--font-mono)";
const PTS = "8,46 22,20 34,52 48,18 60,50 74,22 86,48 92,30";
const DASH = 260;

// Shikshak — a blackboard captured as a pixel stream, ~85% less data than video.
export const FigBoard = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const n = useTick(110, 130, active, 100);
  const draw = Math.min(n / 70, 1);
  const reduction = Math.round(draw * 85);
  const panel = { border: `1px solid ${t.rule}`, borderRadius: 6, background: t.panel };

  return (
    <div>
      <FigCaption left="fig. 1 — a blackboard captured as a pixel stream — ~85% less data than video" right="OpenCV · Socket.IO" />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 36px 1fr", gap: mob ? 10 : 6, alignItems: "center" }}>
        <div style={{ ...panel, padding: 10, position: "relative" }}>
          <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "0 0 8px", letterSpacing: "0.08em" }}>CAMERA · blackboard</p>
          {([[4, 4], [4, 1], [1, 4], [1, 1]] as const).map(([l, tt], i) => {
            const st: CSSProperties = {
              position: "absolute",
              width: 12,
              height: 12,
              [l === 4 ? "left" : "right"]: 8,
              [tt === 4 ? "top" : "bottom"]: 28,
              borderRight: l === 1 ? `2px solid ${t.acc}` : "none",
              borderTop: tt === 1 ? `2px solid ${t.acc}` : "none",
              borderLeft: l === 4 ? `2px solid ${t.acc}` : "none",
              borderBottom: tt === 4 ? `2px solid ${t.acc}` : "none",
            };
            return <span key={i} style={st} />;
          })}
          <svg viewBox="0 0 100 64" style={{ width: "100%", height: mob ? 64 : 78 }}>
            <polyline points={PTS} fill="none" stroke={t.tx} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={DASH} strokeDashoffset={DASH * (1 - draw)} />
          </svg>
        </div>
        <div style={{ textAlign: "center", fontFamily: M, fontSize: 13, color: t.sig }}>{mob ? "↓" : "→"}</div>
        <div style={{ ...panel, padding: 10, borderColor: t.sig }}>
          <p style={{ fontFamily: M, fontSize: 10, color: t.sig, margin: "0 0 8px", letterSpacing: "0.08em" }}>STUDENT · canvas</p>
          <svg viewBox="0 0 100 64" style={{ width: "100%", height: mob ? 64 : 78 }}>
            <polyline points={PTS} fill="none" stroke={t.sig} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={DASH} strokeDashoffset={DASH * (1 - draw)} />
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
        <span style={{ fontFamily: M, fontSize: 10.5, color: t.tx3, whiteSpace: "nowrap" }}>raw video 3GB/day</span>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: t.panel, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${100 - reduction}%`, background: t.ok, transition: "width 0.15s linear" }} />
        </div>
        <span style={{ fontFamily: M, fontSize: 10.5, color: t.ok, whiteSpace: "nowrap" }}>−{reduction}%</span>
      </div>
    </div>
  );
};
