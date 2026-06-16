// Internal types for the case figs (components/canvas/figs/*).

// ── fig-agent-graph ──
export type NodeKind = "io" | "agent" | "tool";
export interface AgNode {
  /** desktop x% (long labels need wider gaps) */
  x: number;
  /** mobile x% — evenly spaced + inset so boxes don't clip on a narrow panel */
  mx: number;
  y: number;
  label: string;
  short: string;
  kind: NodeKind;
}

// Token color keys, imported `as C` by the figs that use them.
export type FigAccent = "sig" | "acc" | "ok"; // fig-kit, fig-ledger
export type JournalColor = "flag" | "tx2" | "acc" | "ok"; // fig-journal
