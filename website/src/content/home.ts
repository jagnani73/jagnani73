import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/utils/constants/site";
import type { Chapter, Person } from "@/utils/types/home.types";

export const DECK = "software, shipped at agent speed";

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

export const PERSON: Person = {
  quote: { pre: "Engineer by trade. ", emphasis: "Builder by reflex." },
  bio: [
    [
      {
        t: "I'm a blockchain software engineer who likes living close to the data layer — turning raw on-chain noise into interfaces and tools people actually trust. This August I'm heading to ",
      },
      { t: "NTU Singapore", em: true },
      {
        t: " for an MSc in Blockchain, to go deeper on the systems I keep gravitating toward.",
      },
    ],
    [
      { t: "I " },
      { t: "think best in public", em: true },
      {
        t: " — half-formed repos, hackathon demos, things shipped before they're ready. Most of my best work started as a 48-hour build I couldn't stop poking at long after the judging was over.",
      },
    ],
    [
      {
        t: "Away from the editor it's usually music, a long look at the night sky, or a show that won't leave my head for days. I like things — code and otherwise — that are ",
      },
      { t: "built to be understood,", em: true },
      { t: " not just to work." },
    ],
  ],
  arcadeCaption: "↑ a different game every visit — beat my score",
  currently: [
    ["CURRENTLY", "shipping toward NTU · always a side project"],
    ["BASED", "New Delhi, India — Singapore from Aug 2026"],
    ["OFF THE CLOCK", "music · astronomy · shows that make me think"],
    ["ALWAYS UP FOR", "a hackathon, a hard data problem, good coffee"],
  ],
  links: [
    { label: "github / jagnani73 ↗", href: GITHUB_URL, external: true },
    {
      label: "linkedin / yashvardhan-jagnani ↗",
      href: LINKEDIN_URL,
      external: true,
    },
    {
      label: "yashjagnani73@gmail.com ↗",
      href: `mailto:${EMAIL}`,
      external: false,
    },
  ],
  resume: { label: "resume — dec 2025", href: "/api/resume" },
};
