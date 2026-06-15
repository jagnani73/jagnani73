import { METRICS, type Metrics } from "@/content/metrics";

const DAY = 86400;

// All fetches opt into ISR (revalidate daily) and degrade silently to the
// hardcoded fallback in METRICS. Call only from Server Components.

const fetchRepo = async (
  repo: string,
): Promise<{ stars: number; forks: number } | null> => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: DAY },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      stargazers_count?: number;
      forks_count?: number;
    };
    if (
      typeof json.stargazers_count !== "number" ||
      typeof json.forks_count !== "number"
    ) {
      return null;
    }
    return { stars: json.stargazers_count, forks: json.forks_count };
  } catch {
    return null;
  }
};

const fetchNpmVersionCount = async (pkg: string): Promise<number | null> => {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(pkg)}`,
      { next: { revalidate: DAY } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { versions?: Record<string, unknown> };
    const count = json.versions ? Object.keys(json.versions).length : 0;
    return count > 0 ? count : null;
  } catch {
    return null;
  }
};

export const getMetrics = async (): Promise<Metrics> => {
  const [agentSdk, goldrushRepo, goldrushVersions] = await Promise.all([
    fetchRepo("covalenthq/ai-agent-sdk"),
    fetchRepo("covalenthq/goldrush-kit"),
    fetchNpmVersionCount("@covalenthq/goldrush-kit"),
  ]);

  return {
    ...METRICS,
    agentSdkStars: agentSdk?.stars ?? METRICS.agentSdkStars,
    agentSdkForks: agentSdk?.forks ?? METRICS.agentSdkForks,
    goldrushKitStars: goldrushRepo?.stars ?? METRICS.goldrushKitStars,
    goldrushKitVersions: goldrushVersions ?? METRICS.goldrushKitVersions,
  };
};
