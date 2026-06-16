"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";

const DW_MOVES: [number, "B" | "G"][] = [
  [3, "B"],
  [2, "G"],
  [4, "B"],
  [4, "G"],
  [5, "B"],
  [5, "G"],
  [6, "B"],
];
const DW_WIN: [number, number][] = [
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
];
const DW_PHASES: [string, string][] = [
  ["STAKE", "2 × 25 USDC locked on-chain"],
  ["PLAY", "server-enforced, move by move"],
  ["SETTLE", "the pot pays out on-chain"],
  ["ATTEST", "Proof-of-Victory · Sign Protocol"],
];

// Dewls — a self-playing Connect-4 wager: stake → play → settle → attest.
export const FigWager = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 15), 620);
    return () => clearInterval(id);
  }, [reduced, active]);

  const shownStep = reduced ? 13 : step;
  const applied = Math.max(0, Math.min(shownStep - 1, DW_MOVES.length));
  const phase = shownStep < 2 ? 0 : shownStep < 9 ? 1 : shownStep < 10 ? 2 : 3;

  const board: Record<string, "B" | "G"> = {};
  const heights = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < applied; i++) {
    const [col, who] = DW_MOVES[i];
    board[col + "," + heights[col]] = who;
    heights[col]++;
  }
  const isWin = (c: number, r: number) =>
    phase >= 2 && DW_WIN.some(([wc, wr]) => wc === c && wr === r);
  const cell = mob ? 20 : 26;
  const gap = 5;

  return (
    <div>
      <FigCaption
        left="fig. 1 — one wager, settled: stake → play → attest"
        right="connect 4 · 1v1 · winner takes the pot"
      />
      <div
        className="grid items-stretch"
        style={{
          gridTemplateColumns: mob ? "1fr" : "auto 1fr",
          gap: mob ? 14 : 28,
        }}
      >
        <div
          className="inline-grid rounded-md"
          style={{
            border: `1px solid ${t.rule}`,
            background: t.panel,
            padding: mob ? 12 : 16,
            gridTemplateColumns: `repeat(7, ${cell}px)`,
            gap,
            alignSelf: mob ? "center" : "auto",
            justifySelf: mob ? "center" : "auto",
          }}
        >
          {Array.from({ length: 6 }, (_, ri) => 5 - ri).map((r) =>
            Array.from({ length: 7 }, (_, c) => {
              const who = board[c + "," + r];
              const win = isWin(c, r) && who;
              const col =
                who === "B" ? t.sig : who === "G" ? t.acc : "transparent";
              return (
                <span
                  key={c + "," + r}
                  style={{
                    width: cell,
                    height: cell,
                    borderRadius: "50%",
                    background: col,
                    border: who ? "none" : `1px solid ${t.ruleStrong}`,
                    boxSizing: "border-box",
                    transform: who ? "scale(1)" : "scale(0.92)",
                    boxShadow: win ? `0 0 12px ${t.sig}cc` : "none",
                    outline: win ? `2px solid ${t.tx}` : "none",
                    outlineOffset: 1,
                    transition: "background 0.25s, box-shadow 0.3s",
                  }}
                />
              );
            }),
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-2">
          <div
            className="overflow-hidden text-ellipsis whitespace-nowrap font-mono"
            style={{ fontSize: mob ? 10.5 : 12, color: t.tx2 }}
          >
            <span style={{ color: t.sig }}>0x4f2…a91</span> · 25 USDC&nbsp;&nbsp;⇄
            &nbsp;&nbsp;<span style={{ color: t.acc }}>0x7c2…d04</span> · 25 USDC —{" "}
            <span style={{ color: t.tx }}>pot locked</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {DW_PHASES.map(([name, desc], i) => {
              const on = phase === i;
              const col = i === 3 ? t.acc : t.sig;
              return (
                <div
                  key={name}
                  className="min-w-0 rounded-[5px]"
                  style={{
                    border: `1px solid ${on ? col : t.rule}`,
                    background: t.panel,
                    padding: "9px 10px",
                    transition: "border-color 0.3s",
                  }}
                >
                  <p
                    className="m-0 font-mono text-[11.5px] tracking-[0.08em]"
                    style={{ color: on ? col : t.tx3 }}
                  >
                    {name}
                  </p>
                  {!mob ? (
                    <p
                      className="m-0 mt-[5px] font-mono text-[10.5px] leading-[1.5]"
                      style={{
                        color: on ? t.tx2 : t.tx3,
                        transition: "color 0.3s",
                      }}
                    >
                      {desc}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div
            className="overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] font-mono"
            style={{
              border: `1px solid ${phase === 3 ? t.acc : t.rule}`,
              padding: "9px 12px",
              fontSize: mob ? 10.5 : 12,
              color: phase === 3 ? t.acc : t.tx3,
              transition: "all 0.4s",
            }}
          >
            {phase === 3
              ? "PROOF-OF-VICTORY #1042 — signed via Sign Protocol ✓"
              : "awaiting result…"}
          </div>
        </div>
      </div>
    </div>
  );
};
