"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";

const M = "var(--font-mono)";

// LenDen — collateral locked on one chain, a loan released on another.
export const FigLenden = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const n = useTick(470, 16, active, 9);
  const deposited = n >= 1;
  const sending = n >= 3 && n <= 6;
  const loaned = n >= 7;
  const repaying = n >= 11 && n <= 13;
  const pkgX = sending ? ((n - 3) / 3) * 100 : repaying ? (1 - (n - 11) / 2) * 100 : loaned ? 100 : 0;
  const moving = sending || repaying;
  const panel = { border: `1px solid ${t.rule}`, borderRadius: 6, background: t.panel };

  return (
    <div>
      <FigCaption left="fig. 1 — collateral locked on one chain, a loan released on another" right="Router cross-talk" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: mob ? 6 : 10, alignItems: "stretch" }}>
        <div style={{ ...panel, padding: mob ? 12 : "16px 18px" }}>
          <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "0 0 12px", letterSpacing: "0.1em" }}>CHAIN A · Polygon</p>
          <div style={{ padding: mob ? 9 : "11px 13px", border: `1px dashed ${deposited ? t.acc : t.tx3}`, borderRadius: 5, opacity: deposited ? 1 : 0.35, transition: "all 0.4s" }}>
            <p style={{ fontFamily: M, fontSize: mob ? 11.5 : 13, color: deposited ? t.acc : t.tx3, margin: 0 }}>250 USDC + 1 NFT</p>
            <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "4px 0 0" }}>collateral · locked</p>
          </div>
        </div>
        <div style={{ position: "relative", minWidth: mob ? 44 : 76, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 4, right: 4, height: 1, background: t.ruleStrong }} />
          {moving ? (
            <span
              style={{
                position: "absolute",
                left: `${pkgX}%`,
                transform: "translateX(-50%)",
                fontFamily: M,
                fontSize: 8.5,
                color: repaying ? t.ok : t.sig,
                background: t.bg,
                border: `1px solid ${repaying ? t.ok : t.sig}`,
                borderRadius: 3,
                padding: "2px 5px",
                whiteSpace: "nowrap",
                transition: "left 0.45s linear",
              }}
            >
              {repaying ? "repay →" : "← msg"}
            </span>
          ) : (
            <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontFamily: M, fontSize: 8.5, color: t.tx3, background: t.bg, padding: "2px 5px" }}>
              Router
            </span>
          )}
        </div>
        <div style={{ ...panel, padding: mob ? 12 : "16px 18px" }}>
          <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "0 0 12px", letterSpacing: "0.1em" }}>CHAIN B · Ethereum</p>
          <div style={{ padding: mob ? 9 : "11px 13px", border: `1px solid ${loaned ? t.ok : t.tx3}`, borderRadius: 5, opacity: loaned ? 1 : 0.35, transition: "all 0.4s" }}>
            <p style={{ fontFamily: M, fontSize: mob ? 11.5 : 13, color: loaned ? t.ok : t.tx3, margin: 0 }}>0.08 WETH</p>
            <p style={{ fontFamily: M, fontSize: 10, color: t.tx3, margin: "4px 0 0" }}>loan · released</p>
          </div>
        </div>
      </div>
    </div>
  );
};
