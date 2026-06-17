import type { CaseDetail } from "@/utils/types/case.types";
import { FigWager } from "@/components/canvas/figs/fig-wager";

export const dewlsCase: CaseDetail = {
  seoDescription:
    "On-chain arcade wagering — real stakes on 1v1 games, every win sealed as a Proof-of-Victory. Sign Protocol prize, ETHOnline 2024.",
  badge: "SIGN PROTOCOL PRIZE · ETHONLINE 2024",
  deck: (
    <>
      on-chain arcade wagering — real stakes on 1v1 games, every win sealed as a{" "}
      <span className="text-tx">Proof-of-Victory</span>
    </>
  ),
  fig: { component: FigWager, alt: "one wager, settled: stake, play, attest" },
  sections: {
    split: {
      note: "trust, removed from the referee",
      serif: (
        <>
          Online wagers run on trust: a server decides who won, and the money
          moves — or doesn&apos;t.{" "}
          <span className="text-tx">Dewls makes the outcome itself the receipt.</span>
        </>
      ),
      body: "Dewls is an arcade wagering platform: 1v1 games — Rock-Paper-Scissors, Connect 4 — with real stakes. Every match settles on-chain, and the winner earns a Proof-of-Victory: a cryptographic attestation signed via Sign Protocol that immutably records the result on a global leaderboard. Weekly seasons share a prize pool across the weekend's top three.",
    },
    arch: {
      note: "three chains · one server-enforced engine",
      body: (
        <>
          Settlement is deliberately multi-chain — contracts on{" "}
          <strong className="font-semibold text-tx">Morph L2</strong>,{" "}
          <strong className="font-semibold text-tx">Hedera</strong> (HSCS + HTS),
          and <strong className="font-semibold text-tx">Rootstock</strong> —
          while a single real-time engine enforces every rule server-side, so the
          client can never cheat.
        </>
      ),
      flow: [
        {
          stage: "AUTH",
          role: "one door for web2 and web3 players",
          tech: ["Web3Auth"],
        },
        {
          stage: "PLAY",
          role: "real-time 1v1, logic enforced server-side",
          tech: ["Socket.IO", "Redis"],
        },
        {
          stage: "SETTLE",
          role: "the wager pays out on-chain",
          tech: ["Morph L2", "Hedera", "Rootstock"],
        },
        {
          stage: "ATTEST",
          role: "Proof-of-Victory to the global leaderboard",
          tech: ["Sign Protocol", "XMTP notify"],
        },
      ],
      stack:
        "TypeScript · Next.js · Express · Socket.IO · Redis · Supabase · Web3Auth · XMTP · Sign Protocol",
    },
    cards: {
      note: "websocket state ⇄ on-chain finality",
      intro: (
        <>
          Real-time play, gated by chain finality — the game loop could only
          advance once the previous move was{" "}
          <span className="font-mono text-sig">cryptographically committed</span>:
        </>
      ),
      cards: [
        {
          name: "commit-gated turns",
          desc: "sequenced contract calls before the next move unlocks",
        },
        {
          name: "atomic game state",
          desc: "Redis locking keeps concurrent moves consistent",
        },
        {
          name: "server-side rules",
          desc: "no game logic trusted to the client",
        },
        {
          name: "HSCS deploys",
          desc: "undocumented bytecode upload errors, debugged low-level",
        },
      ],
    },
    plates: {
      note: "ETHOnline 2024",
      plates: [
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766566655/jagnani73/projects/dewls/daffe5d5-c9af-4149-a6cf-0d2cf6b1c7a5.png",
          cap: "the arcade",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766566746/jagnani73/projects/dewls/77c53c0a-d3a9-43fe-8451-e51184bbb6ea.png",
          cap: "a match, live",
        },
        {
          kind: "img",
          src: "https://res.cloudinary.com/jagnani73/image/upload/v1766566663/jagnani73/projects/dewls/c1db88c1-0e6c-4c33-8056-d3d7a41a96a0.png",
          cap: "proof-of-victory",
        },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766566622/jagnani73/projects/dewls/2008978b-b933-4627-8a14-24ecc66d65e7.png", cap: "picking a game" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766566731/jagnani73/projects/dewls/4184e2cb-9978-4ef1-9656-a4d063b87c9b.png", cap: "the leaderboard" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766566705/jagnani73/projects/dewls/bf8e57c5-ae68-40fd-a5cc-f70c9b1fd320.png", cap: "claiming the pot" },
      ],
      cta: {
        label: "view the showcase ↗",
        href: "https://ethglobal.com/showcase/dewls-oyj1w",
      },
    },
  },
};
