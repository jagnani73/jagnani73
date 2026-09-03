import type { CaseDetail } from "@/utils/types/case.types";
import { FigTrident } from "@/components/canvas/figs/fig-trident";

export const tridentCase: CaseDetail = {
  seoDescription:
    "A multi-strategy USDC yield vault on Solana: an off-chain bot moves capital between Drift lending, perp spread trades and basis capture every 30 seconds.",
  badge: "MULTI-STRATEGY VAULT · SOLANA · 2026",
  deck: (
    <>
      a USDC vault on Solana that moves capital between{" "}
      <span className="text-tx">lending, spread trades and basis capture</span>,
      every thirty seconds
    </>
  ),
  fig: {
    component: FigTrident,
    alt: "the SOL/ETH ratio z-scored against its rolling window, opening a pairs trade at ±2σ",
  },
  sections: {
    split: {
      note: "a lending-only vault is barely a vault",
      serif: (
        <>
          Drift&apos;s USDC pool pays six to eight percent, which is about the
          ceiling for anything a passive vault can safely promise.{" "}
          <span className="text-tx">
            Reach past it and you inherit the opposite problem: basis bleeds the
            moment funding flips, and a pure spread book is far too violent to
            hand passive capital.
          </span>
        </>
      ),
      body: "Trident composes three uncorrelated sources behind a single LP share. Lending is the floor, so capital is never sitting idle. A statistical pairs trade opens when the SOL/ETH or BTC/ETH oracle ratio sits two standard deviations off its rolling mean, on the bet that it converges back. Basis capture takes the paying side when funding runs past fifteen percent annualized. An off-chain bot re-scores all three on every tick and shifts the book between them. Built solo in one nineteen-hour session; the vault is live on Solana mainnet and was never funded.",
    },
    arch: {
      note: "five stages, one tick",
      body: (
        <>
          Every thirty seconds, one process walks five stages.{" "}
          <strong className="font-semibold text-tx">Drift</strong> on-chain
          state becomes immutable snapshots, risk holds a veto over everything
          downstream, the allocator is a pure function that only proposes, and
          nothing but the executor is allowed to touch{" "}
          <strong className="font-semibold text-tx">Voltr</strong>, the vault
          program the whole thing is deployed inside.
        </>
      ),
      flow: [
        {
          stage: "COLLECT",
          role: "funding rates and oracle prices for three perps, snapshotted every tick",
          tech: ["Drift SDK", "BulkAccountLoader", "Postgres"],
        },
        {
          stage: "DETECT",
          role: "z-score the pair ratio against a 2880-point window; annualize funding",
          tech: ["SpreadDetector", "FundingMonitor"],
        },
        {
          stage: "GATE",
          role: "drawdown, stop-loss, position age and allocation caps, with a veto",
          tech: ["RiskManager"],
        },
        {
          stage: "ALLOCATE",
          role: "signals and risk into typed proposals; touches no chain",
          tech: ["CapitalAllocator"],
        },
        {
          stage: "EXECUTE",
          role: "proposals into perp orders and vault strategy deposits",
          tech: ["VersionedTransaction", "Voltr SDK"],
        },
      ],
      stack:
        "TypeScript · Python · Solana · Drift · Voltr · PostgreSQL · Drizzle · Next.js",
    },
    cards: {
      note: "the plumbing nobody sees",
      intro: (
        <>
          Composing the strategies was the easy half. What actually took the day
          sat underneath: an adaptor interface with no documentation, an SDK
          that would not load, and a bot that had to be stopped from spending
          money it did not have. All of it runs behind{" "}
          <span className="font-mono text-sig">DRY_RUN</span>:
        </>
      ),
      cards: [
        {
          name: "accounts nobody documents",
          desc: "depositing through the vault means handing the adaptor eight accounts in an exact order, several of them PDAs derived by hand from seed strings and little-endian byte widths; get one wrong and it fails on-chain with nothing useful in the log",
        },
        {
          name: "tokens live at the PDA",
          desc: "Drift keeps spot-market tokens directly at the vault authority instead of an associated token account, so the ATA slot takes the authority itself; nothing says so anywhere, it had to be found by failing",
        },
        {
          name: "an SDK that would not load",
          desc: "the Drift SDK pulls a gRPC binding with no Windows binary, so a require hook intercepts the resolve and hands back a stub; safe only because BulkAccountLoader polls over HTTP and the gRPC path is never taken",
        },
        {
          name: "two gates, not one",
          desc: "execution is gated by capability rather than a single flag, so an unfunded Drift account cannot burn SOL on doomed transactions while vault operations stay separately blocked",
        },
        {
          name: "degrade, do not fail",
          desc: "the dashboard reads a database snapshot first and overlays live vault and Drift data only when they answer, and says on screen when what you are looking at is cached",
        },
      ],
    },
    stats: {
      note: "deployed, never funded",
      stats: [
        ["19", "hours, first commit to last"],
        ["3", "strategies behind one LP share"],
        ["2880", "point window: 24 hours at a 30-second tick"],
        ["8", "accounts, in exact order, or the deposit fails"],
      ],
    },
    plates: {
      note: "the manager's view, on seeded data",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1788433910/jagnani73/projects/trident/Screenshot_2026-09-03_190956_ge0yfa.png",
          cap: "what the bot is looking at: SOL/ETH and BTC/ETH z-scored against the ±2σ entry lines, funding APR per market, and the cache banner up because live Drift was unavailable",
          fit: "contain",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1788433911/jagnani73/projects/trident/Screenshot_2026-09-03_191029_gve1ei.png",
          cap: "every position carries the reason it closed: target_hit, stop_loss, max_age, funding_flip",
          fit: "contain",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1788433910/jagnani73/projects/trident/Screenshot_2026-09-03_191137_bjpuaq.png",
          cap: "allocation moving across lending, spread, basis and idle. the APY panels render seeded data: the bot never wrote a return it earned",
          fit: "contain",
        },
        {
          kind: "code",
          code: `// @drift-labs/sdk pulls @triton-one/yellowstone-grpc, which ships no
// Windows binary. We never use gRPC: BulkAccountLoader polls over HTTP.
Module._resolveFilename = function (request, parent, isMain, options) {
    if (request.includes("yellowstone-grpc-napi")) {
        return __filename; // resolve to this stub file
    }
    return originalResolveFilename.call(this, request, parent, isMain, options);
};`,
          cap: "keeping the SDK alive on the wrong operating system",
        },
      ],
      cta: {
        label: "view the vault on-chain",
        href: "https://solscan.io/account/6w7SPiB9agGh5ctB1LWMAR9ZpnguDxYm5zGgQS71B7sw",
      },
    },
  },
};
