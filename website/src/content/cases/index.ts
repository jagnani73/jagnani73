import type { CaseData } from "@/utils/types/case.types";
import { claudeControllerCase } from "./claude-controller";
import { solanaMlDsa44Case } from "./solana-ml-dsa-44";
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
import { marqueeCase } from "./marquee";
import { shikshakCase } from "./shikshak";
import { frenCase } from "./fren";
import { storiesCase } from "./stories";
import { bharatBeaconCase } from "./bharat-beacon";

const AUTHORED: Record<string, CaseData> = {
  "claude-controller": claudeControllerCase,
  "solana-ml-dsa-44": solanaMlDsa44Case,
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
  marquee: marqueeCase,
  shikshak: shikshakCase,
  fren: frenCase,
  stories: storiesCase,
  "bharat-beacon": bharatBeaconCase,
};

// Declaration order is the single source of truth for each case's idx + size,
// derived in getCase — never hardcoded per file.
const ROSTER = Object.keys(AUTHORED);
const ROSTER_SIZE = ROSTER.length;

// Keeps the legacy /record/ai-agent-sdk URL resolving to the authored case.
const SLUG_ALIASES: Record<string, string> = { "ai-agent-sdk": "agent-sdk" };

export const ALL_CASE_SLUGS: string[] = ROSTER;

export const getCase = (slug: string): CaseData | null => {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  const authored = AUTHORED[canonical];
  if (!authored) return null;
  return {
    ...authored,
    idx: String(ROSTER.indexOf(canonical) + 1).padStart(2, "0"),
    rosterSize: ROSTER_SIZE,
  };
};

export const getCaseTitle = (slug: string): string =>
  getCase(slug)?.title ?? slug;

export const getAllCaseSlugs = (): string[] => ALL_CASE_SLUGS;
