"use client";

import type { ReactNode } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import { MONO as M, figPanel } from "./fig-style";
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

const PER = 7; // 0 prompt · 1-3 files · 4 dev-ready · 5-6 preview (hold)

const Preview = ({
  k,
  t,
  mob,
}: {
  k: (typeof EXAMPLES)[number]["key"];
  t: ThemeTokens;
  mob: boolean;
}): ReactNode => {
  const sz = mob ? 11 : 12;
  const head = { margin: 0, fontFamily: M, fontSize: sz, color: t.tx } as const;
  const muted = {
    fontFamily: M,
    fontSize: mob ? 10 : 11,
    color: t.tx3,
  } as const;
  const pill = {
    alignSelf: "flex-start",
    fontFamily: M,
    fontSize: mob ? 10 : 11,
    color: t.bg,
    background: t.sig,
    borderRadius: 5,
    padding: "4px 10px",
  } as const;

  if (k === "gas") {
    return (
      <>
        <p style={head}>ETH Gas Calculator</p>
        <span style={muted}>transfer · 21,000 gas</span>
        <span style={{ fontFamily: M, fontSize: mob ? 19 : 22, color: t.acc }}>
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
              fontSize: sz,
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
            style={{ display: "flex", gap: 9, fontFamily: M, fontSize: sz }}
          >
            <span style={{ color: t.tx3, width: mob ? 46 : 56 }}>{a}</span>
            <span style={{ color: t.tx2 }}>{b}</span>
          </div>
        ))}
        <span style={{ fontFamily: M, fontSize: mob ? 10 : 11, color: t.ok }}>
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
          fontSize: sz,
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
  const tick = useTick(620, EXAMPLES.length * PER, active, 5);
  const ex = EXAMPLES[Math.floor(tick / PER) % EXAMPLES.length];
  const step = tick % PER;

  const filesShown = Math.min(step, ex.files.length);
  const devReady = step >= ex.files.length + 1;
  const previewOn = step >= PER - 2;

  const panel = figPanel(t);
  const label = mob ? 10 : 10.5;
  const code = mob ? 11 : 12;

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
            ...panel,
            padding: mob ? "12px 14px" : "15px 17px",
            height: mob ? 158 : 196,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: M,
              fontSize: label,
              color: t.tx3,
              letterSpacing: "0.1em",
            }}
          >
            SPEEDRUN · build
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span
              style={{
                fontFamily: M,
                fontSize: code,
                color: t.sig,
                flexShrink: 0,
              }}
            >
              ›
            </span>
            <span
              style={{
                fontFamily: M,
                fontSize: code,
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
                    fontSize: mob ? 10.5 : 11.5,
                    opacity: vis ? 1 : 0.15,
                    transition: "opacity 0.3s",
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
              fontSize: mob ? 10 : 11,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: devReady ? t.ok : t.tx3,
                boxShadow: devReady ? `0 0 7px ${t.ok}` : "none",
                transition: "background 0.3s",
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
        <div
          style={{
            ...panel,
            padding: mob ? 12 : 14,
            height: mob ? 158 : 196,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: M,
              fontSize: label,
              color: t.sig,
              letterSpacing: "0.1em",
            }}
          >
            PREVIEW · live in-browser
          </p>
          <div
            style={{
              flex: 1,
              border: `1px solid ${t.rule}`,
              borderRadius: 5,
              background: t.bg,
              padding: mob ? 12 : 14,
              display: "flex",
              flexDirection: "column",
              gap: mob ? 7 : 9,
              justifyContent: "center",
            }}
          >
            {previewOn ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: mob ? 7 : 9,
                  opacity: 1,
                  transition: "opacity 0.35s",
                }}
              >
                <Preview k={ex.key} t={t} mob={mob} />
              </div>
            ) : (
              <span
                style={{
                  alignSelf: "center",
                  fontFamily: M,
                  fontSize: mob ? 10.5 : 11.5,
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
