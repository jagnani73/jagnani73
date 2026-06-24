"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";
import type { AgNode } from "@/utils/types/fig.types";

const AG_NODES: Record<string, AgNode> = {
  input: { x: 6, mx: 8, y: 50, label: "goal in", short: "goal", kind: "io" },
  planner: {
    x: 23,
    mx: 24,
    y: 50,
    label: "AGENT · planner",
    short: "planner",
    kind: "agent",
  },
  router: {
    x: 43,
    mx: 40,
    y: 50,
    label: "AGENT · router",
    short: "router",
    kind: "agent",
  },
  t1: {
    x: 64,
    mx: 56,
    y: 16,
    label: "TASK AGENT · 1",
    short: "task 1",
    kind: "tool",
  },
  t2: {
    x: 64,
    mx: 56,
    y: 50,
    label: "TASK AGENT · 2",
    short: "task 2",
    kind: "tool",
  },
  t3: {
    x: 64,
    mx: 56,
    y: 84,
    label: "TASK AGENT · 3",
    short: "task 3",
    kind: "tool",
  },
  endgame: {
    x: 83,
    mx: 72,
    y: 50,
    label: "AGENT · endgame",
    short: "endgame",
    kind: "agent",
  },
  output: {
    x: 95,
    mx: 88,
    y: 50,
    label: "answer",
    short: "answer",
    kind: "io",
  },
};
const AG_EDGES: [string, string][] = [
  ["input", "planner"],
  ["planner", "router"],
  ["router", "t1"],
  ["router", "t2"],
  ["router", "t3"],
  ["t1", "endgame"],
  ["t2", "endgame"],
  ["t3", "endgame"],
  ["endgame", "output"],
];
const AG_SEQ = [
  "input",
  "planner",
  "router",
  "t1",
  "router",
  "t2",
  "router",
  "t3",
  "endgame",
  "output",
];

// AI Agent SDK — zee.run() trace: planner → router → task agents → endgame.
export const FigAgentGraph = ({
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
    const id = setInterval(
      () => setStep((s) => (s + 1) % (AG_SEQ.length + 2)),
      800,
    );
    return () => clearInterval(id);
  }, [reduced, active]);

  const shownStep = reduced ? AG_SEQ.length - 1 : step;
  const idx = Math.min(shownStep, AG_SEQ.length - 1);
  const activeNode = AG_SEQ[idx];
  const prev = shownStep > 0 ? AG_SEQ[idx - 1] : null;
  const isActiveEdge = (a: string, b: string) =>
    !!prev &&
    ((a === prev && b === activeNode) || (a === activeNode && b === prev));
  const visited = new Set(
    AG_SEQ.slice(0, Math.min(shownStep + 1, AG_SEQ.length)),
  );
  const nx = (n: AgNode) => (mob ? n.mx : n.x);

  return (
    <div>
      <FigCaption
        left="fig. 1: zee.run(): the planner breaks the goal into tasks, the router assigns them, the endgame concludes"
        right="live trace"
      />
      <div
        className="relative overflow-hidden rounded-md"
        style={{
          height: mob ? 190 : 220,
          border: `1px solid ${t.rule}`,
          background: t.panel,
        }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          {AG_EDGES.map(([a, b]) => {
            const A = AG_NODES[a];
            const B = AG_NODES[b];
            const hot = isActiveEdge(a, b);
            return (
              <line
                key={a + b}
                x1={nx(A) + "%"}
                y1={A.y + "%"}
                x2={nx(B) + "%"}
                y2={B.y + "%"}
                stroke={hot ? t.sig : t.ruleStrong}
                strokeWidth={hot ? 1.6 : 1}
                strokeDasharray={hot ? "5 4" : "none"}
                style={
                  hot ? { animation: "agDash 0.5s linear infinite" } : undefined
                }
              />
            );
          })}
        </svg>
        {Object.entries(AG_NODES).map(([id, n]) => {
          const on = id === activeNode;
          const seen = visited.has(id);
          const col =
            n.kind === "tool" ? t.acc : n.kind === "agent" ? t.sig : t.tx2;
          return (
            <span
              key={id}
              className="absolute whitespace-nowrap rounded font-mono"
              style={{
                left: nx(n) + "%",
                top: n.y + "%",
                transform: "translate(-50%, -50%)",
                fontSize: mob ? 8.5 : 12,
                padding: mob ? "3px 5px" : "7px 12px",
                background: t.bg,
                border: `1px solid ${on ? col : seen ? col + "66" : t.ruleStrong}`,
                color: on ? t.tx : seen ? col : t.tx3,
                boxShadow: on ? `0 0 14px ${col}55` : "none",
                transition: "all 0.25s",
              }}
            >
              {mob ? n.short : n.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};
