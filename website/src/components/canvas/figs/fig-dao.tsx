"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_DIM,
  FIG_EASE,
  FIG_HOLD,
  MONO as M,
  figBox,
  figH,
  figPanel,
  figTone,
  figType,
} from "./fig-style";

const DAO_VOTERS: {
  id: string;
  rep: string;
  proofs: string;
  w: number;
  vote: "YES" | "NO";
}[] = [
  {
    id: "0xD4…aF21",
    rep: "core dev · 2yr",
    proofs: "github + email",
    w: 9.0,
    vote: "YES",
  },
  {
    id: "0xA1…9c0E",
    rep: "verified contributor",
    proofs: "twitter + github",
    w: 8.4,
    vote: "YES",
  },
  {
    id: "0xB2…77dC",
    rep: "multisig signer",
    proofs: "email + github",
    w: 6.1,
    vote: "YES",
  },
  {
    id: "0xC3…01Ff",
    rep: "first-week wallet",
    proofs: "token only",
    w: 1.2,
    vote: "NO",
  },
];

// DAOScape — vote weighted by off-chain reputation, not tokens held.
export const FigDao = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(
    FIG_BEAT.base,
    DAO_VOTERS.length + FIG_HOLD,
    active,
    DAO_VOTERS.length,
  );
  const shown = Math.min(n, DAO_VOTERS.length);
  let yes = 0;
  let no = 0;
  DAO_VOTERS.slice(0, shown).forEach((v) => {
    if (v.vote === "YES") yes += v.w;
    else no += v.w;
  });
  const total = yes + no || 1;
  const sub = figType("sub", mob);
  const ok = figTone(t, "ok");
  const refused = figTone(t, "refused");

  return (
    <div>
      <FigCaption
        left="fig. 1: a vote weighted by reputation proven off-chain, not tokens held"
        right="proposal #07 · weighted tally"
      />
      <div
        style={{
          ...figPanel(t),
          height: figH("lg", mob),
          overflow: "hidden",
          padding: mob ? 10 : "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {DAO_VOTERS.map((v, i) => {
          const vis = i < shown;
          const proven = vis && v.proofs !== "token only";
          const tone = v.vote === "YES" ? ok : refused;
          return (
            <div
              key={v.id}
              style={{
                ...figBox(t),
                display: "grid",
                gridTemplateColumns: mob
                  ? "auto 1fr auto auto"
                  : "104px 1fr auto auto",
                alignItems: "center",
                gap: mob ? 8 : 14,
                padding: mob ? "7px 10px" : "8px 14px",
                flexShrink: 0,
                opacity: vis ? 1 : FIG_DIM,
                transition: FIG_EASE,
              }}
            >
              <span
                style={{
                  fontFamily: M,
                  fontSize: figType("body", mob),
                  color: t.tx,
                }}
              >
                {v.id}
              </span>
              {!mob ? (
                <span
                  style={{
                    fontFamily: M,
                    fontSize: sub,
                    color: t.tx3,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.rep}{" "}
                  <span style={{ color: proven ? ok : t.tx3 }}>
                    · {v.proofs}
                    {proven ? " ✓" : ""}
                  </span>
                </span>
              ) : (
                <span />
              )}
              <span
                style={{
                  fontFamily: M,
                  fontSize: figType("title", mob),
                  color: v.w >= 5 ? t.sig : t.tx3,
                }}
              >
                {v.w.toFixed(1)}
                <span style={{ fontSize: figType("label", mob), color: t.tx3 }}>
                  ×
                </span>
              </span>
              <span
                style={{
                  fontFamily: M,
                  fontSize: sub,
                  color: tone,
                  border: `1px solid ${tone}`,
                  borderRadius: 99,
                  padding: "1px 9px",
                }}
              >
                {v.vote}
              </span>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            height: 10,
            flexShrink: 0,
            borderRadius: 99,
            overflow: "hidden",
            background: t.bg,
          }}
        >
          <div
            style={{
              width: `${(yes / total) * 100}%`,
              background: ok,
              transition: FIG_EASE,
            }}
          />
          <div
            style={{
              width: `${(no / total) * 100}%`,
              background: refused,
              transition: FIG_EASE,
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          marginTop: 8,
          fontFamily: M,
          fontSize: sub,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: ok }}>YES {yes.toFixed(1)}</span>
        <span
          style={{
            color: t.tx3,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          vlayer web proofs · reputation-weighted
        </span>
        <span style={{ color: refused }}>NO {no.toFixed(1)}</span>
      </div>
    </div>
  );
};
