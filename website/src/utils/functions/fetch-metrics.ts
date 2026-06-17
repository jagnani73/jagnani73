import { METRICS } from "@/content/metrics";
import type { Metrics } from "@/utils/types/metrics.types";

const DAY = 86400;

// ISR (daily): live GitHub/npm numbers when reachable, else the METRICS fallback.
// Every failure is logged (visible in build/function logs) but never throws, so a
// dead endpoint degrades to stale-but-plausible numbers, not a broken page.
// Server Components only.

const fetchRepo = async (
  repo: string,
): Promise<{ stars: number; forks: number } | null> => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: DAY },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      console.warn(`[metrics] github ${repo} → ${res.status}`);
      return null;
    }
    const json = (await res.json()) as {
      stargazers_count?: number;
      forks_count?: number;
    };
    if (
      typeof json.stargazers_count !== "number" ||
      typeof json.forks_count !== "number"
    ) {
      console.warn(`[metrics] github ${repo} → unexpected response shape`);
      return null;
    }
    return { stars: json.stargazers_count, forks: json.forks_count };
  } catch (e) {
    console.warn(`[metrics] github ${repo} fetch failed`, e);
    return null;
  }
};

const fetchNpmVersionCount = async (pkg: string): Promise<number | null> => {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(pkg)}`,
      { next: { revalidate: DAY } },
    );
    if (!res.ok) {
      console.warn(`[metrics] npm ${pkg} → ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { versions?: Record<string, unknown> };
    const count = json.versions ? Object.keys(json.versions).length : 0;
    if (count === 0) console.warn(`[metrics] npm ${pkg} → no versions found`);
    return count > 0 ? count : null;
  } catch (e) {
    console.warn(`[metrics] npm ${pkg} fetch failed`, e);
    return null;
  }
};

export const getMetrics = async (): Promise<Metrics> => {
  // The per-source helpers never throw, but wrap the aggregation too so a future
  // edit can't take down the whole page over a cosmetic star count.
  try {
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
  } catch (e) {
    console.warn("[metrics] aggregation failed — using static fallback", e);
    return METRICS;
  }
};
