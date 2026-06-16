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
