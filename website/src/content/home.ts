import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/utils/constants/site";
import type { Chapter, Person } from "@/utils/types/home.types";
import { getHackathonStats } from "./record";

export const DECK = "software, shipped at agent speed";

// Read from RECORD rather than typed by hand, so the counts cannot drift.
// Safe to import here: chapters.tsx is a server component, so no case bodies
// reach the client bundle.
const HACK = getHackathonStats();

export const CHAPTERS: Chapter[] = [
  {
    n: "I",
    org: "AFTER B.TECH",
    role: "Infinia · Covalent · 2023–2026",
    deck: "post-quantum signatures on every surface a Solana node signs at Infinia, plus Global Citizen's on-chain donation path; the GoldRush suite and SpeedRun at Covalent.",
    deckLinks: [
      { text: "Infinia", url: "https://infiniatechnologies.com/" },
      { text: "Covalent", url: "https://www.covalenthq.com" },
    ],
    // Two per employer, in the deck's order. The Infinia pair is lifted from
    // the ML-DSA-44 case's own stats; Global Citizen has no measured numbers.
    stats: [
      ["FIPS 204", "NIST standard, implemented"],
      ["5", "Solana signing surfaces"],
      ["119★", "AI Agent SDK"],
      ["1k+", "SpeedRun users, month one"],
    ],
  },
  {
    n: "II",
    org: "THE COLLEGE YEARS",
    role: "Hashmail · Quinence · SRMIST - 2019–2023",
    deck: "founding engineer on Hashmail's wallet-native mail; web3 client builds at Quinence, alongside four internships and six campus founding roles.",
    stats: [
      ["1000s", "Hashmail users"],
      ["v1 → v2", "launches owned"],
      ["9.26", "CGPA, distinction"],
    ],
  },
  {
    n: "III",
    org: "THE WEEKENDS",
    role: "Hackathons · since 2020 · a parallel track through every era",
    url: "https://ethglobal.com",
    deck: "weekends of building in public: prediction markets, zk governance, on-chain arcades.",
    stats: [
      [`${HACK.total}`, "hackathons"],
      [`${HACK.wins}`, "awards"],
      [`${HACK.ethGlobal}×`, "ETHGlobal prizes"],
    ],
  },
  {
    n: "IV",
    org: "THE PAPERS",
    role: "IEEE · 2023",
    url: "https://ieeexplore.ieee.org/document/10157491",
    deck: "blockchain meets MQTT: broker failure, fault tolerance, and dead letter exchanges, peer-reviewed.",
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
        t: "I'm a blockchain software engineer who likes living close to the data layer, turning raw on-chain noise into interfaces and tools people actually trust. I'm now at ",
      },
      { t: "NTU Singapore", em: true },
      {
        t: " for an MSc in Blockchain, going deeper on the systems I keep gravitating toward.",
      },
    ],
    [
      { t: "I " },
      { t: "think best in public", em: true },
      {
        t: ": half-formed repos, hackathon demos, things shipped before they're ready. Most of my best work started as a 48-hour build I couldn't stop poking at long after the judging was over.",
      },
    ],
    [
      {
        t: "Away from the editor it's usually music, a long look at the night sky, or a show that won't leave my head for days. I like things (code and otherwise) that are ",
      },
      { t: "built to be understood,", em: true },
      { t: " not just to work." },
    ],
  ],
  arcadeCaption: "↑ a different game every visit, beat my score",
  currently: [
    ["CURRENTLY", "MSc Blockchain at NTU · always a side project"],
    ["BASED", "Singapore - via New Delhi, India"],
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
  resume: { label: "resume - aug 2026", href: "/api/resume" },
};
