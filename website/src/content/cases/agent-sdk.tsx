import type { CaseDetail } from "@/utils/types/case.types";
import { FigAgentGraph } from "@/components/canvas/figs/fig-agent-graph";

const AGENT_SDK_CODE = `import { Agent, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";

const analyst = new Agent({
  name: "onchain-analyst",
  model: { provider: "OPEN_AI", name: "gpt-4o-mini" },
  description: "reads balances, transfers, and approvals",
  tools: { balances, transactions },
});

const zee = new ZeeWorkflow({
  description: "audit the wallet, then write the report",
  output: "a structured risk report",
  agents: { analyst, writer },
});

const result = await ZeeWorkflow.run(zee);`;

export const agentSdkCase: CaseDetail = {
  seoDescription:
    "The orchestration layer behind Covalent's Zero-Employee Enterprise — TypeScript agents that read chains, call tools, and hand work to each other. Open source.",
  badge: "OPEN SOURCE · 119★",
  deck: (
    <>
      the orchestration layer behind Covalent&apos;s{" "}
      <span className="text-tx">Zero-Employee Enterprise</span> — agents that
      read chains, call tools, and hand work to each other
    </>
  ),
  fig: { component: FigAgentGraph, alt: "zee.run(): the planner breaks the goal into tasks, the router assigns them, the endgame concludes" },
  sections: {
    split: {
      note: "everyone rebuilding the same glue",
      serif: (
        <>
          LLMs could finally reason about on-chain data — but{" "}
          <span className="text-tx">
            every team was hand-rolling the same fragile glue to let them act on
            it.
          </span>
        </>
      ),
      body: "ZEE — the Zero-Employee Enterprise — needed an orchestration layer where autonomous agents could interact with on-chain data, external tools, and each other, without each integration being bespoke. I built and shipped it as @covalenthq/ai-agent-sdk on npm — 119 stars, 56 forks, and 2,000+ downloads since its December 2024 launch.",
    },
    arch: {
      note: "three default agents around yours · TypeScript",
      body: (
        <>
          A <strong className="font-semibold text-tx">ZeeWorkflow</strong> wraps
          the task agents you define with three defaults. The{" "}
          <strong className="font-semibold text-tx">planner</strong> breaks the
          goal into dependency-ordered tasks; the{" "}
          <strong className="font-semibold text-tx">router</strong> assigns each
          task to the most suitable agent — and answers their follow-up questions
          mid-run with full context; the{" "}
          <strong className="font-semibold text-tx">endgame</strong> agent
          compiles everything into the final response. An action queue drives the
          whole run, capped at 50 iterations.
        </>
      ),
      flow: [
        {
          stage: "PLAN",
          role: "the goal becomes dependency-ordered tasks",
          tech: ["planner agent"],
        },
        {
          stage: "ASSIGN",
          role: "each task routed to the best-suited agent",
          tech: ["router agent"],
        },
        {
          stage: "ACT",
          role: "your agents complete tasks; follow-ups loop back through the router",
          tech: ["task agents", "tools"],
        },
        {
          stage: "CONCLUDE",
          role: "the full context, compiled into one answer",
          tech: ["endgame agent"],
        },
      ],
      stack:
        "TypeScript · Vercel AI SDK · OpenAI · Google · Anthropic · GoldRush API · npm",
    },
    cards: {
      title: "WHAT I SHIPPED",
      note: "core SDK · launch → v0.3.0",
      intro: (
        <>
          I built the core SDK package and led the architectural milestones from
          launch through <span className="font-mono text-sig">v0.3.0</span>:
        </>
      ),
      cards: [
        {
          name: "multimodal support",
          desc: "Gemini image analysis alongside text reasoning",
        },
        {
          name: "Vercel AI SDK migration",
          desc: "one layer for streaming + tool calls — killed a cross-provider tool-calling bug",
        },
        {
          name: "ZEE assignment refactor",
          desc: "the v0.3.0 agent-assignment model",
        },
        {
          name: "cza CLI",
          desc: "scaffold a new agent project in one command",
        },
      ],
    },
    plates: {
      note: "npm · github",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766567167/jagnani73/projects/ai-agent-sdk/68955376-450a-4c28-9ed6-3eb4b8f391bf.png",
          cap: "the SDK, announced",
        },
        {
          kind: "code",
          code: AGENT_SDK_CODE,
          cap: "a two-agent workflow, end to end",
        },
      ],
      cta: {
        label: "view the source",
        href: "https://github.com/covalenthq/ai-agent-sdk",
      },
    },
  },
};
