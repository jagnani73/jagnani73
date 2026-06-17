import type { CaseDetail } from "@/utils/types/case.types";
import { FigTunnel } from "@/components/canvas/figs/fig-tunnel";

export const claudeControllerCase: CaseDetail = {
  seoDescription:
    "Run Claude Code from your phone over your own private, encrypted tunnel — your credits, your machine, no cloud. A control plane, not a chat relay.",
  badge: "OPEN SOURCE · 2026",
  deck: (
    <>
      run Claude Code from your phone — over your own private, encrypted tunnel.{" "}
      <span className="text-tx">your credits, your machine, no cloud.</span>
    </>
  ),
  fig: FigTunnel,
  figAlt: "your phone drives the real Claude Code CLI over an encrypted tunnel",
  sections: {
    split: {
      title: "THE IDEA",
      note: "a control plane, not a chat relay",
      serif: (
        <>
          Claude Code&apos;s built-in remote is a chat relay — you can read
          along, but you can&apos;t{" "}
          <span className="text-tx">
            approve a tool, switch modes, or drive a picker from your phone.
          </span>{" "}
          And anything cloud-hosted bills the paid API.
        </>
      ),
      body: "Claude Controller spawns the real Claude Code CLI on your own machine and relays it to a custom mobile PWA over a private Tailscale tunnel. From your phone you approve tool requests with one tap, switch model / effort / permission mode mid-run, send slash commands, answer pickers, and watch live status — all on your Max-plan credits. It never calls the paid API.",
    },
    arch: {
      title: "THE RELAY",
      note: "PTY · hooks · JSONL · WebSocket",
      body: "A terminal relay, not an API client. The backend spawns the CLI in a PTY and consumes two structured signals it already emits — blocking HTTP hooks for approvals and pickers, and the transcript JSONL for content — normalizing both into a per-session bus forwarded over WebSocket. Transport (encryption, TLS, device auth) is delegated to Tailscale and Caddy.",
      flow: [
        {
          stage: "PHONE · PWA",
          role: "React 19 PWA renders message cards and sends taps over WSS",
          tech: ["Vite", "Tailwind 4"],
        },
        {
          stage: "TAILSCALE + CADDY",
          role: "WireGuard tunnel + TLS, bound to the tailnet IP only",
          tech: ["WireGuard", "Let's Encrypt"],
        },
        {
          stage: "BACKEND",
          role: "spawns the CLI in a PTY; loopback hooks + JSONL tail → SessionBus",
          tech: ["node-pty", "ws"],
        },
        {
          stage: "CLAUDE CODE CLI",
          role: "the real CLI on your machine, on Max-plan credits",
          tech: ["no API"],
        },
      ],
      stack:
        "TypeScript monorepo · React 19 · Vite · Tailwind 4 · Node · node-pty · ws · Tailscale · Caddy",
    },
    cards: {
      note: "the CLI was built for a human at a terminal",
      intro: (
        <>
          Most of the protocol is clean structured data. The friction is
          everywhere the CLI is interactive — built for a person at a keyboard,
          not a phone:
        </>
      ),
      cards: [
        {
          name: "terminal relay, no API",
          desc: "the CLI runs in a PTY; all content comes from blocking hooks + the JSONL transcript — never screen-scraping, never a paid API call",
        },
        {
          name: "driving ink pickers",
          desc: "AskUserQuestion and plan-mode are interactive pickers — shown as tappable cards, then driven over the PTY with timed keystrokes reverse-engineered from the CLI source",
        },
        {
          name: "statusline IPC",
          desc: "statusLine isn't HTTP-hookable, so the CLI runs a committed dump script that writes its payload to disk; the session watches it for live model, context, and cost",
        },
        {
          name: "confirmed input",
          desc: "prompts go as bracketed paste with the submit sent separately and confirmed against the transcript — a trailing newline coalesced into a big paste gets dropped",
        },
      ],
    },
    stats: {
      note: "your machine, your credits",
      stats: [
        ["0", "calls to the paid API — your Max-plan credits"],
        ["1-tap", "tool approvals, mid-session"],
        ["loopback", "backend binds 127.0.0.1 — Caddy alone faces the tailnet"],
        ["MIT", "open source"],
      ],
    },
    plates: {
      note: "the PWA, on a phone",
      plates: [
        {
          kind: "img",
          src: `https://res.cloudinary.com/jagnani73/image/upload/v1781545428/jagnani73/projects/claude-controller/Screenshot_2026-06-15_231011_wwkzai.png`,
          cap: "spawn a session — model, effort, and permission mode, scoped to a project",
          fit: "contain",
        },
        {
          kind: "img",
          src: `https://res.cloudinary.com/jagnani73/image/upload/v1781545428/jagnani73/projects/claude-controller/Screenshot_2026-06-15_231107_vpd2ys.png`,
          cap: "a live session on the phone — tool calls, results, and the running statusline",
        },
        {
          kind: "img",
          src: `https://res.cloudinary.com/jagnani73/image/upload/v1781545430/jagnani73/projects/claude-controller/Screenshot_2026-06-15_231314_n7gkay.png`,
          cap: "the AskUserQuestion relay — the CLI's ink picker rendered as a tappable card",
        },
        {
          kind: "img",
          src: `https://res.cloudinary.com/jagnani73/image/upload/v1781545428/jagnani73/projects/claude-controller/Screenshot_2026-06-15_231231_vg3qid.png`,
          cap: "plan approval — approve with auto-accept, approve manually, or keep planning",
        },
      ],
      cta: {
        label: "view the source ↗",
        href: "https://github.com/jagnani73/claude-controller",
      },
    },
  },
};
