// Home page content, ported from the design prototype (home.jsx). Baked final
// state: accent = gold, deck = "agent speed", contours band, work tagline below·mono.

export const DECK_LINES = ["software,", "shipped at agent speed"] as const;

export interface Chapter {
  n: string;
  org: string;
  role: string;
  url: string;
  deck: string;
  stats: [value: string, label: string][];
}

export const CHAPTERS: Chapter[] = [
  {
    n: "I",
    org: "AFTER B.TECH",
    role: "Covalent — Product Engineer · 2023–2025 · +2 entries coming",
    url: "https://www.covalenthq.com",
    deck: "owned the GoldRush suite at Covalent, built the AI Agent SDK, led SpeedRun, and streamed live OHLCV out of raw swap logs.",
    stats: [
      ["~250ms", "OHLCV streaming"],
      ["119★", "AI Agent SDK"],
      ["1k+", "SpeedRun users, month one"],
      ["3", "GoldRush products owned"],
    ],
  },
  {
    n: "II",
    org: "THE COLLEGE YEARS",
    role: "Hashmail · Quinence · SRMIST — 2019–2023",
    url: "https://hashmail.dev",
    deck: "founding engineer on Hashmail's wallet-native mail; web3 client builds at Quinence — alongside four internships and six campus founding roles.",
    stats: [
      ["1000s", "Hashmail users"],
      ["v1 → v2", "launches owned"],
      ["9.26", "CGPA, distinction"],
    ],
  },
  {
    n: "III",
    org: "THE WEEKENDS",
    role: "Hackathons · 2020 – · a parallel track through every era",
    url: "https://ethglobal.com",
    deck: "fourteen weekends of building in public — prediction markets, zk governance, on-chain arcades.",
    stats: [
      ["14", "hackathons"],
      ["9", "awards"],
      ["3×", "ETHGlobal prizes"],
    ],
  },
  {
    n: "IV",
    org: "THE PAPERS",
    role: "IEEE · 2023",
    url: "https://ieeexplore.ieee.org/document/10118032",
    deck: "blockchain meets MQTT — broker failure, fault tolerance, and dead letter exchanges, peer-reviewed.",
    stats: [
      ["3", "publications"],
      ["1×", "best conference paper"],
    ],
  },
];

export interface SelectedWorkItem {
  id: string;
  title: string;
  meta: string;
  year: string;
  /** Authored tag; overridden by live metrics when `metric` is set. */
  tag: string;
  metric?: "agentSdk" | "goldrushKit";
  href: string;
  internal?: boolean;
  win?: boolean;
  img: string;
}

export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    id: "insidepoly",
    title: "INSIDEPOLY",
    meta: "insider-trading surveillance for Polymarket · five-signal PL/pgSQL scoring engine",
    year: "2026",
    tag: "live",
    href: "/work/insidepoly",
    internal: true,
    img: "https://res.cloudinary.com/jagnani73/image/upload/v1773432165/jagnani73/projects/insidepoly/d751cba0-010f-47f0-9464-cb961eba2fe6.png",
  },
  {
    id: "agent-sdk",
    title: "AI AGENT SDK",
    meta: "agent orchestration for the Zero-Employee Enterprise · @covalenthq/ai-agent-sdk",
    year: "2024",
    tag: "119★ · 2k+ dl",
    metric: "agentSdk",
    href: "/work/agent-sdk",
    internal: true,
    img: "https://res.cloudinary.com/jagnani73/image/upload/v1766567167/jagnani73/projects/ai-agent-sdk/68955376-450a-4c28-9ed6-3eb4b8f391bf.png",
  },
  {
    id: "goldrush-kit",
    title: "GOLDRUSH KIT",
    meta: "plug-n-play React components for on-chain data across 200+ chains · 65 versions shipped",
    year: "2024",
    tag: "105★",
    metric: "goldrushKit",
    href: "https://github.com/covalenthq/goldrush-kit",
    img: "https://res.cloudinary.com/jagnani73/image/upload/v1766565005/jagnani73/projects/goldrush-kit/e0dd45f7-2dea-49bc-ac33-a7bbfdfeda05.png",
  },
  {
    id: "react-easy-marquee",
    title: "REACT-EASY-MARQUEE",
    meta: "zero-dependency CSS marquee for React · my most-installed artifact",
    year: "2021",
    tag: "105k+ downloads",
    href: "https://github.com/jagnani73/react-easy-marquee",
    img: "https://res.cloudinary.com/jagnani73/image/upload/v1714473627/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-10_vyyznz.png",
  },
  {
    id: "flux",
    title: "FLUX",
    meta: "web3-native AI support agents with on-chain awareness · uAgents + ENS + Fluence",
    year: "2025",
    tag: "ETHGlobal prize",
    win: true,
    href: "https://github.com/jagnani73/flux",
    img: "https://res.cloudinary.com/jagnani73/image/upload/v1766567905/jagnani73/projects/flux/40534ebc-ecbe-4d84-81bc-943dce41227b.png",
  },
  {
    id: "daoscape",
    title: "DAOSCAPE",
    meta: "zk reputation-weighted DAO governance · vlayer web proofs on Base",
    year: "2025",
    tag: "ETHGlobal prize",
    win: true,
    href: "https://ethglobal.com/showcase/daoscape-g8f8m",
    img: "https://res.cloudinary.com/jagnani73/image/upload/v1766567343/jagnani73/projects/daoscape/46c6a4ff-3e28-494b-ab29-d284403ac1a2.png",
  },
];

export const PERSON = {
  quote: {
    pre: "The tools change; the goal stays the same — ",
    emphasis: "build things that solve real problems.",
  },
  education: "B.TECH COMPUTER SCIENCE AND ENGINEERING — CYBERSECURITY · SRMIST, CHENNAI · 2023",
  cgpa: "9.26 / 10.00 CGPA",
  cgpaNote: " — FIRST CLASS WITH DISTINCTION",
  next: "MSC BLOCKCHAIN · NTU SINGAPORE · AUGUST 2026",
  beyond: "BEYOND CODE — music · astronomy · shows that make me think",
  links: [
    {
      label: "github / jagnani73 ↗",
      href: "https://github.com/jagnani73/",
      external: true,
    },
    {
      label: "linkedin / yashvardhan-jagnani ↗",
      href: "https://www.linkedin.com/in/yashvardhan-jagnani/",
      external: true,
    },
    {
      label: "twitter / jagnani73 ↗",
      href: "https://twitter.com/jagnani73",
      external: true,
    },
    {
      label: "yashjagnani73@gmail.com ↗",
      href: "mailto:yashjagnani73@gmail.com",
      external: false,
    },
  ],
  resume: { label: "résumé — dec 2025 ↗", href: "/api/resume" },
} as const;
