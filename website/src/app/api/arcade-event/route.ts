import { db } from "@/utils/functions/db";
import { arcadeEvents } from "@/common/database/schema";
import { isPrivacyGatedCountry } from "@/utils/constants/privacy";
import { ARCADE_GAME_KEYS } from "@/utils/constants/arcade-meta";
import type { ArcadeEventPayload } from "@/utils/types/analytics.types";

// Arcade event sink. Receives best-effort beacons from utils/functions/analytics.ts
// and appends one row to `arcade_events`. ALWAYS replies 204 (the beacon ignores
// the body); failures are logged, never thrown. Writes only on the real
// production deployment — Preview/dev beacons are dropped so test traffic can't
// pollute the "cool stats".
export const runtime = "nodejs";

const SINK_ON = process.env.VERCEL_ENV === "production";
const MAX_BODY = 2000; // a real beacon is a few hundred bytes

const TYPES = new Set(["view", "start", "play"]);
const GAMES = new Set<string>(ARCADE_GAME_KEYS); // single source — never drifts
const MODES = new Set(["min", "max", "wins"]);
const PAGES = new Set(["home", "arcade"]);
const OUTCOMES = new Set(["win", "loss", "draw", "done"]);

// Believable score bounds per game — guard the all-time records from spoofed rows.
// A forged reaction=1ms would own "fastest ever" forever (floor); symmetrically a
// forged memory=999999 would own the max-mode record forever (ceiling).
const MIN_SCORE: Record<string, number> = { reaction: 80 };
const MAX_SCORE: Record<string, number> = { memory: 50, clicks: 100 };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const toInt = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? Math.trunc(v) : null;

const pick = <T>(set: Set<string>, v: unknown): T | null =>
  typeof v === "string" && set.has(v) ? (v as T) : null;

const uuidOrNull = (v: unknown): string | null =>
  typeof v === "string" && UUID_RE.test(v) ? v : null;

export const POST = async (req: Request): Promise<Response> => {
  const noContent = new Response(null, { status: 204 });
  if (!SINK_ON || !db) return noContent;
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY)
    return noContent;

  let body: Partial<ArcadeEventPayload>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return noContent;
    body = JSON.parse(raw);
  } catch (err) {
    // self-inflicted (our own client sent something unparseable) — worth knowing
    console.warn("[arcade] unparseable event body:", err);
    return noContent;
  }

  // Required, allowlisted. A present-but-unknown game is likely a client/server
  // contract drift (a new game not added here), not a spoof — so log that case;
  // stay silent on the rest to avoid feeding attackers / logging noise.
  const type = pick<ArcadeEventPayload["type"]>(TYPES, body.type);
  const game = pick<string>(GAMES, body.game);
  if (!type || !game) {
    if (typeof body.game === "string" && body.game && !game) {
      console.warn("[arcade] dropped event for unknown game:", body.game);
    }
    return noContent;
  }

  // Drop spoofed out-of-range record attempts (sub-floor or above-ceiling).
  const score = type === "play" ? toInt(body.score) : null;
  if (type === "play" && score != null) {
    const floor = MIN_SCORE[game];
    const ceil = MAX_SCORE[game];
    if ((floor != null && score < floor) || (ceil != null && score > ceil)) {
      return noContent;
    }
  }

  // Country: Vercel injects a 2-letter ISO code; validate the shape before it
  // lands in the DB (every other field is bounded — this one shouldn't be raw).
  const rawCountry = req.headers.get("x-vercel-ip-country");
  const country =
    rawCountry && /^[A-Z]{2}$/.test(rawCountry) ? rawCountry : null;

  // Server-side privacy gate (belt-and-suspenders with the client): drop the
  // persistent id for opt-outs and gated geos. Aggregates/records still count.
  const gated = body.dnt === true || isPrivacyGatedCountry(country);
  const visitorId = gated ? null : uuidOrNull(body.visitor_id);

  try {
    // `detail` (jsonb) is intentionally omitted — left at the DB default {} until
    // per-game signals are wired (see common/database/jsonb.types.ts).
    await db.insert(arcadeEvents).values({
      type,
      game,
      mode: pick<string>(MODES, body.mode),
      page: pick<string>(PAGES, body.page),
      outcome: pick<string>(OUTCOMES, body.outcome),
      score,
      newBest: typeof body.new_best === "boolean" ? body.new_best : null,
      moves: toInt(body.moves),
      durationMs: toInt(body.duration_ms),
      firstWord:
        typeof body.first_word === "string"
          ? body.first_word.slice(0, 16)
          : null,
      sessionPlays: toInt(body.session_plays),
      winStreak: toInt(body.win_streak),
      visitorId,
      sessionId: uuidOrNull(body.session_id),
      country,
    });
  } catch (err) {
    console.error("[arcade] sink insert failed:", { type, game }, err);
  }
  return noContent;
};
