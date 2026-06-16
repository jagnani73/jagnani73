// Fallback stats (UI must never render blank/spinner). Overridden at build by
// getMetrics() in utils/functions/fetch-metrics.ts (ISR, daily).

import type { Metrics } from "@/utils/types/metrics.types";

export const METRICS: Metrics = {
  agentSdkStars: 119,
  agentSdkForks: 56,
  agentSdkDownloads: "2k+",
  goldrushKitStars: 105,
  goldrushKitVersions: 65,
};
