// Every fetchable number the design shows, with the hardcoded claim doubling as
// the fallback when an API call fails — the UI must never render a blank or a
// spinner for a stat. The fetchable ones are overridden at build time by
// getMetrics() in lib/fetch-metrics.ts (ISR, revalidate daily). See
// design_handoff_portfolio/PORT_NOTES.md.

export interface Metrics {
  agentSdkStars: number;
  agentSdkForks: number;
  agentSdkDownloads: string;
  goldrushKitStars: number;
  goldrushKitVersions: number;
}

export const METRICS: Metrics = {
  agentSdkStars: 119,
  agentSdkForks: 56,
  agentSdkDownloads: "2k+",
  goldrushKitStars: 105,
  goldrushKitVersions: 65,
};
