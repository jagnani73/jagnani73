"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { figPanel } from "./fig-style";

const M = "var(--font-mono)";
const S = "var(--font-sans)";

const NUDGE_SET = [
  { tag: "CDN · campaign", target: "Analytics", txt: "New — multi-chain analytics is live. Take a look →" },
  { tag: "trigger · polling", target: "Publish", txt: "One step left: publish your first project." },
  { tag: "CDN · campaign", target: "Search", txt: "Tip — press ⌘K to jump anywhere instantly." },
];
const NUDGE_NAV = ["Search", "Dashboard", "Analytics", "Publish"];

// NudgeLab — a no-code nudge, configured once, delivered into a live product.
export const FigNudge = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const PER = 5;
  const tick = useTick(880, NUDGE_SET.length * PER, active, 2);
  const n = NUDGE_SET[Math.floor(tick / PER) % NUDGE_SET.length];
  const show = tick % PER >= 1;
  const panel = figPanel(t);

  return (
    <div>
      <FigCaption
        left="fig. 1 — a no-code nudge, configured once, delivered into a live product"
        right={n.tag}
      />
      <div style={{ ...panel, height: mob ? 210 : 216, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", borderBottom: `1px solid ${t.rule}` }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: t.ruleStrong }} />
          ))}
          <span style={{ marginLeft: 8, fontFamily: M, fontSize: 11, color: t.tx3 }}>app.yourproduct.xyz</span>
        </div>
        <div style={{ display: "flex", gap: 10, padding: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, minWidth: mob ? 92 : 118 }}>
            {NUDGE_NAV.map((item) => {
              const on = item === n.target && show;
              return (
                <span
                  key={item}
                  style={{
                    position: "relative",
                    fontFamily: M,
                    fontSize: mob ? 10.5 : 12,
                    color: on ? t.bg : t.tx2,
                    background: on ? t.sig : "transparent",
                    border: `1px solid ${on ? t.sig : t.rule}`,
                    borderRadius: 5,
                    padding: "6px 9px",
                    transition: "all 0.3s",
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
            {[88, 64, 74].map((w, i) => (
              <span key={i} style={{ height: 9, width: `${w}%`, borderRadius: 3, background: t.rule }} />
            ))}
            <div
              style={{
                position: "relative",
                marginTop: 8,
                alignSelf: "flex-start",
                maxWidth: "92%",
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(6px)",
                transition: "all 0.35s",
              }}
            >
              <div style={{ position: "absolute", top: -5, left: 16, width: 10, height: 10, background: t.acc, transform: "rotate(45deg)" }} />
              <div
                style={{
                  position: "relative",
                  background: t.acc,
                  color: t.bg,
                  fontFamily: S,
                  fontSize: mob ? 11.5 : 13,
                  fontWeight: 600,
                  padding: "9px 13px",
                  borderRadius: 7,
                  lineHeight: 1.4,
                }}
              >
                {n.txt}
              </div>
            </div>
          </div>
        </div>
        <span style={{ position: "absolute", bottom: 10, right: 13, fontFamily: M, fontSize: 10, color: t.tx3 }}>
          no deploy · pushed from the admin panel
        </span>
      </div>
    </div>
  );
};
