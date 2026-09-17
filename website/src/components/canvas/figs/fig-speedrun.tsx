"use client";

import type { CSSProperties, ReactNode } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_DIM,
  FIG_EASE,
  FIG_HOLD,
  FIG_TRACK,
  MONO as M,
  figBox,
  figH,
  figPanel,
  figType,
} from "./fig-style";
import type { ThemeTokens } from "@/utils/types/theme.types";

// Each: a plain prompt → the files SpeedRun scaffolds → the app, running in-browser.
const EXAMPLES = [
  {
    key: "gas",
    prompt: "an ETH gas calculator in CAD",
    tag: "<GasCalc/>",
    files: ["app/page.tsx", "components/GasCalc.tsx", "lib/goldrush.ts"],
  },
  {
    key: "board",
    prompt: "a wallet PnL leaderboard for my group",
    tag: "<Leaderboard/>",
    files: ["app/page.tsx", "components/Board.tsx", "lib/goldrush.ts"],
  },
  {
    key: "tweet",
    prompt: "a tweet generator for my project",
    tag: "<TweetGen/>",
    files: ["app/page.tsx", "components/TweetGen.tsx", "lib/ai.ts"],
  },
  {
    key: "token",
    prompt: "launch a token for my app",
    tag: "clanker.deploy()",
    files: ["app/launch.tsx", "components/Token.tsx", "lib/clanker.ts"],
  },
] as const;

// 0 prompt · 1-3 files · 4 dev server ready · 5 preview, then the hold.
const PREVIEW_AT = 5;
const PER = PREVIEW_AT + FIG_HOLD;

const Preview = ({
  k,
  t,
  mob,
}: {
  k: (typeof EXAMPLES)[number]["key"];
  t: ThemeTokens;
  mob: boolean;
}): ReactNode => {
  const body = figType("body", mob);
  const sub = figType("sub", mob);
  const head = {
    margin: 0,
    fontFamily: M,
    fontSize: body,
    color: t.tx,
  } as const;
  const muted = { fontFamily: M, fontSize: sub, color: t.tx3 } as const;
  const pill = {
    alignSelf: "flex-start",
    fontFamily: M,
    fontSize: sub,
    color: t.bg,
    background: t.sig,
    borderRadius: 6,
    padding: "4px 10px",
  } as const;

  if (k === "gas") {
    return (
      <>
        <p style={head}>ETH Gas Calculator</p>
        <span style={muted}>transfer · 21,000 gas</span>
        <span
          style={{
            fontFamily: M,
            fontSize: figType("display", mob),
            color: t.acc,
          }}
        >
          ≈ $0.42
        </span>
        <span style={muted}>live base fee · GoldRush</span>
      </>
    );
  }

  if (k === "board") {
    const rows: [string, string, string][] = [
      ["1", "0x4f2…a91", "+$12.4k"],
      ["2", "0x9c4…f0b", "+$8.1k"],
      ["3", "vitalik.eth", "+$5.7k"],
    ];
    return (
      <>
        <p style={head}>Wallet PnL · Top 3</p>
        {rows.map(([r, a, v]) => (
          <div
            key={r}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontFamily: M,
              fontSize: body,
            }}
          >
            <span style={{ color: t.tx3, width: 10 }}>{r}</span>
            <span
              style={{
                color: t.tx2,
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {a}
            </span>
            <span style={{ color: t.ok }}>{v}</span>
          </div>
        ))}
      </>
    );
  }

  if (k === "token") {
    const rows: [string, string][] = [
      ["ticker", "$GM"],
      ["supply", "1,000,000,000"],
      ["chain", "Base · Clanker"],
    ];
    return (
      <>
        <p style={head}>Tokenize · gm-streaks</p>
        {rows.map(([a, b]) => (
          <div
            key={a}
            style={{ display: "flex", gap: 9, fontFamily: M, fontSize: body }}
          >
            <span style={{ color: t.tx3, width: mob ? 46 : 56 }}>{a}</span>
            <span style={{ color: t.tx2 }}>{b}</span>
          </div>
        ))}
        <span style={{ fontFamily: M, fontSize: sub, color: t.ok }}>
          ✓ deployed · 0x9c4…f0b
        </span>
      </>
    );
  }

  return (
    <>
      <p style={head}>Tweet Generator</p>
      <span style={muted}>topic: mainnet is live</span>
      <span
        style={{
          fontFamily: M,
          fontSize: body,
          color: t.tx2,
          lineHeight: 1.5,
          borderLeft: `2px solid ${t.sig}`,
          paddingLeft: 8,
        }}
      >
        gm, mainnet is live. ship something onchain today.
      </span>
      <span style={pill}>Generate ↻</span>
    </>
  );
};

// SpeedRun — a plain prompt becomes a running app, built and previewed in the browser.
export const FigSpeedRun = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const tick = useTick(
    FIG_BEAT.quick,
    EXAMPLES.length * PER,
    active,
    PREVIEW_AT,
  );
  const ex = EXAMPLES[Math.floor(tick / PER) % EXAMPLES.length];
  const step = tick % PER;

  const filesShown = Math.min(step, ex.files.length);
  const devReady = step >= ex.files.length + 1;
  const previewOn = step >= PREVIEW_AT;
  const body = figType("body", mob);
  const sub = figType("sub", mob);

  // Both cards change every beat, so they keep a fixed height at every width.
  const card: CSSProperties = {
    ...figPanel(t),
    height: figH(mob ? "md" : "lg", mob),
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };
  const label: CSSProperties = {
    margin: 0,
    fontFamily: M,
    fontSize: figType("label", mob),
    letterSpacing: FIG_TRACK,
  };

  return (
    <div>
      <FigCaption
        left="fig. 1: a plain prompt, built and running in the browser"
        right={ex.tag}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: mob ? 10 : 18,
          alignItems: "stretch",
        }}
      >
        {/* the build */}
        <div
          style={{
            ...card,
            padding: mob ? "12px 14px" : "15px 17px",
            gap: 9,
          }}
        >
          <p style={{ ...label, color: t.tx3 }}>SPEEDRUN · build</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span
              style={{
                fontFamily: M,
                fontSize: body,
                color: t.sig,
                flexShrink: 0,
              }}
            >
              ›
            </span>
            <span
              style={{
                fontFamily: M,
                fontSize: body,
                color: t.tx,
                lineHeight: 1.45,
              }}
            >
              &ldquo;{ex.prompt}&rdquo;
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              marginTop: 1,
            }}
          >
            {ex.files.map((f, i) => {
              const vis = i < filesShown;
              return (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: M,
                    fontSize: sub,
                    opacity: vis ? 1 : FIG_DIM,
                    transition: FIG_EASE,
                  }}
                >
                  <span style={{ color: t.ok }}>{vis ? "✓" : "·"}</span>
                  <span style={{ color: t.tx2 }}>{f}</span>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginTop: "auto",
              fontFamily: M,
              fontSize: sub,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: devReady ? t.ok : t.tx3,
                boxShadow: devReady ? `0 0 7px ${t.ok}` : "none",
                transition: FIG_EASE,
              }}
            />
            <span style={{ color: t.tx3 }}>
              {devReady
                ? "WebContainer · dev server ready"
                : "booting WebContainer…"}
            </span>
          </div>
        </div>

        {/* the running app */}
        <div style={{ ...card, padding: mob ? 12 : 14, gap: 8 }}>
          <p style={{ ...label, color: t.sig }}>PREVIEW · live in-browser</p>
          <div
            style={{
              ...figBox(t),
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              padding: mob ? 10 : 12,
              display: "flex",
              flexDirection: "column",
              gap: mob ? 5 : 9,
              justifyContent: "center",
            }}
          >
            {previewOn ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: mob ? 5 : 9,
                }}
              >
                <Preview k={ex.key} t={t} mob={mob} />
              </div>
            ) : (
              <span
                style={{
                  alignSelf: "center",
                  fontFamily: M,
                  fontSize: sub,
                  color: t.tx3,
                }}
              >
                compiling preview…
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
