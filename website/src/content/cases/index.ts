import { projects } from "@/utils/constants/data";
import { projectToCase } from "@/lib/project-to-case";
import type { CaseData } from "@/content/case-types";
import { insidepolyCase } from "./insidepoly";
import { agentSdkCase } from "./agent-sdk";
import { dewlsCase } from "./dewls";
import { goldrushKitCase } from "./goldrush-kit";
import { goldrushDecoderCase } from "./goldrush-decoder";
import { fluxCase } from "./flux";
import { daoscapeCase } from "./daoscape";
import { lendenCase } from "./lenden";
import { delinzkCase } from "./delinzk";
import { nudgeLabCase } from "./nudge-lab";
import { contractsCase } from "./contracts";
import { hospitatvaCase } from "./hospitatva";
import { shikshakCase } from "./shikshak";
import { frenCase } from "./fren";
import { storiesCase } from "./stories";
import { bharatBeaconCase } from "./bharat-beacon";

// Fully authored cases, keyed by canonical slug.
const AUTHORED: Record<string, CaseData> = {
  insidepoly: insidepolyCase,
  "agent-sdk": agentSdkCase,
  dewls: dewlsCase,
  "goldrush-kit": goldrushKitCase,
  "goldrush-decoder": goldrushDecoderCase,
  flux: fluxCase,
  daoscape: daoscapeCase,
  lenden: lendenCase,
  delinzk: delinzkCase,
  "nudge-lab": nudgeLabCase,
  contracts: contractsCase,
  hospitatva: hospitatvaCase,
  shikshak: shikshakCase,
  fren: frenCase,
  stories: storiesCase,
  "bharat-beacon": bharatBeaconCase,
};

// Canonical roster (authored cases, in declaration order) — the single source of
// truth for each case's roster index and the roster size. Derived in getCase,
// never hardcoded per file: reorder/add a case here and idx + size follow.
const ROSTER = Object.keys(AUTHORED);
const ROSTER_SIZE = ROSTER.length;

// data.ts project slugs an authored case supersedes (avoids duplicate pages).
const SUPERSEDED = new Set([
  "insidepoly",
  "ai-agent-sdk",
  "dewls",
  "goldrush-kit",
  "goldrush-decoder",
  "flux",
  "daoscape",
  "lenden",
  "delinzk",
  "nudge-lab",
  "contracts",
  "hospitatva",
  "shikshak",
  "fren",
  "stories",
  "bharat-beacon",
]);
// data.ts slug → authored slug (the SDK project ships under a different slug).
const SLUG_ALIASES: Record<string, string> = { "ai-agent-sdk": "agent-sdk" };

const derivedProjects = projects.filter((p) => !SUPERSEDED.has(p.slug));

// Ordered universe of case slugs: authored first, then every other project.
export const ALL_CASE_SLUGS: string[] = [
  ...ROSTER,
  ...derivedProjects.map((p) => p.slug),
];

const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

const nextSlugAfter = (slug: string): string => {
  const i = ALL_CASE_SLUGS.indexOf(slug);
  return ALL_CASE_SLUGS[(i + 1) % ALL_CASE_SLUGS.length];
};

export const getCase = (slug: string): CaseData | null => {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  const authored = AUTHORED[canonical];
  if (authored)
    return {
      ...authored,
      idx: String(ROSTER.indexOf(canonical) + 1).padStart(2, "0"),
      rosterSize: ROSTER_SIZE,
    };
  const project = projectBySlug.get(slug);
  if (!project) return null;
  return projectToCase(project, nextSlugAfter(slug));
};

export const getCaseTitle = (slug: string): string =>
  getCase(slug)?.title ?? slug;

export const getAllCaseSlugs = (): string[] => ALL_CASE_SLUGS;
