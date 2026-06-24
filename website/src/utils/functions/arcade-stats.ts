import "server-only";
import { and, desc, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "@/utils/functions/db";
import { arcadeEvents } from "@/common/database/schema";
import type {
  ArcadeStats,
  GameBest,
  VisitorTop,
} from "@/utils/types/arcade-stats.types";
import type { ArcadeGameKey, GameMode } from "@/utils/types/arcade.types";

// Read side of the arcade sink. One batched fan-out of aggregate queries powering
// /arcade/stats. Counts are cast to ::int and sums to ::float8 so the Neon driver
// returns JS numbers (bigint would come back as a string — and the `sql<number>`
// generics are unchecked assertions: drop a cast and you'd get a string typed as
// number with no compile error). Never throws: a missing DB → EMPTY
// (configured:false, an expected Preview/dev state); a thrown query → errored:true,
// kept distinct so a real failure (e.g. schema drift after db:pull) isn't hidden
// as "no data" on this unmonitored page.

const EMPTY: ArcadeStats = {
  configured: false,
  errored: false,
  totals: { views: 0, starts: 0, plays: 0, visitors: 0, playMs: 0 },
  byGame: [],
  bests: [],
  fastestReaction: null,
  longestStreak: null,
  letters: [],
  topWords: [],
  topVisitorOverall: null,
  topVisitorGame: null,
};

// Anonymous, non-reversible label from the visitor uuid — never expose the full id.
const anon = (id: string | null): string =>
  id ? `#${id.slice(0, 4)}` : "#????";

export const getArcadeStats = async (): Promise<ArcadeStats> => {
  if (!db) return EMPTY;
  const play = eq(arcadeEvents.type, "play");

  try {
    const [
      totalsRows,
      byGame,
      bestRows,
      streakRows,
      letters,
      topWords,
      vOverallRows,
      vGameRows,
    ] = await Promise.all([
      db
        .select({
          views: sql<number>`(count(*) filter (where ${arcadeEvents.type} = 'view'))::int`,
          starts: sql<number>`(count(*) filter (where ${arcadeEvents.type} = 'start'))::int`,
          plays: sql<number>`(count(*) filter (where ${arcadeEvents.type} = 'play'))::int`,
          visitors: sql<number>`(count(distinct ${arcadeEvents.visitorId}))::int`,
          playMs: sql<number>`coalesce(sum(${arcadeEvents.durationMs}) filter (where ${arcadeEvents.type} = 'play'), 0)::float8`,
        })
        .from(arcadeEvents),
      db
        // ordered desc → the page reads byGame[0] as the max for bar scaling
        .select({
          game: sql<ArcadeGameKey>`${arcadeEvents.game}`,
          plays: sql<number>`(count(*))::int`,
        })
        .from(arcadeEvents)
        .where(play)
        .groupBy(arcadeEvents.game)
        .orderBy(desc(sql`count(*)`)),
      db
        .select({
          game: sql<ArcadeGameKey>`${arcadeEvents.game}`,
          mode: sql<GameMode>`max(${arcadeEvents.mode})`,
          minScore: sql<number | null>`min(${arcadeEvents.score})::int`,
          maxScore: sql<number | null>`max(${arcadeEvents.score})::int`,
          wins: sql<number>`(count(*) filter (where ${arcadeEvents.outcome} = 'win'))::int`,
        })
        .from(arcadeEvents)
        .where(play)
        .groupBy(arcadeEvents.game),
      db
        .select({
          streak: sql<number | null>`max(${arcadeEvents.winStreak})::int`,
        })
        .from(arcadeEvents)
        .where(play),
      db
        .select({
          letter: sql<string>`${arcadeEvents.firstLetter}`,
          n: sql<number>`(count(*))::int`,
          pct: sql<number>`round(count(*) * 100.0 / sum(count(*)) over (), 1)::float8`,
        })
        .from(arcadeEvents)
        .where(
          and(
            eq(arcadeEvents.game, "wordle"),
            isNotNull(arcadeEvents.firstLetter),
          ),
        )
        .groupBy(arcadeEvents.firstLetter)
        .orderBy(desc(sql`count(*)`)),
      db
        .select({
          word: sql<string>`${arcadeEvents.firstWord}`,
          n: sql<number>`(count(*))::int`,
        })
        .from(arcadeEvents)
        .where(
          and(
            eq(arcadeEvents.game, "wordle"),
            isNotNull(arcadeEvents.firstWord),
          ),
        )
        .groupBy(arcadeEvents.firstWord)
        .orderBy(desc(sql`count(*)`))
        .limit(8),
      db
        .select({
          visitor: sql<string>`${arcadeEvents.visitorId}`,
          plays: sql<number>`(count(*))::int`,
        })
        .from(arcadeEvents)
        .where(and(play, isNotNull(arcadeEvents.visitorId)))
        .groupBy(arcadeEvents.visitorId)
        .orderBy(desc(sql`count(*)`))
        .limit(1),
      db
        .select({
          visitor: sql<string>`${arcadeEvents.visitorId}`,
          game: sql<ArcadeGameKey>`${arcadeEvents.game}`,
          plays: sql<number>`(count(*))::int`,
        })
        .from(arcadeEvents)
        .where(and(play, isNotNull(arcadeEvents.visitorId)))
        .groupBy(arcadeEvents.visitorId, arcadeEvents.game)
        .orderBy(desc(sql`count(*)`))
        .limit(1),
    ]);

    const bests: GameBest[] = bestRows.map((r) => ({
      game: r.game,
      mode: r.mode,
      best:
        r.mode === "min" ? r.minScore : r.mode === "max" ? r.maxScore : r.wins,
    }));

    const vOverall = vOverallRows[0];
    const vGame = vGameRows[0];
    const topVisitorOverall: VisitorTop | null = vOverall
      ? { label: anon(vOverall.visitor), plays: vOverall.plays }
      : null;
    const topVisitorGame: VisitorTop | null = vGame
      ? { label: anon(vGame.visitor), plays: vGame.plays, game: vGame.game }
      : null;

    return {
      configured: true,
      errored: false,
      totals: totalsRows[0] ?? EMPTY.totals,
      byGame,
      bests,
      fastestReaction: bests.find((b) => b.game === "reaction")?.best ?? null,
      longestStreak: streakRows[0]?.streak ?? null,
      letters,
      topWords,
      topVisitorOverall,
      topVisitorGame,
    };
  } catch (err) {
    // unexpected — surface loudly and flag distinctly (not "no data")
    console.error("[arcade] stats query failed:", err);
    return { ...EMPTY, configured: true, errored: true };
  }
};
