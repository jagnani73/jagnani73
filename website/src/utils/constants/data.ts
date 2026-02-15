import { LINKS_NAMES, STACK_NAMES } from "@/utils/constants/shared-constants";
import type { ExperienceType } from "@/utils/types/experiences.types";
import type {
  CertificationType,
  HackathonType,
  ResearchPaperType,
  ResumeType,
} from "@/utils/types/home.types";
import type { ProjectType } from "@/utils/types/projects.types";

export const experiences: ExperienceType[] = [
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1766574046/jagnani73/experiences/2597dd2f-481e-4121-a1b7-9d12778ba44f.png",
    description:
      "CovalentHQ is a blockchain data provider offering comprehensive and transparent access to blockchain data in a unified API. I was given the ownership of a range of open-source products called GoldRush as a way of increasing the API consumption. GoldRush includes a GoldRush Decoder, which is expandable for contributors to add decoders that convert raw log events to structured, human-readable data. GoldRush also includes a GoldRush Kit which is a 'Smart Component' UI library for plug-n-play visualized data of over 200 chains.",
    designation: "Product Engineer",
    duration: "June 2023 - December 2025",
    org: "CovalentHQ",
    slug: "covalent",
    tag: "full-time",
    url: "https://www.covalenthq.com",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/hashmail_al48gr.png",
    description:
      "Hashmail is a comprehensive web3 mailbox client that centralizes all your different wallet addresses. As the owner and successful launch of two versions, I am proud to say that the main application of Hashmail has thousands of active users and has successfully integrated thousands of wallet addresses. Additionally, I have developed a proxy server that streamlines the process of sending and receiving emails and supports API integration with other applications.",
    designation: "Founding Engineer",
    duration: "July 2022 - June 2023",
    org: "Hashmail",
    slug: "hashmail",
    tag: "full-time",
    url: "https://hashmail.dev",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/quinence_c4lnln.png",
    org: "Quinence",
    url: "https://quinence.com/",
    designation: "Software Development Consultant",
    tag: "internship",
    description:
      "Quinence is another FinTech firm based on web3. In Quinence, I got the opportunity to explore web3 in-depth, NFTs, marketplaces, blockchain, smart contracts, and the latest buzz I got involved with. In Quinence, I was the engineering owner of two client-based projects. One was creating a metaverse. The other was an NFT marketplace, with filters, sorting, profile pages, and more.",
    duration: "January 2022 - April 2022",
    slug: "quinence",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/nwc_rlg3cg.png",
    org: "Networking & Communications Association",
    url: "https://www.instagram.com/nwcsrmist/",
    designation: "Founding Vice President",
    tag: "campus club",
    description:
      "I was on the founding board of the Networking and Communications Association. It is a student representative association delegated by my school's Networking and Communications Department. I had the opportunity to host some successful social events while laying the foundation of multiple internal projects.",
    duration: "September 2021 - January 2022",
    slug: "nwc",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472674/jagnani73/experiences/wealth42_xjniil.png",
    org: "wealth42",
    url: "https://wealth42.com",
    designation: "Software Development Intern",
    tag: "internship",
    description:
      "wealth42 was a delightful experience. It is a FinTech firm. I was the lead developer in over three projects, including the main website. I gained insights on class-based architectural systems, form implementation of directed graphs, and mail scraping. The main website was live and released features rolling. This made me develop things on a direct user feedback system. We had implemented our tracking that enhanced this aspect.",
    duration: "August 2021 - December 2021",
    slug: "wealth42",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/mlh_vd3dib.png",
    org: "Major League Hacking",
    url: "https://mlh.io/",
    designation: "Pre-Fellowship",
    tag: "fellowship",
    description:
      "Major League Hacking or MLH hosts numerous hackathons every weekend across the globe. They had recently started their fellowship program. I had applied to a track called explorer, which then converted to the Pre-fellowship. During my tenure, I interacted with people around the world and developed a CLI reminder application with them. We were split into pods, and every pod had a dedicated mentor.",
    duration: "July 2021 - August 2021",
    slug: "mlh",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/gcsrm_qqr7f5.png",
    org: "GitHub Community SRM",
    url: "https://githubtech.tech",
    designation: "Founding Administrator",
    tag: "campus club",
    description:
      "GitHub Community SRM is one of my most passionate steps toward OSS. It is an initiative undertaken by a group of students of SRMIST, including myself, with the sole purpose of starting the OSS revolution in SRMIST. We aim to consolidate all the projects and papers created in SRMIST under the banner of the SRMISTKTR GitHub Organisation. I've been an integral part of establishing this community, conducting events, and making the portal to facilitate this.",
    duration: "May 2021 - November 2022",
    slug: "gcsrm",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/slashpay_flui0b.png",
    org: "Slash",
    url: "https://www.slashpay.app/",
    designation: "Web Development Consultant",
    tag: "internship",
    description:
      "Slash was my first FinTech firm. As a hiring challenge, I created a landing website with some hidden easter eggs. Slash exposed me to the industrial lifestyle and deadlines. I made a dashboard that effectively was an analytics preview for the merchant, stock and orders management, and customer interaction. I also got the opportunity to look into the mass generation of static pages.",
    duration: "March 2021 - July 2021",
    slug: "slash",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/envision_amzz9a.png",
    org: "Team Envision",
    url: "https://envision.aaruush.org/",
    designation: "Committee Head",
    tag: "campus club",
    description:
      "Team Envision is the technical club of SRMIST's student-run, official Annual Techno-Management Fest, AARUUSH. Undertaking various platforms for the social cause, here I was a significant part of creating projects that supported the community—created portals that provisioned certificate distribution and events, the primary website for AARUUSH, and more.",
    duration: "July 2020 - Janurary 2022",
    slug: "envision",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472673/jagnani73/experiences/srmkzilla_kqrrks.png",
    org: "SRMKZILLA",
    url: "https://srmkzilla.net/",
    designation: "Lead - Technical",
    tag: "campus club",
    description:
      "SRMKZILLA, an official Mozilla Campus Club in SRMIST, has always been about spreading open-source. In SRMKZILLA, I got to work and experience various day-to-day management products, such as a mass mailer or a recruiting portal. I was a part of multiple projects representing the organization and worked with the companies to develop the same. In SRMKZILLA, I was trusted with the technical teams' management, including leading projects and organizing events.",
    duration: "June 2020 - November 2021",
    slug: "srmkzilla",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/collate_rtcny4.jpg",
    org: "Collate Innovations",
    url: "https://githubsrm.tech/",
    designation: "Full Stack Developer",
    tag: "internship",
    description:
      "In my first internship, Collate Innovations, I was exposed to the industrial application of ReactJS. Before this internship, I had worked on various projects, including some hackathon-winning ones. This internship taught me how to manage client expectations, how users look at an application, and what essentially UX is. Collate Innovations is an ed-tech platform that taught me how the workings of the industry happen.",
    duration: "June 2020 - September 2020",
    slug: "collate",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/dscommunity_unp27a.png",
    org: "Data Science Community SRM",
    url: "https://www.dscommunity.in/",
    designation: "Web Development Lead",
    tag: "campus club",
    description:
      "I started in Data Science Community SRM as a part of the founding team. The experience of creating a community and being a part of something from the core up was humbling. I was the lead developer in the community and took up various accessibility projects and management roles.",
    duration: "December 2019 - December 2020",
    slug: "dscommunity",
  },
];

export const projects: ProjectType[] = [
  {
    slug: "flux",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766567905/jagnani73/projects/flux/40534ebc-ecbe-4d84-81bc-943dce41227b.png",
    name: "Flux",
    tag: "website",
    description:
      "Flux is a Web3-native, AI-powered customer support platform designed for the decentralized economy. The platform empowers crypto organizations to deploy intelligent AI agents that resolve user queries with on-chain awareness and verifiable integrity. Flux bridges the gap between Web2 support tools and Web3 needs by creating autonomous, on-chain-aware AI agents that can read block explorers, interpret on-chain actions, and diagnose transaction failures. Built at ETHGlobal New Delhi 2025, this project won the Best use of Fluence Virtual Servers - Track Prize. The platform integrates with ENS for agent identity, Fluence Virtual Servers for decentralized compute, and ASI (Artificial Superintelligence Alliance) for agent architecture, enabling organizations to train agents on documentation, connect on-chain data, and authorize safe actions.",
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
      "DAOScape is a privacy-preserving DAO platform with reputation-based governance using Zero-Knowledge Proofs. The system leverages vlayer's Web Proof technology to enable privacy-preserving verification of social media accounts, email domains, and GitHub contributions, creating a governance mechanism that rewards genuine participation over pure capital holdings. The platform features zero-knowledge identity verification, an advanced multi-dimensional reputation system, sophisticated voting weights that balance reputation, token holdings, and participation rates, and dynamic governance supporting multiple proposal types. Built at ETHGlobal Prague, this project won the Blockscout Big Blockscout Explorer Pool Prize. The platform integrates with vlayer for ZKP verification, Blockscout for contract verification and analytics, and 1inch Protocol for treasury management.",
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
      "Dewls is a multi-chain arcade platform that allows users to battle with each other across various games like Rock-Paper-Scissors and Connect 4. The game data is handled on-chain and stored immutably to ensure transparency amongst competitors. Once a winner is decided, they are prompted to sign an attestation to mark their victory into the leaderboard and get a chance to win pool prizes distributed each weekend. This enables users to build a Proof-Of-Victory to showcase their skills. Built at ETHOnline 2024, this project won the Sign Protocol Pool Prize. The platform uses Web3Auth for authentication, Socket.io for real-time game logic, smart contracts deployed on Morph L2, Hedera, and Rootstock, and XMTP for user notifications.",
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
      "AI Agent SDK is a TypeScript SDK for building autonomous AI agents for the Zero-Employee Enterprise (ZEE). The SDK enables developers to create intelligent, context-aware agents with ease and functionality. It provides a unified interface for LLMs, supports single model inference calls to multi-agent systems with tools, and includes ZEE Workflows for composing agents to solve complex problems. The SDK is designed to be easily composable, extendable, and flexible for advanced use cases, supporting features like agents with system prompts, external tools, and workflow composition.",
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
      "GoldRush Kit is a beautifully designed React component library for web3 dApp frontends. Powered by the Covalent API, it provides pre-built components that easily fetch and display data from 100+ blockchains. The library is open-source, customizable, and includes components for token balances, NFT galleries, transaction receipts, and more. Built with React, TypeScript, and TailwindCSS, it offers a complete UI kit for building blockchain applications.",
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
      "GoldRush Decoder is a server-side API service that decodes unstructured, raw blockchain event logs into structured, human-readable data. The open-source project supports 200+ chains and provides a simple API endpoint to transform complex blockchain transaction events into meaningful structured data. Built with TypeScript and Node.js, it uses a configurable decoder system that allows contributors to add decoding logic for different protocols and events across multiple blockchains.",
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
      "LenDen is a cross-chain liquidity platform that enables owners of digital assets, especially those with NFTs or tokens on multiple blockchains, to use their assets to get liquidity cross-chain. The platform provides a seamless, user-friendly interface that makes the borrowing and lending process easier, allowing users to get liquidity in a simple and easy-to-understand way. LenDen also provides users with a cross-chain credibility score which enables them to become trusted users. In case of failure to do loan repayment, the platform either keeps the collateral or auctions it off. Built at Unfold 2023 hackathon, this project won First Place in the Router Protocol track by leveraging Router cross-talk contracts for seamless cross-chain functionality.",
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
      "deLinZK is a Zero-Knowledge solution providing a platform for organizations and employees to accurately issue Verifiable Credentials which serve as Proof-of-Employment. It provides a comprehensive job board allowing organizations to post jobs, and employees to apply to them. The organizations do not need to spend additional time verifying the work experience of applicants, since all of them are already verified by deLinZK through a ZKP way. Built at ETHforAll hackathon, this project addresses the problem of fake credentials and forged certificates in networking platforms by using Polygon ID for credential verification.",
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
      "NudgeLab is a hack which at its core is a no-code, platform independent nudge management service. It is a platform that wraps over the existing architecture of any infrastructure and through an admin panel, creates campaign based and trigger based nudges. A project wherein I worked completely on the backend and no frontend, except debugging. I created a CDN based approach for the campaign nudges and HTTP polling for the trigger based ones.",
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
      "Hospitatva is a hack that aims to eradicate scams done by hospitals for their limited and reserved resources. It is a distributed ledger-based blockchain implementation of the rates proposed and charged and the commodity count by hospitals for the treatment and consultancy of patients. I built the logic part of its frontend, gaining knowledge about DIDs, the Web of Trust and wallet authentication.",
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
      " I couldn't find a good react marquee package and thus decided to develop it. react-easy-marquee is a highly customisable `marquee` package for React built using CSS. Renders anything given between the tags, be it an image, text or a custom JSX element! It is a simple plug-and-play package and requires no external dependency.",
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
      "Shikshak is a hack that enables remote online education by minimising the data consumed exponentially. I built its frontend, which has two ends, a Teacher and a Student. I also implemented its WebRTC-based exchange of data.",
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
      "Contracts is a blockchain-based expense-splitter application. In it, a user can create an account to login to our web app. Once a user is logged in, he can add expenses, edit expenses, settle expenses, or delete transactions. All this is stored in logs so that a user is aware of deletions or edits made to a transaction. I created its complete frontend utilising blockchain-based authentication.",
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
      "GitHub Community SRM is a student-led community aimed at unifying all the projects and papers made in SRMIST under the banner of the SRM-IST-KTR GitHub Organisation. Its main website serves as a portal for the same. Students and Teachers can register themselves here under various projects. These registrations interact directly with GitHub APIs, creating the repositories, adding or removing people and more. I built the frontend of the registration portal.",
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
      "The Soulless Citadel was a client-based project created during my tenure in Quinence. The project serves as an NFT Marketplace on the Zilliqa blockchain. I developed the website's initial versions. I got an insight into RPC calls, wallet authentication and, in general, what a blockchain is during this project.",
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
      "wealth42 is a fintech company. The project initially started as an outsourced project given to SRMKZILLA. I was working on their landing application as a mentor for the recruits. Eventually, I got hired as a Software Development Intern in wealth42 and continued laying the foundation of this application. I implemented class-based directed graph forms and complex validation states in the project, optimising it for the end-user. I also created a custom user tracking system for the project.",
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
      "Stories is a mental health aid hack. It enables a user to choose its 'worries' and connect and chat with people of the same concerns for random advice seeking or release of frustration. The messages are protected with a censor layer in case of a toxic message. I developed its complete frontend, including the SocketIO-based chat application and admin panel.",
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
      "Fren is a hack that aims to bridge the gap between a therapist and their client. It is a note-taking application for journals and diary entries. The notes taken in it by a client are not shown to the therapist; instead, an analysis of the note, usage of words and terminologies and more. I built its complete frontend, including the therapist panel.",
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
      "BharatBeacon is a hack that was created for disaster management. It covers preemptive measures, mid-crisis solutions and post-crisis optimization. It is an IoT solution with a portal that is the Governments end. It showed the location of the distress calls on a map with information. I worked on the Government portal using MapBox APIs and HTTP Polling.",
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
      "AARUUSH is an annual student-led Techno-Management fest held in SRMIST. The fest has numerous events, workshops, competitions, etc., conducted across the year via all domains. AARUUSH Links was a project aiming at a cumulation for all the digital presence of these links. It also has an admin panel to add a category-specific event. I created the whole frontend of this project, including the admin panel which opens with an easter egg.",
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
      "OSSmosis was the first event conducted by GitHub Community SRM. It was an event that provided a platform for the participants to showcase their Open Source Software. The event required a Description, Rules, and Criteria section and a registration portal. The project taught me VueJS. The deployment was fully static as the project was a microsite.",
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
      "Inforged Noida is a web application project. The platform provides a modern interface for information management and display, built with contemporary web technologies to deliver a seamless user experience.",
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
      "Frame Fantasy is a client freelance project. It is a gallery website for a professional photographer. The requirements stated a gallery page for all the types of photos there are along with contact details for the first version. I used Cloudinary as an images CMS for the same. The second version will include a backend with notifying services for the Contact Me page.",
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
      "Sarthaka Foundation is an NGO. They wanted a presentation of all their work and events, and drives. This project was one of my first with NextJS, TypeScript and TailwindCSS. The requirements desired a complex paywall as well. I learned a lot of new things creating this project.",
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
      "Aashma Foundation is an NGO that needed a landing website. Data Science Community SRM was in charge of that. I, under the community, laid the foundation for the static site. Their requirements were minimal, only a static page displaying a gallery and details to accept donations. Based on the requirements, I chose the vanilla stack.",
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
      "KZ Links was a pure linktree adaption. It extended another project of SRMKZILLA, a URL shortener that also gave tracking statistics. It envisioned a highly customizable profile page. I was a mentor for this project. I taught and guided the recruits on how to use NextJS.",
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
      "Walleth is a dummy frontend for an NFT Marketplace WALL.app. Built with Next.js and TypeScript, it provides a modern and responsive interface for showcasing NFT marketplace functionality. The project demonstrates frontend development skills with a focus on creating an intuitive user experience for browsing and interacting with NFTs.",
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
      "Equivalent is a sample block explorer project that demonstrates a new approach to viewing blockchain data. Built with Next.js and powered by Covalent's API, it features human-readable data with no hex codes, keyboard shortcuts for navigation, and multichain support. The project includes wallet balances with NFT rendering, transaction history, asset flows, and transaction decoding for DEX, NFT, and lending protocols.",
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
      "NB Extract is a utility tool for extracting and processing data from notebooks. The project provides functionality to parse, extract, and transform notebook content into structured formats, making it easier to work with notebook data programmatically.",
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
      "TypeQuest is a library wrapper for keybindings on Keypress.JS. It provides a simple and extensible way to handle keyboard shortcuts in React applications. The library includes a shortcut component for easy integration and a singleton for the Keypress.JS listener, exposing native methods for extensibility. Built with TypeScript and Vite, it offers a clean API for managing keyboard interactions.",
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
      "Weather App is a web application that provides real-time weather information for locations worldwide. The app displays current weather conditions, forecasts, and other meteorological data in a clean and user-friendly interface. Built with modern web technologies, it demonstrates API integration and responsive design principles.",
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
      "DocGen was a simple hack created under Data Science Community SRM. Its purpose is to generate images with customisable cursive text to create a 'fake assignment'. My role in the project was to guide and mentor the recruits. I, myself, got an insight on PreactJS in doing so.",
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
      "MoreLinks was a brainchild of the Data Science Community SRM. It was simply a Linktree adaptation with more. MoreLinks had a preview of the community's latest buzz, including their tweets, posts, blogs and more. The website was completely static, wherein I taught and mentored the recruits on the vanilla stack.",
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
      "Data Science Community SRM was a new community in SRMIST. This website was the first instalment of their online presence. I was the only web developer in the community. This project was a public face of the community. It first was built entirely on the vanilla stack, during which I started learning ReactJS. Then migrated the whole website on ReactJS. I then eventually added a backend serving along with a NodeMailer-backed Contact-Us form.",
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
      "Institution of Engineers (India) or IEI of the Tamil Nadu branch had commissioned their website project to SRMKZILLA during my time there. The website was supposed to be a static frontend website for the first version. The data for the People and the Events pages was to be admin panel powered. This project was a great starter project for the full-stack recruits. I was a lead developer for the frontend (complete version 1 and partial version 2). Once the base was developed, the project was handed off to the recruits, with the original developers as mentors.",
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
      "Hacktoberfest, the annual celebration of Open Source Software, is a month-long event organized by DigitalOcean. In support of Hacktoberfest, communities all around the world host mini-events that utilize an official branding kit given by provided by DigitalOcean. SRMKZILLA, in my tenure there, also hosted a mini-event. This project was a microsite developed as the information as well as registration portal. A TypeForm handled the registration form. The microsite is entirely static and built on the vanilla stack.",
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

export const hackathons: HackathonType[] = [
  {
    name: "ETHGlobal New Delhi 2025",
    organizer: "ETHGlobal",
    award: "Best use of Fluence Virtual Servers - Track Prize",
    location: "New Delhi",
    duration: "September 2025",
    project: {
      name: "flux",
      slug: "flux",
    },
  },
  {
    name: "ETHGlobal Prague 2025",
    organizer: "ETHGlobal",
    award: "BlockScout Protocol Pool Prize - Track Prize",
    location: "Prague",
    duration: "May 2025",
    project: {
      name: "daoscape",
      slug: "daoscape",
    },
  },
  {
    name: "ETHOnline 2024",
    organizer: "ETHGlobal",
    award: "Sign Protocol Pool Prize - Track Prize",
    location: "Online",
    duration: "September 2024",
    project: {
      name: "dewls",
      slug: "dewls",
    },
  },
  {
    name: "Unfold 2023",
    organizer: "CoinDCX",
    award: "Best use of Router - Track Prize",
    location: "Online",
    duration: "November 2023",
    project: {
      name: "lenden",
      slug: "lenden",
    },
  },
  {
    name: "MOZOHACK 4.0",
    organizer: "SRMZKILLA",
    award: "Mentor",
    location: "Online",
    duration: "February 2023",
  },
  {
    name: "Participation",
    organizer: "Unknown",
    award: "Participation",
    location: "Online",
    duration: "February 2022",
    project: {
      name: "delinzk",
      slug: "delinzk",
    },
  },
  {
    name: "HackRx 3.0",
    organizer: "Bajaj Finserv",
    award: "Dark Horse - Power & Pace",
    location: "Pune",
    duration: "June 2022",
    project: {
      name: "NudgeLab",
      slug: "nudge-lab",
    },
  },
  {
    name: "Rookie Hacks II",
    organizer: "Major League Hacking",
    award: "Best Blockchain Project Using Hedera",
    location: "Online",
    duration: "May 2022",
    project: {
      name: "Contracts",
      slug: "contracts",
    },
  },
  {
    name: "Smart India Hackathon - Internals",
    organizer: "AICTE - SRMIST",
    location: "Online",
    duration: "March 2022",
    project: {
      name: "Hospitatva",
      slug: "hospitatva",
    },
    award: "Participation",
  },
  {
    name: "MOZOHACK 2.1",
    organizer: "SRMKZILLA",
    award: "Mentor",
    location: "Online",
    duration: "March 2021",
  },
  {
    name: "Hack CBS 3.0",
    organizer: "Major League Hacking",
    award: "Participation",
    location: "Online",
    duration: "October 2020",
    project: {
      name: "Stories",
      slug: "stories",
    },
  },
  {
    name: "Hack This Fall",
    organizer: "Major League Hacking",
    award: "First Position",
    location: "Online",
    duration: "October 2020",
    project: {
      name: "Shikshak",
      slug: "shikshak",
    },
  },
  {
    name: "HackTheMountains",
    organizer: "Major League Hacking",
    award: "Fourth Position",
    location: "Online",
    duration: "October 2020",
    project: {
      name: "Fren",
      slug: "fren",
    },
  },
  {
    name: "Code2Create 4.0",
    organizer: "ACM VIT - Student Chapter",
    award: "Best First Year Team",
    location: "Vellore",
    project: {
      name: "BharatBeacon",
      slug: "bharat-beacon",
    },
    duration: "March 2020",
  },
];

export const certifications: CertificationType[] = [
  {
    name: "Database Foundations",
    organization: "Oracle Academy",
    validity: "April 2022",
  },
  {
    name: "AWS Certified Cloud Practioner",
    organization: "Amazon Web Services",
    validity: "September 2021 - 2024",
  },
  {
    name: "Fundamentals of Red Hat Enterprise Linux",
    organization: "Red Hat Enterprise",
    validity: "September 2021",
  },
  {
    name: "The Bits and Bytes of Computer Networking",
    organization: "Google",
    validity: "May 2020",
  },
  {
    name: "Technical Support Fundamentals",
    organization: "Google",
    validity: "April 2020",
  },
  {
    name: "Palo Alto Networks Academy Cybersecurity Foundation",
    organization: "Palo Alto",
    validity: "April 2020",
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
  "https://drive.google.com/file/d/1CDPDs3WtyH9YBoUvPwHuHnHvSiIThK-K/view?usp=drive_link";

export const researchPapers: ResearchPaperType[] = [
  {
    title:
      "Implementing Dead Letter Exchanges in MQTT and Proposing a Broker Failure Algorithm Utilizing Blockchain DNS",
    date: "May 2023",
    url: "https://ieeexplore.ieee.org/document/10157491",
    tags: ["Blockchain", "MQTT", "IoT"],
    felicitation: "Gold Certificate (SRM Research Day)",
  },
  {
    title:
      "A Novel Pipeline for Compressing Image Buffers in Remote Education Video Conferencing using Harris Corner Detection and Pixel Map Array",
    date: "February 2023",
    url: "https://ieeexplore.ieee.org/document/10179787",
    tags: ["Image Processing", "Video Compression", "Remote Education"],
    felicitation: null,
  },
  {
    title:
      "Improving Fault Tolerance and Tackling Broker Failure in MQTT through Blockchain",
    date: "January 2023",
    url: "https://ieeexplore.ieee.org/document/10118032",
    tags: ["Blockchain", "MQTT", "Fault Tolerance"],
    felicitation: "Best Conference Paper",
  },
];
