"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";

const M = "var(--font-mono)";
const A = "var(--font-display)";

const DAO_VOTERS: { id: string; rep: string; proofs: string; w: number; vote: "YES" | "NO" }[] = [
  { id: "0xD4…aF21", rep: "core dev · 2yr", proofs: "github + email", w: 9.0, vote: "YES" },
  { id: "0xA1…9c0E", rep: "verified contributor", proofs: "twitter + github", w: 8.4, vote: "YES" },
  { id: "0xB2…77dC", rep: "multisig signer", proofs: "email + github", w: 6.1, vote: "YES" },
  { id: "0xC3…01Ff", rep: "first-week wallet", proofs: "token only", w: 1.2, vote: "NO" },
];

// DAOScape — a vote weighted by reputation proven off-chain, not tokens held.
export const FigDao = ({ mob, active = true }: { mob: boolean; active?: boolean }) => {
  const t = useThemeTokens();
  const n = useTick(820, DAO_VOTERS.length + 4, active, DAO_VOTERS.length + 3);
  const shown = Math.min(n, DAO_VOTERS.length);
  let yes = 0;
  let no = 0;
  DAO_VOTERS.slice(0, shown).forEach((v) => {
    if (v.vote === "YES") yes += v.w;
    else no += v.w;
  });
  const total = yes + no || 1;
  const panel = { border: `1px solid ${t.rule}`, borderRadius: 6 };

  return (
    <div>
      <FigCaption left="fig. 1 — a vote weighted by reputation proven off-chain, not tokens held" right="proposal #07 · weighted tally" />
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {DAO_VOTERS.map((v, i) => {
          const vis = i < shown;
          const proven = vis && v.proofs !== "token only";
          return (
            <div
              key={v.id}
              style={{
                ...panel,
                display: "grid",
                gridTemplateColumns: mob ? "auto 1fr auto auto" : "104px 1fr auto auto",
                alignItems: "center",
                gap: mob ? 8 : 14,
                padding: mob ? "8px 10px" : "10px 14px",
                background: t.bg,
                opacity: vis ? 1 : 0.2,
                transition: "opacity 0.4s",
              }}
            >
              <span style={{ fontFamily: M, fontSize: mob ? 10.5 : 12.5, color: t.tx }}>{v.id}</span>
              {!mob ? (
                <span style={{ fontFamily: M, fontSize: 11, color: t.tx3 }}>
                  {v.rep}{" "}
                  <span style={{ color: proven ? t.ok : t.tx3 }}>
                    · {v.proofs}
                    {proven ? " ✓" : ""}
                  </span>
                </span>
              ) : (
                <span />
              )}
              <span style={{ fontFamily: A, fontSize: mob ? 16 : 20, color: v.w >= 5 ? t.sig : t.tx3, letterSpacing: "0.02em" }}>
                {v.w.toFixed(1)}
                <span style={{ fontSize: 10, color: t.tx3, fontFamily: M }}>×</span>
              </span>
              <span
                style={{
                  fontFamily: M,
                  fontSize: mob ? 9.5 : 11,
                  color: v.vote === "YES" ? t.ok : t.flag,
                  border: `1px solid ${v.vote === "YES" ? t.ok : t.flag}`,
                  borderRadius: 99,
                  padding: "2px 9px",
                }}
              >
                {v.vote}
              </span>
            </div>
          );
        })}
        <div style={{ display: "flex", height: 12, borderRadius: 99, overflow: "hidden", marginTop: 5, background: t.panel }}>
          <div style={{ width: `${(yes / total) * 100}%`, background: t.ok, transition: "width 0.5s" }} />
          <div style={{ width: `${(no / total) * 100}%`, background: t.flag, transition: "width 0.5s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: M, fontSize: 11 }}>
          <span style={{ color: t.ok }}>YES {yes.toFixed(1)}</span>
          <span style={{ color: t.tx3 }}>vlayer web proofs · reputation-weighted</span>
          <span style={{ color: t.flag }}>NO {no.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
