import { LINKS_NAMES, STACK_NAMES } from "@/utils/constants/shared-constants";
import type { ResumeType } from "@/utils/types/home.types";
import type { ProjectType } from "@/utils/types/projects.types";

export const projects: ProjectType[] = [
  {
    slug: "insidepoly",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1773432165/jagnani73/projects/insidepoly/d751cba0-010f-47f0-9464-cb961eba2fe6.png",
    name: "InsidePoly",
    tag: "website",
    description: `InsidePoly is a real-time **insider-trading surveillance tool** for [Polymarket](https://polymarket.com), the world's largest prediction market platform on Polygon. Prediction markets are uniquely vulnerable to information asymmetry: on-chain data is fully public, yet no tooling existed to systematically flag wallets trading with suspiciously prescient timing or concentration. InsidePoly closes that gap by continuously watching every trade and scoring each trader on a 0–100 insider-trading likelihood scale.

The system is a **TypeScript monorepo** with three packages: **common** (shared **Drizzle ORM** schema and types), **backend** (Express API plus scoring engine), and **frontend** (Next.js leaderboard). The data pipeline ingests **OrderFilled** events from the **Polymarket Subgraph** (The Graph), enriches them via **Alchemy RPC** to resolve token/condition IDs and wallet histories, then persists everything to **PostgreSQL (Supabase)**. **Redis** backs the job queues and sync cursors. Live updates push via **socket.io**, and the frontend polls via **React Query** every 30 seconds with WebSocket subscriptions for aggregate tier stats.

I designed and built the entire system end-to-end. The most technically demanding piece was **score_wallets()**, a PL/pgSQL function that computes five behavioral signals in a single pass without round-tripping through the application layer: **bet concentration** (top-market volume share), **market count**, **position size**, **entry timing** (how late in a market's lifecycle a wallet first traded), and **wallet age** (gap between first USDC.e receipt and first trade), each contributing up to 25 points. Wallets scoring 80+ get flagged as suspected insiders on the leaderboard.

- **Stack:** TypeScript, Next.js, Express, PostgreSQL, Redis, Drizzle ORM, socket.io, The Graph, Alchemy, Supabase
- **Scoring tiers:** Flagged Insider (80–100), Suspicious (60–79), Watchlist (30–59), Normal (0–29)
- **Pipeline stages:** Subgraph ingestion → enrichment loop → scoring loop → REST + WebSocket broadcast`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/insidepoly",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.EXPRESS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1773432208/jagnani73/projects/insidepoly/f41709f3-7501-4726-a3ef-06095736f651.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1773432230/jagnani73/projects/insidepoly/ccfeab56-87b7-4256-ba6a-b0001932eff9.png",
    ],
  },
  {
    slug: "flux",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567905/jagnani73/projects/flux/40534ebc-ecbe-4d84-81bc-943dce41227b.png",
    name: "Flux",
    tag: "website",
    description:
      `Crypto organizations have a real mismatch problem: the support tools built for Web2 don't understand transaction failures, wallet states, or protocol interactions. Flux is a **Web3-native, AI-powered customer support platform** that lets any crypto project deploy intelligent support agents with on-chain awareness. These agents can read block explorers, diagnose failed transactions, and execute pre-authorized on-chain actions, all while maintaining verifiable, immutable chat logs.

The architecture splits into three services: a **Python 3.12 agents service** powered by the **ASI (Artificial Superintelligence Alliance) uAgent framework**, a **Node.js/TypeScript API service** handling business logic and data persistence, and a **Next.js/Tailwind CSS frontend** serving both the admin dashboard and the embeddable customer widget. Organizations onboard their knowledge base via PDF and URL indexing, grant agents read-only blockchain API access, and configure budget-capped on-chain action authorizations. **ENS** provides verifiable agent identity, and **Fluence Virtual Servers** supply decentralized compute so the support infrastructure itself is never a centralized point of failure.

I designed and built the full stack end-to-end: from the agent orchestration pipeline that routes user queries through on-chain data lookups to the admin dashboard for knowledge base management and agent deployment. The hardest challenge was coordinating the uAgent framework with live blockchain data fetching at query time. The agent needed to dynamically pull relevant on-chain context (token balances, transaction status, contract state) and synthesize it with indexed documentation to produce accurate responses, without hallucinating protocol-specific details.

Flux was built at **ETHGlobal New Delhi 2025**, where it won the **Best Use of Fluence Virtual Servers** track prize.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/flux",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://flux-support.vercel.app/",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567915/jagnani73/projects/flux/f631ab10-eee1-44d7-a70a-dfff0c2f353a.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766568390/jagnani73/projects/flux/a751cb71-afdd-4686-91bf-27dfd1231dec.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766568408/jagnani73/projects/flux/2415a4c8-5508-4e49-b1fd-461240693a30.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766568417/jagnani73/projects/flux/962c2c42-774a-47a5-8a1d-5173d420969d.png",
    ],
  },
  {
    slug: "daoscape",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567343/jagnani73/projects/daoscape/46c6a4ff-3e28-494b-ab29-d284403ac1a2.png",
    name: "DAOScape",
    tag: "website",
    description:
      `Most DAOs today have a core governance problem: voting power is proportional to token holdings, which creates plutocracies where a handful of whales drown out genuine contributors. DAOScape replaces pure capital-weighted voting with a **reputation-based system** that rewards real participation: verified social presence, email domain ownership, and open-source contributions, so that influence is earned rather than bought.

The platform runs on a **multi-dimensional reputation engine** powered by **vlayer's Web Proof technology**, which generates **zero-knowledge proofs** for Twitter follows, GitHub activity, and email domains, confirming identity claims cryptographically without exposing raw credentials or requiring API keys. These verified signals feed into a **voting weight formula** where reputation carries the highest exponent, deliberately outweighing token balance. Smart contracts are written in **Solidity with Foundry** and deployed on **Base Sepolia**. **Blockscout** powers on-chain analytics and wallet profiling, and **1inch Protocol** handles DAO treasury management. A **Quests system** lets DAOs define engagement tasks with merit rewards.

I architected the full stack: the **React 18 + TypeScript** frontend with **wagmi v2/viem v2** wallet integration, the **Node.js microservices** backend backed by **Supabase**, and the ZKP-integrated smart contract layer. The hardest challenge was integrating vlayer's Web Proof circuit into the reputation scoring pipeline in a way that remained composable across multiple proof types without leaking user data on-chain.

DAOScape won the **Blockscout Big Blockscout Explorer Pool Prize** at **ETHGlobal Prague 2025**.`,
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://ethglobal.com/showcase/daoscape-g8f8m",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567356/jagnani73/projects/daoscape/5bf4f732-d1db-4517-9264-4306c07b81a5.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567369/jagnani73/projects/daoscape/af9a9242-4b91-4e0e-a622-979691b413c7.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567384/jagnani73/projects/daoscape/1b9d93e3-78d8-4e81-ae62-a54de565cd50.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567401/jagnani73/projects/daoscape/41b87a86-0e60-407c-8839-9814193a077c.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567453/jagnani73/projects/daoscape/5c1cb2cf-d35c-443a-a1f3-62b99a292c91.png",
    ],
  },
  {
    slug: "dewls",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566622/jagnani73/projects/dewls/2008978b-b933-4627-8a14-24ecc66d65e7.png",
    name: "Dewls",
    tag: "website",
    description:
      `Dewls is a blockchain-integrated **arcade wagering platform** where players put real stakes on competitive performance across 1v1 games like Rock-Paper-Scissors and Connect 4. Every match outcome is settled on-chain, and winners earn a **Proof-of-Victory**, a cryptographic attestation signed via **Sign Protocol** that immutably records their result on a global leaderboard. The platform runs on weekly seasons, with a shared prize pool distributed each weekend to the top three performers.

The architecture is deliberately multi-layered. Smart contracts are deployed across **Morph L2**, **Hedera** (using HCSC and HTS), and **Rootstock**, providing cross-chain accessibility and on-chain wager settlement. The real-time game engine runs on **Socket.IO** backed by **Redis** for atomic state management, with all game logic enforced server-side to prevent client manipulation. **Web3Auth** handles authentication for both Web2 and Web3 users, **Supabase** stores season and player data, and **XMTP** delivers in-app notifications, all stitched together in a **Next.js** frontend and **Express** API.

I built the full-stack across frontend, backend, and smart contract layers. The hardest challenge was keeping WebSocket game state and on-chain finality in sync: a player's move had to be cryptographically committed before the next turn could proceed, requiring careful Redis locking and sequenced contract calls. Deploying to Hedera's Smart Contract Service also surfaced undocumented bytecode upload errors that required low-level debugging to resolve.

Dewls won the **Sign Protocol Pool Prize** at **ETHOnline 2024**.`,
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://ethglobal.com/showcase/dewls-oyj1w",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566655/jagnani73/projects/dewls/daffe5d5-c9af-4149-a6cf-0d2cf6b1c7a5.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566746/jagnani73/projects/dewls/77c53c0a-d3a9-43fe-8451-e51184bbb6ea.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566663/jagnani73/projects/dewls/c1db88c1-0e6c-4c33-8056-d3d7a41a96a0.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566731/jagnani73/projects/dewls/4184e2cb-9978-4ef1-9656-a4d063b87c9b.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566705/jagnani73/projects/dewls/bf8e57c5-ae68-40fd-a5cc-f70c9b1fd320.png",
    ],
  },
  {
    slug: "ai-agent-sdk",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567167/jagnani73/projects/ai-agent-sdk/68955376-450a-4c28-9ed6-3eb4b8f391bf.png",
    name: "AI Agent SDK",
    tag: "package",
    description:
      `The AI Agent SDK is a TypeScript framework built at Covalent for the **Zero-Employee Enterprise (ZEE)**: a paradigm where autonomous AI agents replace traditional human-staffed workflows, particularly in the Web3 and blockchain data space. The SDK fills a real gap for on-chain developers who need to build AI pipelines that can reason over blockchain data, call external APIs, and chain decisions across multiple models without wiring together fragile bespoke integrations from scratch.

The SDK is organized around four composable primitives: **LLMs** (a unified provider interface supporting OpenAI, Google, and Anthropic), **Agents** (single model instances with system prompts and attached toolkits), **Tools** (external capability extensions), and **ZEE Workflows** (the orchestration layer that routes goals through a hierarchy of Planner and Router agents down to specialized task agents). The multi-agent coordination model is declarative: you define agents and a goal, and the workflow handles turn-taking, context passing, and tool invocation. This architecture scales from a single inference call up to deeply nested agent graphs without changing the composition API.

I built the core SDK package and led several major architectural milestones. I shipped **multimodal support**, integrating Gemini for image analysis alongside text reasoning. I drove the **migration to the Vercel AI SDK** as the underlying model-calling layer, which unified streaming, tool-calling, and provider abstraction under a single interface and resolved a persistent tool-calling bug across providers. I also refactored the ZEE agent assignment model in v0.3.0 and built the **cza** CLI scaffolding tool for bootstrapping new agent projects.

The SDK shipped as open-source MIT on npm under **@covalenthq/ai-agent-sdk**, accumulating **119 GitHub stars**, **56 forks**, and over **2,000 total downloads** since its December 2024 launch.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/covalenthq/ai-agent-sdk",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://cxt.build/docs/overview",
      },
    ],
    stack: [STACK_NAMES.TYPESCRIPT, STACK_NAMES.NODE],
    images: [],
  },
  {
    slug: "goldrush-kit",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766565005/jagnani73/projects/goldrush-kit/e0dd45f7-2dea-49bc-ac33-a7bbfdfeda05.png",

    name: "GoldRush Kit",
    tag: "package",
    description:
      `GoldRush Kit is a **plug-n-play React component library** that cuts out the most painful part of building web3 frontends: wiring up blockchain data. Instead of writing custom hooks, parsing raw RPC responses, and manually normalizing data across dozens of chains, you drop in a pre-built component (token balances, NFT galleries, transaction receipts, block explorers), wrap it in a **GoldRushProvider**, and the data fetches itself. The library was built at CovalentHQ to make multi-chain dApp development approachable for any React developer.

Architecturally, the library is built on **React**, **TypeScript**, and **TailwindCSS**, with every component driven by the **GoldRush TypeScript SDK**, Covalent's unified API client that normalizes on-chain data across **200+ blockchains**. Components follow an **atomic design hierarchy** (atoms to molecules to organisms), making them individually consumable or composable into full-page templates. The **theming system** uses a **GoldRushProvider** context that propagates a configurable **theme** object (controlling light/dark mode, primary color, background, foreground, and border radius) down to every component without any CSS overrides. A live **Storybook** environment serves as both documentation and interactive preview.

I owned the library across the **v1.0.x** release cycle, driving it from **v1.0.1** through **v1.0.5**. I shipped state-preserving pagination for block lists, raw transaction log display, in/out direction indicators on transaction lists, and chain-switching in the address activity component. The hardest challenge was getting gas and fee unit formatting precisely right: ETH values, Gwei, and Wei are easy to conflate across different API response shapes, and subtle unit errors at the display layer directly erode user trust in the data.

The library shipped **65 versions** on npm under **@covalenthq/goldrush-kit**, accumulated **105 GitHub stars** and **57 forks**, and spawned four actively maintained official templates.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/covalenthq/goldrush-kit",
      },
      {
        name: LINKS_NAMES.NPM,
        url: "https://www.npmjs.com/package/@covalenthq/goldrush-kit",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766564317/jagnani73/projects/goldrush-kit/81f580da-f9c3-4f15-8faf-ca37eef2fedd.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766564635/jagnani73/projects/goldrush-kit/ac94b6a1-a9c4-42cd-a318-5c80b2549824.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766564330/jagnani73/projects/goldrush-kit/0172911e-a1c9-4796-aea3-05bee4f8d65f.png",
    ],
  },
  {
    slug: "goldrush-decoder",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766564974/jagnani73/projects/goldrush-decoder/8abf9959-854f-41f2-8b9d-55c48e00866c.png",
    name: "GoldRush Decoder",
    tag: "website",
    description:
      `Every EVM transaction produces a stream of raw event logs: packed hex-encoded data that means nothing without the contract's ABI and the context to decode it. Wallets, block explorers, and analytics platforms all face the same problem: turning opaque **Transfer** topics and data fields into the human-readable story of what actually happened. GoldRush Decoder solves this at the infrastructure level, exposing a single REST endpoint that accepts a chain name and transaction hash and returns an array of fully structured, labelled event objects enriched with token metadata and USD pricing, across 200+ EVM-compatible chains.

The core is a **decoder registry** built around the **GoldRushDecoder** class. At startup, **initDecoder** scans a protocol directory and builds a map of **decoder keys** (strings of the form **protocol-name:EventName**) to handler functions registered via the **.on()** method. Each handler receives the raw log alongside a full transaction object and the Covalent API client, allowing on-the-fly token resolution, price lookups, and logo URL hydration. A **fallback decoder** handles any event that lacks a chain-specific handler, so the API always returns something meaningful even for unknown protocols. Contributors extend the system through a CLI scaffold (**yarn add-config**) that generates the config, decoder, and test file boilerplate for a new protocol in one command.

I built GoldRush Decoder from the ground up at Covalent, owning the decoder engine architecture, the API server, CI/CD pipeline, and the contributor-facing scaffolding tooling. The most demanding work was implementing **batched-parallel log processing**: a transaction can emit dozens of logs from different protocols, and awaiting each decoder serially created unacceptable latency. I redesigned the execution model to fan out decoder invocations in parallel batches while preserving original log sequence order in the response.

The project attracted 9 contributors, accumulated 21 stars and 7 forks on GitHub, and was adopted as a public good within the Covalent GoldRush ecosystem before being archived in August 2025.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/covalenthq/goldrush-decoder",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://goldrush-decoder.vercel.app/api/v1/healthcheck",
      },
    ],
    stack: [STACK_NAMES.NODE, STACK_NAMES.TYPESCRIPT],
    images: [],
  },
  {
    slug: "lenden",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/9a5e12be-9c19-42da-ba67-b47af1f14a18_jvotf8.png",
    name: "LenDen",
    tag: "website",
    description:
      `LenDen is a decentralized **cross-chain lending and borrowing platform** that addresses DeFi's liquidity fragmentation problem. Token and NFT holders with assets spread across Avalanche, Polygon, and other chains had no unified way to unlock liquidity without selling. LenDen changes that by letting borrowers collateralize assets on one chain and receive loans on another, while lenders earn interest by supplying capital to a multi-chain treasury.

The platform runs on **Router Protocol's cross-talk contracts**, which handle the cross-chain messaging required to coordinate collateral locks and loan disbursements across networks. Borrowers post **NFT or token collateral**, and the system tracks repayment behavior to build a **cross-chain credibility score**, a reputation layer that surfaces trusted users and adjusts risk accordingly. In the event of loan default, the protocol either retains the collateral or routes it through an **on-chain auction mechanism**. The stack combines Solidity smart contracts, **Next.js** for the frontend, **Express/Node.js** for the backend, **Supabase** for off-chain data, and **Push Protocol** for notifications.

I architected and built the full-stack integration: from the smart contract interfaces and cross-talk message routing to the borrower dashboard and credibility scoring logic. The hardest challenge was orchestrating reliable state synchronization across two chains, keeping the collateral lock on the source chain and the loan release on the destination chain atomic and recoverable under failure conditions.

LenDen was built at **Unfold 2023**, where it won **First Place in the Router Protocol track**.`,
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://devfolio.co/projects/lenden-27ec",
      },
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/lenden",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/578f68d4-e848-4a3f-a5c5-b7cc74cf9a88_gg0aqw.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/1d59ea1e-69b3-4cde-9ab9-8fabf58de774_blm70w.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/903d5d31-763d-4c5e-8a60-4593464e465d_eicstt.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562131/jagnani73/projects/lenden/f247c1a5-c4aa-411a-9c74-c1bbd1147bfa_l3bj0r.png",
    ],
  },
  {
    slug: "delinzk",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/6a559df0-848d-46e9-9b81-a25383c5b89d_npadrq.jpg",
    name: "deLinZK",
    tag: "website",
    description:
      `Professional networks like LinkedIn have a trust problem: anyone can list a job title or claim years of experience with no mechanism for verification. Background checks are slow, expensive, and invasive: they harvest personal data and still fail to provide cryptographic guarantees. deLinZK was built to eliminate this entirely by replacing trust-me credentials with mathematically unforgeable ones.

The platform uses **Polygon ID** and the **Iden3 credential framework** to issue **Verifiable Credentials** as **Proof-of-Employment**. When an organization onboards (after admin verification of legitimacy), it can issue a ZK credential to an employee encoding their employment tenure. That credential is stored in the employee's identity wallet, and when they apply to a job on the integrated **job board**, they generate a **Zero-Knowledge Proof** that proves employment without revealing any underlying personal data. **Redis** manages real-time state across the WebSocket and REST layers, while **Supabase** handles persistence and **Next.js** drives the frontend.

I designed and built the full ZK credential issuance and verification flow. Polygon ID imposes a 15-digit integer constraint on credential attributes, which made encoding employment tenure into a single field a real puzzle. I solved it by applying **SHAKE-128 hashing**, converting the output to hexadecimal and then to decimal radix to produce compact 48-bit values that fit within the constraint while remaining uniquely deterministic. I also implemented the privacy-first authentication layer, replacing JWTs entirely with ZK proofs so that user emails are used only for communication, never for identity.

Built at **ETHForAll Online VIII**, deLinZK demonstrates what a credential layer for the professional web could look like when privacy and verifiability are non-negotiable first principles.`,
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://devfolio.co/projects/delinzk-4e9f",
      },
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/delinzk",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/70ffc667-d062-4948-97dc-85c438a7ef7d_irclpf.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/91a99762-16bf-4ba8-b12c-35ceaba31927_nixd6w.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/e505aa8f-668a-40a8-822d-3fa261b68ff7_azumdi.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766558075/jagnani73/projects/delinzk/ea9ad5d5-7066-41a4-b44b-bd2814f37f57_hftzqk.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766558074/jagnani73/projects/delinzk/350ad1c9-a430-42bb-ae52-d28f70b7ae34_to9t6l.png",
    ],
  },
  {
    slug: "nudge-lab",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473693/jagnani73/projects/nudge-lab/preview3_j50aqp.png",
    name: "NudgeLab",
    tag: "website",
    description:
      `Product teams constantly struggle to surface the right guidance to users at the right moment. Onboarding flows, feature announcements, and contextual prompts traditionally require engineering effort every single time. **NudgeLab** is a no-code, platform-independent **nudge management service** that cuts out that bottleneck. It wraps over any existing infrastructure through a lightweight SDK script tag, giving teams a self-serve **admin panel** to design, configure, and deploy in-app nudges without touching the underlying product codebase.

The platform supports two distinct delivery modes. **Campaign-based nudges** are scheduled and distributed via a **CDN-backed delivery architecture**: static nudge configurations are pushed to a CDN edge, and the **Client SDK** fetches them on load, keeping delivery low-latency and scalable with no server roundtrip per user. **Trigger-based nudges** work through **HTTP polling**, where the **Backend SDK** intercepts API calls, injects **event_label** identifiers into a **message queue**, and the client polls for matching nudge responses in real time. Administrators authenticate, create projects, generate SDK scripts, and configure nudges entirely through the dashboard, with no deployments required on the client side.

My work on NudgeLab was entirely backend: I designed and built both SDK layers, the message queue pipeline, the CDN distribution mechanism, and the HTTP polling system for event-driven nudges. The CDN delivery approach required careful thinking around cache invalidation and configuration serialization to make sure nudge updates propagated reliably without stale content reaching end users.

NudgeLab was built at **HackRx 3.0**, Bajaj Finserv's national hackathon, where it won the **Dark Horse** and **Power & Pace** awards.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/nudge-lab",
      },
    ],
    stack: [STACK_NAMES.NODE, STACK_NAMES.EXPRESS, STACK_NAMES.NEXT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473687/jagnani73/projects/nudge-lab/preview1_r2k59y.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473684/jagnani73/projects/nudge-lab/preview2_rdp0vp.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473690/jagnani73/projects/nudge-lab/preview4_dzkwog.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473698/jagnani73/projects/nudge-lab/preview5_wd9hvv.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473699/jagnani73/projects/nudge-lab/preview6_n74him.png",
    ],
  },
  {
    slug: "hospitatva",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473718/jagnani73/projects/hospitatva/preview5_vqlet8.png",
    name: "Hospitatva",
    tag: "website",
    description:
      `During the COVID-19 pandemic, private hospitals across India engaged in rampant price gouging: inflating costs for beds, oxygen, and treatments while opacity around resource availability left patients and families helpless. Hospitatva was built to directly confront this, providing a national information portal that brings full transparency to hospital pricing and commodity availability.

Hospitatva is a **distributed ledger** system built on the **Zilliqa blockchain**, using **Scilla smart contracts** to immutably record the rates hospitals propose and charge, as well as real-time commodity counts. A three-portal architecture serves patients, hospital staff, and government officials: patients can browse hospitals, verify pricing against government benchmarks, and flag anomalies, while officials receive and review those complaints through a supervised legitimacy pipeline. A **30-input ML price prediction model** (scikit-learn / TensorFlow) detects billing anomalies before invoices are finalized.

I built the frontend logic layer, which included integrating **DID-based authentication** via **MagicLink**: a wallet-native sign-in flow grounded in the **Web of Trust** model. The challenge was reasoning about decentralized identity at the application layer. Rather than session cookies or JWTs, authentication state was tied to a user's cryptographic identity, which required rethinking how auth context flowed through the Next.js frontend.

Hospitatva was developed for **Smart India Hackathon Internals 2022** by Team HaanDoobey.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/hospitatva",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473710/jagnani73/projects/hospitatva/preview1_1_ghtg1s.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473707/jagnani73/projects/hospitatva/preview2_ov2nxo.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473715/jagnani73/projects/hospitatva/preview3_cl9fz1.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473712/jagnani73/projects/hospitatva/preview6_1_mlrp5u.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473724/jagnani73/projects/hospitatva/preview7_1_ydmuwg.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473721/jagnani73/projects/hospitatva/preview8_1_wghanp.png",
    ],
  },
  {
    slug: "marquee",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473627/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-10_vyyznz.png",
    name: "react-easy-marquee",
    tag: "package",
    description:
      `I built **react-easy-marquee** after growing frustrated with the marquee packages available in the React ecosystem. Most were too opinionated, relied on JavaScript-driven animation timers, or offered little customization. I wanted something that felt native and flexible, so I built it from scratch: a fully customizable **Marquee** component that accepts any children (plain text, images, or arbitrary JSX elements) and scrolls them in a seamless loop.

The animation is driven entirely by **CSS keyframes**, with zero JavaScript timers or requestAnimationFrame logic. This keeps the component lightweight and performant. The **zero-dependency design** means nothing is pulled in beyond React itself. Key props give fine-grained control: **duration** (loop speed in ms), **axis** (horizontal or vertical scrolling), **reverse** (direction), **pauseOnHover**, **background**, and **height**/**width**, all with sensible defaults for a true plug-and-play experience.

I designed, architected, and maintain the entire package end-to-end: from the CSS animation model that achieves infinite scroll without scroll listeners or interval hacks, to the prop API and the live demo site. One non-trivial challenge was making the loop duration feel consistent regardless of how many or how few children are passed, since the perceived speed changes with content width, a nuance most competing packages ignore entirely.

The package has accumulated over **105,000 total downloads** on npm and continues to see steady weekly adoption.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/react-easy-marquee",
      },
      {
        name: LINKS_NAMES.NPM,
        url: "https://www.npmjs.com/package/react-easy-marquee",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://jagnani73.github.io/react-easy-marquee/",
      },
    ],
    stack: [STACK_NAMES.PREACT, STACK_NAMES.TAILWIND_CSS],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473624/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-55_skdcwe.png",
    ],
  },
  {
    slug: "shikshak",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473786/jagnani73/projects/shikshak/screenshot-home_1_qehcch.png",
    name: "Shikshak",
    tag: "website",
    description:
      `During the COVID-19 pandemic, remote education exposed a painful divide: mainstream video conferencing platforms consumed upwards of 3GB of mobile data per day, putting quality education entirely out of reach for students in rural areas or low-income households.

Shikshak ("teacher" in Hindi) rethinks the online classroom from scratch. Instead of streaming video, the teacher writes on a physical blackboard while a camera feed is processed in real time by an **ML pipeline** (OpenCV, imutils, Canny edge detection) that detects the board's corners, isolates its surface, and converts the content into a **pixel-mapped data array**, achieving roughly an **85% reduction in data consumption** compared to raw video. That compressed array is pushed to students in real time via **Socket.IO**, where the **Canvas API** reconstructs the board on their screen. Alongside this, **WebRTC** handles an audio-only channel so teacher and students stay in live voice contact without the overhead of a video stream.

I built the full **React + TypeScript** frontend, covering both the teacher-side calibration interface (where the board boundary is set before a session) and the student-side canvas that renders the incoming pixel stream. I also implemented the **WebRTC audio integration**: the trickiest part was constraining the peer connection to audio only while keeping it in sync with the Socket.IO data channel.

Shikshak won **First Position at Hack This Fall 2020**.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/shikshak",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473789/jagnani73/projects/shikshak/screenshot-calibrate_1_kaglgd.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473783/jagnani73/projects/shikshak/screenshot-preview_1_lsp63m.png",
    ],
  },
  {
    slug: "contracts",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473801/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-58_qpcdoj.png",
    name: "Contracts",
    tag: "website",
    description:
      `Splitting expenses among friends is easy until someone disputes a transaction or quietly edits a record. Contracts addresses this trust problem by moving the entire expense-splitting workflow onto a blockchain, where the ledger's immutability means no transaction can be altered without a visible, permanent trace.

Built during **Rookie Hacks II 2022**, the app uses **Hedera**-deployed **Solidity smart contracts** as its backbone instead of a traditional database. Users authenticate via **blockchain-based accounts** and can then add, edit, settle, or delete shared expenses. Every mutation (an edit, a deletion, a settlement) is captured in an **immutable audit log**, so all participants always have a transparent, tamper-proof view of the transaction history. The frontend is built with **Next.js** and **Tailwind CSS**, communicating with a **Node.js / TypeScript** backend that interfaces with the on-chain contracts.

I built the complete frontend of the application, including the blockchain authentication flow and the transaction management UI. The most interesting challenge was working with Hedera's nascent tooling: documentation was sparse for what was then a newly-launched platform, which meant a lot of first-principles debugging to get wallet authentication and smart contract calls working together.

Contracts won **Best Blockchain Project Using Hedera** at the hackathon.`,
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/contracts",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473805/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-39_lskus9.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473807/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-25_hpuchh.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473811/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-20_hxrgok.png",
    ],
  },
  {
    slug: "githubsrm",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473646/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-12-49_chg5tm.png",
    name: "GitHub Community SRM",
    tag: "website",
    description:
      "GitHub Community SRM is a student-led open-source community at SRMIST, Chennai, focused on consolidating student and faculty projects under the SRM-IST-KTR **GitHub Organisation**. Its registration portal lets students and teachers enrol under active projects, with each submission wired directly to the **GitHub API**: automatically creating repositories, managing collaborators, and handling access permissions in real time. The portal is built on a **Django** backend and a **Next.js** / **React** frontend, with **Yarn workspaces** managing a monorepo that serves both the landing page and the portal. I built the **frontend of the registration portal**, translating design requirements into a responsive, production-ready interface and connecting it to the backend API endpoints that drive the live GitHub automation.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/githubsrm",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473649/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-44_ry5x2x.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473653/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-03_iy2rwn.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473655/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-58_ucfgvx.png",
    ],
  },
  {
    slug: "soulless-citadel",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473774/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-10-37_lbh90h.png",
    name: "The Soulless Citadel",
    tag: "website",
    description:
      "The Soulless Citadel was a client-based project I worked on during my tenure at Quinence, built for Shibui Labs: a story-driven **NFT** collection and marketplace operating on the **Zilliqa blockchain**. The project centered on a narrative universe of 5,555 unique NFTs, with minting and trading facilitated through **ZIL**-based **wallet authentication** and **smart contract** interactions. I developed the website's initial versions, which involved making **RPC calls** to the Zilliqa network, integrating **blockchain wallet authentication**, and handling on-chain data for asset ownership and metadata. The project gave me hands-on exposure to how decentralized applications communicate with a blockchain, how **gas fees** and **transaction signing** work in practice, and the broader architecture of an **NFT marketplace** from the frontend perspective.",
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://soullesscitadel.com/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473765/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-11-00_hnikmb.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473768/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-12-06_ydadq7.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473771/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-12-30_cagse6.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473780/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-11-13_igmule.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473777/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-11-42_mtxhzk.png",
    ],
  },
  {
    slug: "wealth42",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473680/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-01-26_ryqnkd.png",
    name: "wealth42",
    tag: "website",
    description:
      "wealth42 is a Bengaluru-based fintech platform that uses proprietary **MINT Science** to guide users through personalised financial planning journeys across mutual funds, insurance, loans, and pension products. The project started as an outsourced engagement with SRMKZILLA, where I mentored recruits building the landing application. After being brought on as a **Software Development Intern** directly at wealth42, I continued laying the architectural foundation of that application. The core of my technical work was designing and implementing **class-based directed graph forms**: a structure where each form node holds references to conditional successor nodes, producing non-linear, state-aware onboarding flows with **complex multi-step validation**. I also built a **custom user tracking system** to monitor and analyse end-user behaviour across these flows.",
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://wealth42.com/",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473672/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-01-38_fomvhg.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473680/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-03-23_jqqmqw.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473675/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-03-44_r0v9mc.png",
    ],
  },
  {
    slug: "stories",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473752/jagnani73/projects/stories/1_1_rnugym.png",
    name: "Stories",
    tag: "website",
    description:
      "Stories is a **mental health aid** web app built for HackCBS 3.0. It lets users select their personal \"worry\" tags and get matched with a peer (either as a *seeker* or a *supporter*) for anonymous, judgment-free conversation. Matching is score-based, pairing users who share the highest number of concern tags. Real-time messaging runs on **Socket.IO**, with chat room state managed in **Redis**. Every outgoing message is run through a **TensorFlow.js** toxicity classifier; messages flagged as harmful are censored before reaching the seeker. Seekers can report abusive supporters, and enough reports triggers an IP and email ban enforced via a **Redis**-backed middleware. I built the complete frontend in **React + TypeScript**, including the tag-selection flow, the live chat window, and the admin panel for user management.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/stories",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473758/jagnani73/projects/stories/2_1_wwqysl.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473761/jagnani73/projects/stories/3_1_xlmyej.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473755/jagnani73/projects/stories/4_1_ylfthn.png",
    ],
  },
  {
    slug: "fren",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473741/jagnani73/projects/fren/screenshot-client_1_ftnrvo.png",
    name: "Fren",
    tag: "website",
    description:
      "Fren is a **privacy-first therapy journaling** app built at HackTheMountains 2020, where we won Fourth Position. Clients write diary and journal entries freely, but therapists never see the raw notes. Instead, an **NLP analysis layer** powered by **sentiment analysis** (via a **multi-layer perceptron** classifier), **TF-IDF word analysis**, and **network graph visualisation** of context-related terms surfaces the emotional picture behind the writing. The **MERN** stack handles data logging and timestamped entry storage through a **Node.js/Express** API backed by **MongoDB**, while a **Flask** microservice runs the **Python ML pipeline** using **scikit-learn**, **spaCy**, **NLTK**, and **TextBlob**. I built the complete frontend in **React.js with TypeScript**, including both the client journaling interface and the therapist analytics panel, using **Tailwind CSS**.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/fren",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473737/jagnani73/projects/fren/screenshot-therapist_1_xy2335.png",
    ],
  },
  {
    slug: "bharat-beacon",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473617/jagnani73/projects/bharat-beacon/image_i4bbih.png",
    name: "Bharat Beacon",
    tag: "website",
    description:
      "**BharatBeacon** was built at **Code2Create 4.0** by **ACM VIT**, where our team won the **Best First Year Team** award. The project tackles **disaster management** across three phases: preemptive risk mitigation, mid-crisis response, and post-crisis recovery. It is an **IoT-driven system** where physical devices transmit distress signals to a centralised platform. I built the **Government Portal**: a real-time dashboard that visualised incoming **distress calls** as pinpoints on an interactive map powered by the **MapBox API**. To keep the interface current without a persistent connection, I implemented **HTTP polling** to continuously fetch the latest device signals and metadata. The portal gave authorities a live, geographic overview of active emergencies.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/BharatBeacon",
      },
    ],
    stack: [
      STACK_NAMES.HTML,
      STACK_NAMES.CSS,
      STACK_NAMES.JAVASCRIPT,
      STACK_NAMES.NODE,
    ],
  },
  {
    slug: "aaruush-links",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473734/jagnani73/projects/aaruush-links/Screenshot_from_2022-07-03_03-48-15_q2grbw.png",
    name: "AARUUSH Links",
    tag: "website",
    description:
      "AARUUSH is an annual student-led **Techno-Management fest** at SRMIST, running events, workshops, and competitions across domains year-round. AARUUSH Links is a **Linktree-style aggregator** built to consolidate all the fest's digital presence into one place, organizing links by category. I built the entire **React** frontend, backed by a **Node.js/Express** REST API with **MongoDB** for persistence, **JWT**-based authentication, and **AWS S3** for media storage, all deployed on an **EC2** instance behind **Nginx**. The highlight is the **admin panel**, which lets authorized users add and manage category-specific event links, and is unlocked through a hidden **easter egg** on the public-facing UI rather than a conventional login route.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/aaruush-links",
      },
    ],
    stack: [STACK_NAMES.REACT, STACK_NAMES.NODE, STACK_NAMES.BOOTSTRAP],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473731/jagnani73/projects/aaruush-links/Screenshot_from_2022-07-03_03-51-34_uxyjk0.png",
    ],
  },
  {
    slug: "ossmosis",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473727/jagnani73/projects/ossmosis/Screenshot_from_2022-07-03_02-53-55_plyc7y.png",
    name: "OSSmosis",
    tag: "microsite",
    description:
      "OSSmosis was the first event conducted by **GitHub Community SRM**, a student-led open source initiative at SRMIST, Chennai. I built the official **microsite** for the event: a fully **static deployment** that served as the event portal, covering the event description, rules, judging criteria, and a registration flow for participants to showcase their **open source projects**. The project was built using **Vue.js**, which was my first hands-on experience with the framework; it introduced me to **component-based architecture**, **Vue CLI**, and managing a **Yarn**-based frontend workflow. A lightweight **Python/Django** backend handled form submissions on the server side.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/ossmosis",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://ossmosis.jagnani73.com/",
      },
    ],
    stack: [STACK_NAMES.VUE, STACK_NAMES.TAILWIND_CSS],
  },
  {
    slug: "inforged-noida",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566175/jagnani73/projects/inforged-noida/b5870129-56aa-4f12-9b0c-b3b11bfa3f16.png",
    name: "Inforged Noida",
    tag: "website",
    description:
      "I built the marketing website for Inforged Autos Noida, an automotive customization company based in Noida operating since 2005. The site showcases their four core service verticals: alloy wheels, performance tuning, car detailing (ceramic coatings, paint protection films), and full vehicle makeovers, along with a curated gallery of completed work and a WhatsApp-integrated contact flow. Built with **Next.js** and **TypeScript** for a fast, SEO-optimized experience, with **Tailwind CSS** handling the responsive, image-heavy layout. Images are served via **Cloudinary** for optimized delivery across the gallery and service sections.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/inforged-noida",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://www.inforgedautosnoida.com/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TYPESCRIPT, STACK_NAMES.TAILWIND_CSS],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566186/jagnani73/projects/inforged-noida/7bb3a80d-cb51-489d-bd85-d5b867762c33.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566209/jagnani73/projects/inforged-noida/443a0b0c-362a-4376-a52e-206680380943.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1766566236/jagnani73/projects/inforged-noida/0c48b9eb-2486-4ecc-b2e2-9d944246b793.png",
    ],
  },
  {
    slug: "frame-fantasy",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473620/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-08-32_asnuhj.png",
    name: "Frame Fantasy",
    tag: "website",
    description:
      "Frame Fantasy is a **freelance** client project: a photography portfolio and gallery website built for Purbafalguni Paul, a Mumbai-based professional photographer. I built it using **Next.js** with a **static export** configuration, and used **Cloudinary** as an image **CMS** to manage and serve the photographer's assets. The site is organized into eight distinct gallery categories (Commercial Fashion, Pre Wedding, Weddings, Conceptual, Maternity, Baby, and more), each with a curated preview and a full-view page. A **Contact** section with a submission form and social links rounds out the v1 scope. The planned **v2** will introduce a backend with **email notification services** wired to the contact form.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/frame-fantasy",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://framefantasy.co.in/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473824/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-08-56_lmmccy.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473824/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-08-56_lmmccy.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473826/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-10-12_n1b7xh.png",
    ],
  },
  {
    slug: "sarthaka",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473637/jagnani73/projects/sarthaka/Screenshot_from_2022-07-03_02-44-20_mtlumg.png",
    name: "Sarthaka Foundation",
    tag: "website",
    description:
      "Sarthaka Foundation is a Bangalore-based NGO dedicated to uplifting underprivileged communities through education, skill development, food distribution, and clothing drives. I built their website to present their work, events, and ongoing initiatives (including programs like *Support a Child for Education* and their *Skill Development Centers*) in a clean, accessible format. The project also required implementing a complex **paywall** to gate certain content behind authenticated access. This was one of my first projects using **Next.js**, **TypeScript**, and **TailwindCSS**, and it pushed me to learn quickly: from **server-side rendering** and **static generation** to building **authentication flows** and designing responsive UI components from scratch.",
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://sarthakafoundation.ngo",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473638/jagnani73/projects/sarthaka/Screenshot_from_2022-07-03_02-44-32_rwzvsa.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473640/jagnani73/projects/sarthaka/Screenshot_from_2022-07-03_02-45-03_omntoy.png",
    ],
  },
  {
    slug: "aashma",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473830/jagnani73/projects/aashma/Screenshot_from_2022-07-03_02-25-20_shgcnb.png",
    name: "Aashma Foundation",
    tag: "website",
    description:
      "Aashma Foundation is a charitable NGO whose online presence required a simple, accessible landing page. Under **Data Science Community SRM**, I laid the foundation for this static site, working directly from the NGO's minimal requirements: a photo **gallery** showcasing their community work and clear details to facilitate **donations**. Given the scope, I chose the **vanilla stack** (plain **HTML**, **CSS**, and **JavaScript**) paired with **Bootstrap** for responsive layout, keeping the codebase lightweight and easy to maintain. The site is structured around a single **index.html** entry point with dedicated stylesheets and a **gallery/** directory, deployed via **GitHub Pages** under the custom domain **aashmafoundation.in**.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/Aashma-Foundation",
      },
    ],
    stack: [
      STACK_NAMES.HTML,
      STACK_NAMES.CSS,
      STACK_NAMES.JAVASCRIPT,
      STACK_NAMES.BOOTSTRAP,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473818/jagnani73/projects/aashma/Screenshot_from_2022-07-03_02-25-52_egtlwx.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473816/jagnani73/projects/aashma/Screenshot_from_2022-07-03_02-25-58_xzdgwb.png",
    ],
  },
  {
    slug: "kz-links",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473668/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-30-02_iqiehy.png",
    name: "KZ Links",
    tag: "website",
    description:
      "KZ Links was a **Linktree**-style profile page platform built for **SRMKZILLA**, the tech community at SRM KTR. It connected directly to SRMKZILLA's existing **URL shortener**, extending it to power fully customizable public profile pages complete with **link tracking statistics**. The stack used **Next.js**, **TypeScript**, **Tailwind CSS**, and **MongoDB**. I served as a **mentor** on this project, guiding a fresh batch of recruits through the fundamentals of **Next.js**: covering routing, server-side rendering, and component architecture as they built their first production-grade web application within the organization.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/kz-links",
      },
    ],
    stack: [
      STACK_NAMES.NEXT,
      STACK_NAMES.NODE,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473665/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-23-40_a4jjod.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473661/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-24-26_c0x4oj.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473659/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-23-26_bief8w.png",
    ],
  },
  {
    slug: "walleth",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562709/jagnani73/projects/walleth/00f4aa4f-b85f-40e6-bab6-64f20cec88ec.png",
    name: "WALLeth",
    tag: "website",
    description:
      "WALLeth is a prototype frontend I built for **WALL.app**, a conceptual **NFT marketplace** platform. The app simulates a rich collector profile experience: displaying an **ENS-linked wallet identity**, community memberships, an **NFT category breakdown chart** (Art, PFP, Metaverse, Gaming, and more), and curated highlight cards for milestone transactions like \"Best Flip,\" \"First NFT bought,\" and \"Paper Handed.\" A horizontally scrolling **Recent Sales carousel** surfaces floor-price comparisons across blue-chip collections like **Azuki**, **BAYC**, **MoonBirds**, and **CryptoPunks**. Built with **Next.js**, **TypeScript**, and **TailwindCSS**, it shows my approach to building immersive, data-rich **Web3 interfaces**, pairing a vivid full-bleed aesthetic with structured on-chain data presentation, all without any backend dependency.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/walleth",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://walleth.jagnani73.com/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TYPESCRIPT, STACK_NAMES.TAILWIND_CSS],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562764/jagnani73/projects/walleth/fcbb47fa-a665-4d36-a3fa-857e0a0a34af.png",
    ],
  },
  {
    slug: "equivalent",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766562993/jagnani73/projects/equivalent/babf1eaa-feb7-44ab-96f4-63e76a260665.png",
    name: "Equivalent",
    tag: "website",
    description:
      "Traditional block explorers overwhelm users with raw hex strings, cryptic addresses, and undecoded transaction data. I built **Equivalent**, a **multichain block explorer** powered by the **Covalent API**, to surface blockchain data in a genuinely human-readable format. Built with **Next.js**, it lets users inspect wallet balances, browse **NFT holdings** with live rendering, trace **transaction history**, and visualize **asset flows** across addresses. Decoded transaction support covers **DEX swaps**, **NFT trades**, and **lending protocol** interactions, turning opaque calldata into plain-language summaries. Keyboard shortcuts (**O**, **N**, **P**, **T**, **H**) make navigation fast without touching the mouse.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/equivalent",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://equivalent.jagnani73.com/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TYPESCRIPT, STACK_NAMES.TAILWIND_CSS],
    images: [],
  },
  {
    slug: "nb-extract",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567668/jagnani73/projects/nb-extract/ca0b8f0a-0c70-4fff-9249-b44a28912fb0.png",
    name: "NB Extract",
    tag: "website",
    description:
      "**NB Extract** is a web-based **Jupyter Output Extractor** that solves the common problem of sharing notebook results without the code clutter. Upload a **.ipynb** file and it extracts only the **output cells** (text, plots, tables, and interactive content), stripping away all source code. The extracted outputs are rendered in a clean, readable preview and can be **exported as a PDF** document ready for presentations and reports. Processing happens entirely **client-side**, so uploaded notebook data never leaves the browser. Ideal for data scientists and analysts who need to share findings with non-technical stakeholders in a polished, shareable format.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/nb-extract",
      },
    ],
    stack: [STACK_NAMES.NODE, STACK_NAMES.TYPESCRIPT, STACK_NAMES.TAILWIND_CSS],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567681/jagnani73/projects/nb-extract/8e2f25b3-5418-4168-ad53-0c1a22b9b4df.png",
    ],
  },
  {
    slug: "typequest",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766563553/jagnani73/projects/typequest/d2b7d0b6-c90f-42c0-bec8-dc40fb47eaa8.png",
    name: "TypeQuest",
    tag: "website",
    description:
      "TypeQuest is a **React** library I built to cut the boilerplate of wiring up keyboard shortcuts. Rather than reinventing key-event handling, I wrapped **Keypress.JS**, a mature, feature-rich keybinding library, behind a clean, typed API. The core is a **singleton** that holds a single Keypress.JS listener instance across the app, preventing duplicate registrations and exposing native methods for advanced extensibility. On top of that, a **ShortcutComponent** lets developers declaratively attach shortcuts inline with their JSX. Built with **TypeScript** and **Vite**, the library enforces type safety on combo strings and handler signatures, making it straightforward to add, remove, or extend keyboard interactions without touching raw DOM event listeners.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/typequest",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://typequest.jagnani73.com/",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766563579/jagnani73/projects/typequest/f7df28d2-297c-4e02-9d5f-5874e8290ec8.png",
    ],
  },
  {
    slug: "weather-app",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766563799/jagnani73/projects/weather/857be2cf-5456-4092-922e-3afad071ee9c.png",
    name: "Weather App",
    tag: "website",
    description:
      "Weather App is a **React** and **TypeScript** web application that delivers real-time weather data for any location worldwide via the **OpenWeatherMap API**. Built with **Tailwind CSS**, leaning into a soft sky-to-blush gradient aesthetic. The app centers on a location **search** interface and surfaces current conditions alongside forecasts, covering temperature, wind speed, atmospheric pressure, and precipitation. A persistent unit-toggle bar in the header lets users switch between **°C/°F**, **KMPH/MPH**, **MB/IN**, and **MM/IN** on the fly.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/weather-app",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://weather.jagnani73.com/",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.TAILWIND_CSS,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1766563874/jagnani73/projects/weather/5793ea1f-f521-4b9c-bd8b-7ca7d0ff944f.png",
    ],
  },
  {
    slug: "doc-gen",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473792/jagnani73/projects/doc-gen/preview_1_kqzvim.png",
    name: "DocGen",
    tag: "website",
    description:
      "DocGen was a fun, quirky hack built under the **Data Science Community SRM**: a **text-to-image generator** that produces handwritten-style assignment pages using customisable **cursive fonts**. Students could input their text, tweak font size, adjust **X/Y-axis positioning** and line spacing, choose sheet backgrounds, and download the final image. My role was to **guide and mentor recruits** through the build, helping them navigate **Preact.js** (the lightweight **React** alternative), **Preact CLI**, and component-based architecture. In doing so, I got hands-on exposure to **PreactJS** myself, exploring how it differs from React in bundle size and rendering. The project is built in **JavaScript** with **CSS** and scaffolded via **Preact CLI**.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/docgen",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "http://docgen.jagnani73.com/",
      },
    ],
    stack: [STACK_NAMES.PREACT, STACK_NAMES.JAVASCRIPT],
  },
  {
    slug: "morelinks",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473631/jagnani73/projects/morelinks/Screenshot_from_2022-07-03_02-34-07_l0oai2.png",
    name: "Morelinks",
    tag: "microsite",
    description:
      "MoreLinks was a **Data Science Community SRM** project: an extended **Linktree**-style link page that went beyond simple URL lists. Built on the **vanilla stack** (**HTML**, **CSS**, and **JavaScript**) with **Bootstrap** for responsive layout, the site aggregated live social feeds from **Twitter**, **Instagram**, and **Medium** via **hourly API calls**, surfacing the community's latest tweets, posts, and blogs in one place. The site was **statically deployed** via **GitHub Pages** with no backend. I played a mentor and lead developer role, guiding recruits through the full build process and teaching them frontend fundamentals, **REST API integration**, and **static site architecture**.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/morelinks",
      },
    ],
    stack: [
      STACK_NAMES.HTML,
      STACK_NAMES.CSS,
      STACK_NAMES.JAVASCRIPT,
      STACK_NAMES.BOOTSTRAP,
    ],
  },
  {
    slug: "dscommunity",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473746/jagnani73/projects/dscommunity/Screenshot_from_2022-07-03_02-36-57_af4bix.png",
    name: "Data Science Community",
    tag: "website",
    description:
      "Data Science Community SRM was a student-led innovation hub at SRMIST, and this website was their first online presence. As the sole **web developer** on the team, I built and evolved the entire platform. I initially developed it on a **vanilla HTML/CSS/JavaScript** stack, during which I simultaneously started learning **ReactJS** and eventually migrated the whole frontend to **React**. I then extended the project into a full **MERN stack** application, adding a **Node.js** and **Express** backend connected to **MongoDB**. Key features include an events timeline, a **Medium API**-powered blog that refreshes hourly, a people directory, and a **NodeMailer**-backed Contact Us form. The site also integrates **OneSignal** push notifications and **Google Analytics** for user engagement tracking.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/Data-Science-Community-SRM/Data-Science-Community-Website",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://www.dscommunity.in/",
      },
    ],
    stack: [STACK_NAMES.REACT, STACK_NAMES.BOOTSTRAP, STACK_NAMES.NODE],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473742/jagnani73/projects/dscommunity/Screenshot_from_2022-07-03_02-37-19_wwy3lr.png",
    ],
  },
  {
    slug: "iei",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473799/jagnani73/projects/iei/Screenshot_from_2022-07-03_04-13-51_mdjwqb.png",
    name: "IEI",
    tag: "website",
    description:
      "The **Institution of Engineers (India)** is a professional engineering body established in 1920. The **Kattankulathur Local Centre** of the Tamil Nadu branch commissioned their website to **SRMKZILLA** during my tenure there. The goal was a **static frontend website** for version 1, with dynamic data on the **People** and **Events** pages driven by an **admin panel**. The site featured sections for Committee Members, Activities, Gallery, News, and Contact. I served as **lead developer for the frontend**, owning the complete version 1 build and contributing to a partial version 2. Once the foundation was stable, the project was handed off to full-stack recruits as a structured onboarding exercise.",
    links: [],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473795/jagnani73/projects/iei/Screenshot_from_2022-07-03_04-14-03_auz3xj.png",
    ],
  },
  {
    slug: "srmkzilla-hacktoberfest-21",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473749/jagnani73/projects/srmkzilla-hacktoberfest-2021/Screenshot_from_2022-07-03_04-28-16_u1xurs.png",
    name: "SRMKZILLA Hacktoberfest 2021",
    tag: "microsite",
    description:
      "**Hacktoberfest** is the annual month-long celebration of **open source software**, organized by **DigitalOcean**. SRMKZILLA hosted a mini-event during my time there, and this project was the **microsite** built to serve as both the information hub and **registration portal** for participants. The site welcomed contributors to explore SRMKZILLA's repositories, with beginner-friendly issues tagged for easy onboarding. Registration was handled through an embedded **TypeForm** integration. The microsite is fully **static**, built on the **vanilla stack** (plain **HTML5** and **CSS3**) with no framework overhead, deployed via **Netlify**.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/srmkzilla-hacktoberfest-2021",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://srmkzilla-hacktoberfest-2021.jagnani73.com",
      },
    ],
    stack: [STACK_NAMES.HTML, STACK_NAMES.CSS, STACK_NAMES.JAVASCRIPT],
  },
];

export const resumes: ResumeType[] = [
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766574863/jagnani73/resumes/20251223.png",
    resume:
      "https://drive.google.com/file/d/1onbdfPCgcTndFta_NYXg5yq3pW95FaMj/view?usp=drive_link",
    date: "23 December 2025",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476155/jagnani73/resumes/20230211.png",
    resume:
      "https://drive.google.com/file/d/14rlW_vq_1UX45zqnyAfPHyJpUSVuzIft/view?usp=drive_link",
    date: "11 February 2023",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476099/jagnani73/resumes/20220608.png",
    resume:
      "https://drive.google.com/file/d/1WKDcp6zL0sBMxacnGO4p6HsJ8SldjaDe/view?usp=drive_link",
    date: "08 July 2022",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476189/jagnani73/resumes/20220420.png",
    resume:
      "https://drive.google.com/file/d/1KZKfxRvsBRcUbAMmhkbIdwP4UovmZh9E/view?usp=drive_link",
    date: "20 April 2022",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476110/jagnani73/resumes/20210925.png",
    resume:
      "https://drive.google.com/file/d/1axpcLaEEe1iRD0eNrCCUDhMyMKXSyYVF/view?usp=drive_link",
    date: "25 September 2021",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476133/jagnani73/resumes/20210908.png",
    resume:
      "https://drive.google.com/file/d/1vJ7J7FC6ofYA15qHlpG_b-cvtBkSbb0e/view?usp=drive_link",
    date: "08 September 2021",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476077/jagnani73/resumes/20210206.png",
    resume:
      "https://drive.google.com/file/d/1UB8kkpx5yFxhm-EJojwFXU-omHmlGjQw/view?usp=drive_link",
    date: "06 February 2021",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476211/jagnani73/resumes/20200528.png",
    resume:
      "https://drive.google.com/file/d/1UlHEHcW_7nzP8NW61UlvmvPoYtYkscQl/view?usp=drive_link",
    date: "28 May 2020",
  },
];

export const coverLetter: string =
  "https://drive.google.com/file/d/1Feh-3W3H5yAkAAZYEgDth-TAJXoqGfqs/view?usp=drive_link";
