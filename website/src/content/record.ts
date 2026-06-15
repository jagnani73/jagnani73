// content/record.ts — the complete record, ported from work-data.js.
// Kinds: EXPERIENCE | COMMUNITY | PROJECT | HACKATHON (win: true when awarded)
// | RESEARCH | EDUCATION | CERTIFICATION. `via` links a project to its origin. Internal
// urls point at /work/[slug] case pages (same-tab).

export type Kind =
  | "EXPERIENCE"
  | "COMMUNITY"
  | "PROJECT"
  | "HACKATHON"
  | "RESEARCH"
  | "EDUCATION"
  | "CERTIFICATION";

export interface RecordEntry {
  year: number;
  kind: Kind;
  title: string;
  meta: string;
  via?: string;
  url?: string;
  internal?: boolean;
  win?: boolean;
}

export type FilterId = Kind | "ALL" | "CASES";

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "CASES", label: "CASE STUDIES" },
  { id: "EXPERIENCE", label: "EXPERIENCE" },
  { id: "PROJECT", label: "PROJECTS" },
  { id: "HACKATHON", label: "HACKATHONS" },
  { id: "COMMUNITY", label: "COMMUNITY" },
  { id: "RESEARCH", label: "RESEARCH" },
  { id: "EDUCATION", label: "EDUCATION" },
  { id: "CERTIFICATION", label: "CERTIFICATIONS" },
];

// Kind → token color (Tailwind text-* class).
export const KIND_COLOR: Record<Kind, string> = {
  EXPERIENCE: "text-sig",
  COMMUNITY: "text-tx2",
  HACKATHON: "text-tx2",
  RESEARCH: "text-tx2",
  EDUCATION: "text-pri",
  CERTIFICATION: "text-tx3",
  PROJECT: "text-tx2",
};

export const kindColor = (r: RecordEntry): string =>
  r.kind === "HACKATHON" && r.win ? "text-acc" : KIND_COLOR[r.kind];

export const RECORD: RecordEntry[] = [
  // ── 2026 ──
  {
    year: 2026,
    kind: "EDUCATION",
    title: "NTU Singapore — MSc Blockchain",
    meta: "incoming · August 2026 intake",
    url: "https://www.ntu.edu.sg/",
  },
  {
    year: 2026,
    kind: "PROJECT",
    title: "InsidePoly",
    meta: "insider-trading surveillance for Polymarket · five-signal scoring engine · live",
    url: "/work/insidepoly",
    internal: true,
  },

  // ── 2025 ──
  {
    year: 2025,
    kind: "EXPERIENCE",
    title: "Covalent — Product Engineer",
    meta: "GoldRush suite · AI Agent SDK · SpeedRun · OHLCV streaming @ ~250ms · 2023–2025",
    url: "https://www.covalenthq.com",
  },
  {
    year: 2025,
    kind: "HACKATHON",
    win: true,
    title: "ETHGlobal New Delhi — Fluence track prize",
    meta: "Flux · web3-native AI support agents",
    url: "https://github.com/jagnani73/flux",
  },
  {
    year: 2025,
    kind: "HACKATHON",
    win: true,
    title: "ETHGlobal Prague — Blockscout pool prize",
    meta: "DAOScape · zk reputation-weighted governance",
    url: "https://ethglobal.com/showcase/daoscape-g8f8m",
  },
  {
    year: 2025,
    kind: "PROJECT",
    via: "hackathon",
    title: "Flux",
    meta: "AI support agents with on-chain awareness · uAgents + ENS + Fluence",
    url: "/work/flux",
    internal: true,
  },
  {
    year: 2025,
    kind: "PROJECT",
    via: "hackathon",
    title: "DAOScape",
    meta: "reputation-based DAO governance · vlayer web proofs on Base",
    url: "/work/daoscape",
    internal: true,
  },
  {
    year: 2025,
    kind: "PROJECT",
    via: "covalent",
    title: "SpeedRun",
    meta: "crypto-native vibe-coding platform · 1k+ active users · 150 token launches in month one",
  },
  {
    year: 2025,
    kind: "PROJECT",
    via: "client",
    title: "Inforged Noida",
    meta: "marketing site for an automotive customization studio",
    url: "https://www.inforgedautosnoida.com/",
  },

  // ── 2024 ──
  {
    year: 2024,
    kind: "PROJECT",
    via: "covalent",
    title: "AI Agent SDK",
    meta: "@covalenthq/ai-agent-sdk · agent orchestration for ZEE · 119★ · 2k+ downloads",
    url: "/work/agent-sdk",
    internal: true,
  },
  {
    year: 2024,
    kind: "PROJECT",
    via: "covalent",
    title: "GoldRush Kit",
    meta: "plug-n-play React components for on-chain data · 105★ · 65 versions",
    url: "/work/goldrush-kit",
    internal: true,
  },
  {
    year: 2024,
    kind: "PROJECT",
    via: "covalent",
    title: "GoldRush Decoder",
    meta: "raw EVM logs → structured events across 200+ chains · 9 contributors",
    url: "/work/goldrush-decoder",
    internal: true,
  },
  {
    year: 2024,
    kind: "HACKATHON",
    win: true,
    title: "ETHOnline — Sign Protocol pool prize",
    meta: "Dewls · on-chain arcade wagering",
    url: "https://ethglobal.com/showcase/dewls-oyj1w",
  },
  {
    year: 2024,
    kind: "PROJECT",
    via: "hackathon",
    title: "Dewls",
    meta: "arcade wagering · proof-of-victory attestations · Morph, Hedera, Rootstock",
    url: "/work/dewls",
    internal: true,
  },
  {
    year: 2024,
    kind: "PROJECT",
    title: "Equivalent",
    meta: "human-readable multichain block explorer on the Covalent API",
    url: "https://github.com/jagnani73/equivalent",
  },
  {
    year: 2024,
    kind: "PROJECT",
    title: "NB Extract",
    meta: "client-side Jupyter output extractor with PDF export",
    url: "https://github.com/jagnani73/nb-extract",
  },

  // ── 2023 ──
  {
    year: 2023,
    kind: "HACKATHON",
    win: true,
    title: "Unfold 2023 — Router track prize",
    meta: "LenDen · cross-chain lending · CoinDCX",
    url: "https://github.com/jagnani73/lenden",
  },
  {
    year: 2023,
    kind: "HACKATHON",
    title: "ETHForAll Online VIII",
    meta: "deLinZK · zk proof-of-employment",
    url: "https://github.com/jagnani73/delinzk",
  },
  {
    year: 2023,
    kind: "PROJECT",
    via: "hackathon",
    title: "LenDen",
    meta: "cross-chain lending & borrowing · Router cross-talk contracts",
    url: "/work/lenden",
    internal: true,
  },
  {
    year: 2023,
    kind: "PROJECT",
    via: "hackathon",
    title: "deLinZK",
    meta: "zk proof-of-employment credentials · Polygon ID · ETHForAll",
    url: "/work/delinzk",
    internal: true,
  },
  {
    year: 2023,
    kind: "RESEARCH",
    title: "Dead letter exchanges in MQTT + broker failure via blockchain DNS",
    meta: "IEEE · Gold Certificate, SRM Research Day",
    url: "https://ieeexplore.ieee.org/document/10157491",
  },
  {
    year: 2023,
    kind: "RESEARCH",
    title: "Compressing image buffers for remote education video conferencing",
    meta: "IEEE · Harris corner detection + pixel map arrays",
    url: "https://ieeexplore.ieee.org/document/10179787",
  },
  {
    year: 2023,
    kind: "RESEARCH",
    title: "Fault tolerance in MQTT through blockchain",
    meta: "IEEE · Best Conference Paper",
    url: "https://ieeexplore.ieee.org/document/10118032",
  },
  {
    year: 2023,
    kind: "EXPERIENCE",
    title: "Hashmail — Founding Engineer",
    meta: "wallet-native mail · 1000s of users · v1 → v2 · 2022–2023",
    url: "https://hashmail.dev",
  },
  {
    year: 2023,
    kind: "COMMUNITY",
    title: "MOZOHACK 4.0 — Mentor",
    meta: "SRMKZILLA",
    url: "https://srmkzilla.net/",
  },
  {
    year: 2023,
    kind: "PROJECT",
    via: "oss",
    title: "TypeQuest",
    meta: "typed keyboard-shortcut library for React ~",
    url: "https://github.com/jagnani73/typequest",
  },
  {
    year: 2023,
    kind: "PROJECT",
    title: "Weather App",
    meta: "real-time weather with full unit toggles · OpenWeatherMap ~",
    url: "https://github.com/jagnani73/weather-app",
  },
  {
    year: 2023,
    kind: "EDUCATION",
    title: "B.Tech CS — Cybersecurity · SRMIST",
    meta: "9.26/10.00 CGPA · first class with distinction · class of 2023",
  },

  // ── 2022 ──
  {
    year: 2022,
    kind: "EXPERIENCE",
    title: "Quinence — SDE Consultant",
    meta: "NFT marketplace + metaverse client builds · Jan–Apr 2022",
    url: "https://quinence.com/",
  },
  {
    year: 2022,
    kind: "COMMUNITY",
    title: "Networking & Communications Assoc. — Founding VP",
    meta: "SRMIST departmental association · 2021–2022",
  },
  {
    year: 2022,
    kind: "HACKATHON",
    win: true,
    title: "HackRx 3.0 — Dark Horse · Power & Pace",
    meta: "NudgeLab · Bajaj Finserv, Pune",
    url: "https://github.com/jagnani73/nudge-lab",
  },
  {
    year: 2022,
    kind: "HACKATHON",
    win: true,
    title: "Rookie Hacks II — Best Blockchain Project Using Hedera",
    meta: "Contracts · MLH",
    url: "https://github.com/jagnani73/contracts",
  },
  {
    year: 2022,
    kind: "HACKATHON",
    title: "Smart India Hackathon — Internals",
    meta: "Hospitatva · AICTE-SRMIST",
    url: "https://github.com/jagnani73/hospitatva",
  },
  {
    year: 2022,
    kind: "PROJECT",
    via: "hackathon",
    title: "NudgeLab",
    meta: "no-code nudge management · CDN delivery + message-queue triggers",
    url: "/work/nudge-lab",
    internal: true,
  },
  {
    year: 2022,
    kind: "PROJECT",
    via: "hackathon",
    title: "Contracts",
    meta: "immutable expense-splitting on Hedera smart contracts",
    url: "/work/contracts",
    internal: true,
  },
  {
    year: 2022,
    kind: "PROJECT",
    via: "hackathon",
    title: "Hospitatva",
    meta: "hospital price transparency ledger on Zilliqa · SIH internals",
    url: "/work/hospitatva",
    internal: true,
  },
  {
    year: 2022,
    kind: "PROJECT",
    via: "quinence",
    title: "The Soulless Citadel",
    meta: "story-driven NFT collection + marketplace on Zilliqa · for Shibui Labs",
    url: "https://soullesscitadel.com/",
  },
  {
    year: 2022,
    kind: "PROJECT",
    title: "WALLeth",
    meta: "NFT collector profile concept · ENS identity + collection analytics",
    url: "https://github.com/jagnani73/walleth",
  },
  {
    year: 2022,
    kind: "PROJECT",
    via: "client",
    title: "Frame Fantasy",
    meta: "photography portfolio for a Mumbai photographer · freelance",
    url: "https://framefantasy.co.in/",
  },
  {
    year: 2022,
    kind: "PROJECT",
    via: "community",
    title: "GitHub Community SRM portal",
    meta: "registration portal with live GitHub org automation",
    url: "https://github.com/jagnani73/githubsrm",
  },
  {
    year: 2022,
    kind: "CERTIFICATION",
    title: "Database Foundations",
    meta: "Oracle Academy",
  },

  // ── 2021 ──
  {
    year: 2021,
    kind: "EXPERIENCE",
    title: "wealth42 — SDE Intern",
    meta: "directed-graph form architecture · custom user tracking · 2021",
    url: "https://wealth42.com",
  },
  {
    year: 2021,
    kind: "EXPERIENCE",
    title: "Slash — Web Development Consultant",
    meta: "merchant dashboard · analytics · static page generation · 2021",
    url: "https://www.slashpay.app/",
  },
  {
    year: 2021,
    kind: "COMMUNITY",
    title: "MLH — Pre-Fellowship",
    meta: "explorer track · pod-based CLI project · 2021",
    url: "https://mlh.io/",
  },
  {
    year: 2021,
    kind: "COMMUNITY",
    title: "GitHub Community SRM — Founding Administrator",
    meta: "campus OSS revolution · events + portal · 2021–2022",
    url: "https://githubsrm.tech",
  },
  {
    year: 2021,
    kind: "COMMUNITY",
    title: "MOZOHACK 2.1 — Mentor",
    meta: "SRMKZILLA",
    url: "https://srmkzilla.net/",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "oss",
    title: "react-easy-marquee",
    meta: "zero-dependency CSS marquee · 105k+ npm downloads",
    url: "https://github.com/jagnani73/react-easy-marquee",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "wealth42",
    title: "wealth42 platform",
    meta: "class-based directed-graph onboarding flows",
    url: "https://wealth42.com/",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "community",
    title: "AARUUSH Links",
    meta: "link aggregator with easter-egg admin panel · AWS + Nginx",
    url: "https://github.com/jagnani73/aaruush-links",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "community",
    title: "KZ Links",
    meta: "profile pages over SRMKZILLA's URL shortener · mentor",
    url: "https://github.com/jagnani73/kz-links",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "community",
    title: "OSSmosis",
    meta: "event microsite · first Vue.js build",
    url: "https://github.com/jagnani73/ossmosis",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "community",
    title: "IEI Kattankulathur",
    meta: "Institution of Engineers local centre site · frontend lead",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "community",
    title: "SRMKZILLA Hacktoberfest",
    meta: "static registration microsite",
    url: "https://github.com/jagnani73/srmkzilla-hacktoberfest-2021",
  },
  {
    year: 2021,
    kind: "PROJECT",
    via: "client",
    title: "Sarthaka Foundation",
    meta: "NGO site with authenticated paywall ~",
    url: "https://sarthakafoundation.ngo",
  },
  {
    year: 2021,
    kind: "CERTIFICATION",
    title: "AWS Certified Cloud Practitioner",
    meta: "Amazon Web Services · 2021–2024",
  },
  {
    year: 2021,
    kind: "CERTIFICATION",
    title: "Fundamentals of Red Hat Enterprise Linux",
    meta: "Red Hat",
  },

  // ── 2020 ──
  {
    year: 2020,
    kind: "COMMUNITY",
    title: "Team Envision — Committee Head",
    meta: "AARUUSH fest portals · certificates + events · 2020–2022",
    url: "https://envision.aaruush.org/",
  },
  {
    year: 2020,
    kind: "COMMUNITY",
    title: "SRMKZILLA — Lead, Technical",
    meta: "Mozilla campus club · mass mailer · recruiting portal · 2020–2021",
    url: "https://srmkzilla.net/",
  },
  {
    year: 2020,
    kind: "EXPERIENCE",
    title: "Collate Innovations — Full Stack Developer",
    meta: "first internship · production React · 2020",
  },
  {
    year: 2020,
    kind: "HACKATHON",
    win: true,
    title: "Hack This Fall — First Position",
    meta: "Shikshak · MLH",
    url: "https://github.com/jagnani73/shikshak",
  },
  {
    year: 2020,
    kind: "HACKATHON",
    win: true,
    title: "HackTheMountains — Fourth Position",
    meta: "Fren · MLH",
    url: "https://github.com/jagnani73/fren",
  },
  {
    year: 2020,
    kind: "HACKATHON",
    win: true,
    title: "Code2Create 4.0 — Best First Year Team",
    meta: "BharatBeacon · ACM VIT",
    url: "https://github.com/jagnani73/BharatBeacon",
  },
  {
    year: 2020,
    kind: "HACKATHON",
    title: "HackCBS 3.0 — Hacker",
    meta: "Stories · MLH",
    url: "https://github.com/jagnani73/stories",
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "hackathon",
    title: "Shikshak",
    meta: "85% less data for remote classrooms · blackboard → pixel stream",
    url: "/work/shikshak",
    internal: true,
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "hackathon",
    title: "Fren",
    meta: "privacy-first therapy journaling · NLP sentiment pipeline",
    url: "/work/fren",
    internal: true,
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "hackathon",
    title: "Stories",
    meta: "anonymous peer support with toxicity filtering",
    url: "/work/stories",
    internal: true,
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "hackathon",
    title: "BharatBeacon",
    meta: "IoT disaster response · live distress map for authorities",
    url: "/work/bharat-beacon",
    internal: true,
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "community",
    title: "DocGen",
    meta: "handwritten-style assignment generator · mentor build",
    url: "https://github.com/jagnani73/docgen",
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "community",
    title: "Morelinks",
    meta: "link page with live social feeds · mentor build",
    url: "https://github.com/jagnani73/morelinks",
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "community",
    title: "Data Science Community site",
    meta: "vanilla → React → MERN, sole developer",
    url: "https://www.dscommunity.in/",
  },
  {
    year: 2020,
    kind: "PROJECT",
    via: "client",
    title: "Aashma Foundation",
    meta: "NGO landing + gallery · vanilla stack",
    url: "https://github.com/jagnani73/Aashma-Foundation",
  },
  {
    year: 2020,
    kind: "CERTIFICATION",
    title: "The Bits and Bytes of Computer Networking",
    meta: "Google",
  },
  {
    year: 2020,
    kind: "CERTIFICATION",
    title: "Technical Support Fundamentals",
    meta: "Google",
  },
  {
    year: 2020,
    kind: "CERTIFICATION",
    title: "Cybersecurity Foundation",
    meta: "Palo Alto Networks Academy",
  },

  // ── 2019 ──
  {
    year: 2019,
    kind: "COMMUNITY",
    title: "Data Science Community SRM — Web Dev Lead",
    meta: "founding team · sole web developer · 2019–2020",
    url: "https://www.dscommunity.in/",
  },
];

// Entries with a case-study page (internal /work/[slug] links).
export const isCase = (r: RecordEntry): boolean => !!r.internal;

// Per-kind tallies, recomputed at build (never hardcoded). ALL = total length,
// CASES = entries with a case page.
export const getRecordCounts = (): Record<FilterId, number> => {
  const counts = { ALL: RECORD.length } as Record<FilterId, number>;
  for (const f of FILTERS) {
    if (f.id === "ALL") continue;
    if (f.id === "CASES") {
      counts[f.id] = RECORD.filter(isCase).length;
      continue;
    }
    counts[f.id] = RECORD.filter((r) => r.kind === f.id).length;
  }
  return counts;
};

// Within a year, order entries: experience → each project immediately followed
// by its hackathon win → any standalone hackathons → research → community →
// education → certs. A hackathon is paired to its project by matching the project
// title at the start of the hackathon's meta ("Flux · …", "DAOScape · …").
const KIND_RANK: Record<Kind, number> = {
  EXPERIENCE: 0,
  PROJECT: 1,
  HACKATHON: 2,
  RESEARCH: 3,
  COMMUNITY: 4,
  EDUCATION: 5,
  CERTIFICATION: 6,
};

export const sequenceYear = (entries: RecordEntry[]): RecordEntry[] => {
  const ranked = entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => KIND_RANK[a.e.kind] - KIND_RANK[b.e.kind] || a.i - b.i)
    .map((x) => x.e);

  const hackathons = ranked.filter((e) => e.kind === "HACKATHON");
  const used = new Set<RecordEntry>();
  const result: RecordEntry[] = [];

  for (const e of ranked) {
    if (e.kind === "HACKATHON" && used.has(e)) continue;
    result.push(e);
    if (e.kind === "PROJECT") {
      const hack = hackathons.find(
        (h) =>
          !used.has(h) && h.meta.toLowerCase().startsWith(e.title.toLowerCase())
      );
      if (hack) {
        used.add(hack);
        result.push(hack);
      }
    }
  }
  return result;
};

// Deterministic short hash shown beside a confirmed year ("0x….").
export const yearHash = (y: number): string => {
  let h = (y * 2654435761) >>> 0;
  let s = "";
  for (let i = 0; i < 4; i++) {
    s += "0123456789abcdef"[h & 15];
    h = (h * 69069 + 1) >>> 0;
    h ^= h >>> 7;
  }
  return "0x" + s;
};
