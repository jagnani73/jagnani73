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
};

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
]);
// data.ts slug → authored slug (the SDK project ships under a different slug).
const SLUG_ALIASES: Record<string, string> = { "ai-agent-sdk": "agent-sdk" };

const derivedProjects = projects.filter((p) => !SUPERSEDED.has(p.slug));

// Ordered universe of case slugs: authored first, then every other project.
export const ALL_CASE_SLUGS: string[] = [
  ...Object.keys(AUTHORED),
  ...derivedProjects.map((p) => p.slug),
];

const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

const nextSlugAfter = (slug: string): string => {
  const i = ALL_CASE_SLUGS.indexOf(slug);
  return ALL_CASE_SLUGS[(i + 1) % ALL_CASE_SLUGS.length];
};

export const getCase = (slug: string): CaseData | null => {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  if (AUTHORED[canonical]) return AUTHORED[canonical];
  const project = projectBySlug.get(slug);
  if (!project) return null;
  return projectToCase(project, nextSlugAfter(slug));
};

export const getCaseTitle = (slug: string): string =>
  getCase(slug)?.title ?? slug;

export const getAllCaseSlugs = (): string[] => ALL_CASE_SLUGS;
