import type { CaseDetail } from "@/utils/types/case.types";
import { FigSpeedRun } from "@/components/canvas/figs/fig-speedrun";

export const speedrunCase: CaseDetail = {
  seoDescription:
    "SpeedRun — Covalent's prompt-to-earn platform. Describe an app, an AI builds and runs it in your browser, ship it onchain, and earn rewards and token launches.",
  badge: "PRODUCT · COVALENT · 2025",
  deck: (
    <>
      prompt-to-earn — describe an onchain app,{" "}
      <span className="text-tx">
        the AI builds and runs it in your browser,
      </span>{" "}
      then you ship it and earn
    </>
  ),
  fig: {
    component: FigSpeedRun,
    alt: "a plain prompt becomes a running app, built and previewed live in the browser",
  },
  sections: {
    split: {
      title: "THE IDEA",
      note: "onchain apps as content, not companies",
      serif: (
        <>
          Shipping an onchain app meant a Solidity team, a frontend squad, and
          indexing infra —{" "}
          <span className="text-tx">
            so most ideas never made it past the group chat.
          </span>
        </>
      ),
      body: "SpeedRun is Covalent's prompt-to-earn platform: describe an app in plain language and an AI agent writes the code and runs it live in your browser, then deploys it onchain, wires in a wallet, and can launch a token — all in one flow. Usage turns into XP, leaderboard rank, and $CXT rewards, so building and remixing apps becomes social rather than solitary.",
    },
    arch: {
      title: "THE PLATFORM",
      note: "WebContainers · wallet · LLM · token launches",
      body: (
        <>
          The builder runs entirely client-side — a fork of StackBlitz&apos;s
          open-source{" "}
          <strong className="font-semibold text-tx">bolt.new</strong>, the
          in-browser AI dev agent, where the model writes code and a full dev
          server boots inside a{" "}
          <strong className="font-semibold text-tx">
            StackBlitz WebContainer
          </strong>
          , with no per-user server sandbox. Around that core, every generated
          app is wallet-aware on Base and reads live chain data through{" "}
          <strong className="font-semibold text-tx">GoldRush</strong>; model
          calls route through OpenRouter, token launches run on Clanker, and
          finished apps deploy to Vercel.
        </>
      ),
      flow: [
        {
          stage: "PROMPT",
          role: "a plain-language idea becomes a plan and code",
          tech: ["OpenRouter", "AI SDK"],
        },
        {
          stage: "BUILD",
          role: "the code runs with a live preview, in the browser",
          tech: ["WebContainers", "Vite"],
        },
        {
          stage: "SHIP",
          role: "deploy the app onchain, optionally launch a token",
          tech: ["Vercel", "Clanker"],
        },
        {
          stage: "EARN",
          role: "usage feeds XP, the leaderboard, and rewards",
          tech: ["GoldRush", "$CXT"],
        },
      ],
      stack:
        "Remix · Vite · WebContainers · wagmi · Reown AppKit · OpenRouter · GoldRush · Clanker · x402 · Supabase · Vercel",
    },
    cards: {
      note: "a chat model can't ship onchain",
      intro: (
        <>
          Turning a one-line prompt into a deployed, wallet-aware onchain app
          meant closing the gaps a chat model leaves behind:
        </>
      ),
      cards: [
        {
          name: "in-browser builds",
          desc: "WebContainers run the AI's code and a live dev server client-side — no server sandbox to provision per user",
        },
        {
          name: "wallet-aware by default",
          desc: "every generated app inherits wallet connect on Base and live onchain reads through GoldRush",
        },
        {
          name: "one-click token launches",
          desc: "Clanker turns an app into a token launch with reward flows — no Solidity required",
        },
        {
          name: "a prompt-to-earn loop",
          desc: "XP, leaderboards, and $CXT rewards make shipping and remixing apps social, not solitary",
        },
      ],
    },
    stats: {
      note: "month one",
      stats: [
        ["1k+", "active users"],
        ["150", "token launches, month one"],
        ["200+", "chains of GoldRush data"],
        ["$CXT", "prompt-to-earn rewards"],
      ],
    },
    plates: {
      note: "the dashboard",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1781683522/jagnani73/projects/speedrun/speedrun-screenshot-3-1_ssadpf.png",
          cap: "the create surface — prompt, recent tasks, templates",
          fit: "contain",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1781683522/jagnani73/projects/speedrun/speedrun-screenshot-3-2_cuqjjn.png",
          cap: "recent apps and token launches",
          fit: "contain",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1781683523/jagnani73/projects/speedrun/speedrun-screenshot-3-3_cqzf0g.png",
          cap: "the activity dashboard — users, apps, tokens, and XP",
          fit: "contain",
        },
      ],
      cta: {
        label: "read the launch ↗",
        href: "https://www.covalenthq.com/blog/introducing-speedrun-a-covalent-prompt-to-earn-platform-for-onchain-builders/",
      },
    },
  },
};
