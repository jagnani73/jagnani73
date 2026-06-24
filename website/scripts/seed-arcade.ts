// Seeds the arcade_events table with varied, realistic MOCK data so the
// /arcade/stats dashboard can be viewed populated. By default it TRUNCATEs the
// table first (it's mock-only) then inserts a fresh spread.
//
// ⚠️ This writes to the same Neon DB wired to Vercel. It's mock data — clear it
//    before the production launch so it doesn't mix with real stats.
//
// Usage (from website/):
//   pnpm db:seed            # truncate + seed
//   pnpm db:seed --clear    # truncate only (wipe everything, no seed)
//
// Reads DATABASE_URL_UNPOOLED (→ DATABASE_URL) from website/.env.local or shell.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { Client } from "pg";

const here = dirname(fileURLToPath(import.meta.url));
const envPath = join(here, "..", ".env.local");

const fromEnvFile = (key: string): string | undefined => {
  try {
    const txt = readFileSync(envPath, "utf8");
    const m = txt.match(new RegExp("^" + key + "\\s*=\\s*(.+)$", "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
  } catch {
    return undefined;
  }
};

const url =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  fromEnvFile("DATABASE_URL_UNPOOLED") ||
  fromEnvFile("DATABASE_URL");

if (!url) {
  console.error("Missing DATABASE_URL_UNPOOLED / DATABASE_URL.");
  process.exit(1);
}

// ── helpers ──────────────────────────────────────────────────────────────────
const ri = (a: number, b: number): number =>
  Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const chance = (p: number): boolean => Math.random() < p;
const shuffle = <T>(arr: readonly T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);

type Mode = "min" | "max" | "wins";
const GAMES: { key: string; mode: Mode }[] = [
  { key: "reaction", mode: "min" },
  { key: "memory", mode: "max" },
  { key: "clicks", mode: "max" },
  { key: "ttt", mode: "wins" },
  { key: "c4", mode: "wins" },
  { key: "wordle", mode: "wins" },
];
const modeOf = (key: string): Mode =>
  GAMES.find((g) => g.key === key)?.mode ?? "wins";

// S-heavy so the first-letter breakdown has a clear leader
const OPENERS: string[] = [
  ...Array<string>(10).fill("slate"),
  ...Array<string>(6).fill("stare"),
  ...Array<string>(4).fill("slant"),
  ...Array<string>(3).fill("stern"),
  ...Array<string>(3).fill("soare"),
  ...Array<string>(2).fill("snake"),
  ...Array<string>(2).fill("store"),
  ...Array<string>(6).fill("crane"),
  ...Array<string>(4).fill("crate"),
  ...Array<string>(2).fill("cloud"),
  ...Array<string>(5).fill("adieu"),
  ...Array<string>(4).fill("audio"),
  ...Array<string>(3).fill("arise"),
  ...Array<string>(4).fill("raise"),
  ...Array<string>(3).fill("roast"),
  ...Array<string>(4).fill("trace"),
  ...Array<string>(2).fill("plumb"),
  ...Array<string>(2).fill("ghost"),
  ...Array<string>(1).fill("vivid"),
];

const NONGATED = ["US", "IN", "CA", "AU", "BR", "JP", "SG", "AE", "MX", "KR"];
const GATED = ["DE", "FR", "GB", "NL", "ES", "IT", "SE", "IE", "PL"];
const PAGES = ["home", "arcade"] as const;

const DAY = 86_400_000;
const NOW = Date.now();
const randWhen = (): number => NOW - ri(0, 30) * DAY - ri(0, 86_399) * 1000;

const scoreFor = (key: string): number | null => {
  switch (key) {
    case "reaction":
      return chance(0.06) ? ri(150, 182) : ri(190, 520);
    case "memory":
      return ri(2, 14);
    case "clicks":
      return ri(6, 30);
    default:
      return chance(0.5) ? 1 : 0; // wins games — score isn't surfaced
  }
};
const durFor = (key: string): number => {
  switch (key) {
    case "reaction":
      return ri(900, 3200);
    case "memory":
      return ri(8000, 52000);
    case "clicks":
      return ri(4500, 6000);
    case "ttt":
      return ri(7000, 38000);
    case "c4":
      return ri(16000, 85000);
    case "wordle":
      return ri(22000, 110000);
    default:
      return ri(3000, 30000);
  }
};
const outcomeFor = (key: string): string => {
  if (key === "ttt" || key === "c4") {
    const r = Math.random();
    return r < 0.5 ? "win" : r < 0.85 ? "loss" : "draw";
  }
  if (key === "wordle") return chance(0.62) ? "win" : "loss";
  return "done"; // reaction / memory / clicks
};
const movesFor = (key: string, outcome: string): number | null => {
  switch (key) {
    case "wordle":
      return outcome === "win" ? ri(2, 6) : 6;
    case "ttt":
      return ri(3, 5);
    case "c4":
      return ri(7, 21);
    case "memory":
      return ri(4, 24);
    default:
      return null;
  }
};

interface Row {
  type: string;
  game: string;
  mode: string | null;
  page: string;
  outcome: string | null;
  score: number | null;
  new_best: boolean | null;
  moves: number | null;
  duration_ms: number | null;
  first_word: string | null;
  session_plays: number | null;
  win_streak: number | null;
  visitor_id: string | null;
  session_id: string | null;
  country: string;
  created_at: string;
}

const rows: Row[] = [];

const meta = (
  type: "view" | "start",
  game: string,
  page: string,
  country: string,
  visitor: string | null,
  session: string,
  when: number,
): Row => ({
  type,
  game,
  mode: modeOf(game),
  page,
  outcome: null,
  score: null,
  new_best: null,
  moves: null,
  duration_ms: null,
  first_word: null,
  session_plays: null,
  win_streak: null,
  visitor_id: visitor,
  session_id: session,
  country,
  created_at: new Date(when).toISOString(),
});

const play = (
  game: string,
  page: string,
  country: string,
  visitor: string | null,
  session: string,
  when: number,
  plays: number,
  streak: { v: number },
  forceWin = false,
): void => {
  const outcome = forceWin ? "win" : outcomeFor(game);
  streak.v = outcome === "win" ? streak.v + 1 : 0;
  rows.push({
    type: "play",
    game,
    mode: modeOf(game),
    page,
    outcome,
    score: scoreFor(game),
    new_best: chance(0.16),
    moves: movesFor(game, outcome),
    duration_ms: durFor(game),
    first_word: game === "wordle" ? pick(OPENERS) : null,
    session_plays: plays,
    win_streak: streak.v,
    visitor_id: visitor,
    session_id: session,
    country,
    created_at: new Date(when).toISOString(),
  });
};

const genSession = (
  visitor: string | null,
  country: string,
  when: number,
): void => {
  const session = randomUUID();
  const page = pick(PAGES);
  let t = when;
  let plays = 0;
  const streak = { v: 0 };
  for (const g of shuffle(GAMES).slice(0, ri(1, 3))) {
    rows.push(meta("view", g.key, page, country, visitor, session, t));
    t += ri(1, 8) * 1000;
    if (!chance(0.82)) continue; // saw it, didn't engage
    rows.push(meta("start", g.key, page, country, visitor, session, t));
    t += ri(2, 12) * 1000;
    const n = ri(1, g.key === "memory" ? 10 : 7);
    for (let i = 0; i < n; i++) {
      plays += 1;
      play(g.key, page, country, visitor, session, t, plays, streak);
      t += durFor(g.key) + ri(800, 4000);
    }
  }
};

// ── generate ─────────────────────────────────────────────────────────────────
// regular non-gated visitors, varied activity
const visitors = Array.from({ length: 46 }, () => ({
  id: randomUUID(),
  country: pick(NONGATED),
}));
for (const v of visitors) {
  for (let s = 0; s < ri(1, 6); s++) genSession(v.id, v.country, randWhen());
}

// gated traffic (EU/UK) — null visitor id, still counts toward aggregates/records
for (let i = 0; i < ri(45, 60); i++) genSession(null, pick(GATED), randWhen());

// the whale — grinds Memory ~89× (per-game superlative) + dabbles elsewhere
const whale = randomUUID();
const whaleCountry = pick(NONGATED);
let remaining = ri(85, 92);
while (remaining > 0) {
  const session = randomUUID();
  let t = randWhen();
  let plays = 0;
  const streak = { v: 0 };
  rows.push(meta("view", "memory", "arcade", whaleCountry, whale, session, t));
  t += 4000;
  rows.push(meta("start", "memory", "arcade", whaleCountry, whale, session, t));
  t += 6000;
  const n = Math.min(remaining, ri(8, 18));
  for (let i = 0; i < n; i++) {
    plays += 1;
    play("memory", "arcade", whaleCountry, whale, session, t, plays, streak);
    t += durFor("memory") + ri(1000, 4000);
  }
  remaining -= n;
}
for (let s = 0; s < ri(2, 4); s++) genSession(whale, whaleCountry, randWhen());

// one hot-streak session — a long unbroken run for "longest win streak"
{
  const id = pick(visitors).id;
  const country = pick(NONGATED);
  const game = pick(["wordle", "ttt", "c4"]);
  const session = randomUUID();
  let t = randWhen();
  const streak = { v: 0 };
  rows.push(meta("view", game, "arcade", country, id, session, t));
  t += 4000;
  rows.push(meta("start", game, "arcade", country, id, session, t));
  t += 6000;
  const n = ri(10, 14);
  for (let i = 0; i < n; i++) {
    play(game, "arcade", country, id, session, t, i + 1, streak, true);
    t += durFor(game) + ri(1000, 3000);
  }
}

// ── insert ───────────────────────────────────────────────────────────────────
const COLS = [
  "type",
  "game",
  "mode",
  "page",
  "outcome",
  "score",
  "new_best",
  "moves",
  "duration_ms",
  "first_word",
  "session_plays",
  "win_streak",
  "visitor_id",
  "session_id",
  "country",
  "created_at",
] as const;

const tuple = (r: Row): (string | number | boolean | null)[] => [
  r.type,
  r.game,
  r.mode,
  r.page,
  r.outcome,
  r.score,
  r.new_best,
  r.moves,
  r.duration_ms,
  r.first_word,
  r.session_plays,
  r.win_streak,
  r.visitor_id,
  r.session_id,
  r.country,
  r.created_at,
];

const main = async (): Promise<void> => {
  const clearOnly = process.argv.includes("--clear");
  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    await client.query("TRUNCATE arcade_events RESTART IDENTITY");
    if (clearOnly) {
      console.log("🧹 arcade_events cleared.");
      return;
    }
    const CH = 400;
    for (let i = 0; i < rows.length; i += CH) {
      const chunk = rows.slice(i, i + CH);
      const params: (string | number | boolean | null)[] = [];
      const values = chunk.map((r, j) => {
        params.push(...tuple(r));
        const base = j * COLS.length;
        return `(${COLS.map((_, k) => `$${base + k + 1}`).join(",")})`;
      });
      await client.query(
        `INSERT INTO arcade_events (${COLS.join(",")}) VALUES ${values.join(",")}`,
        params,
      );
    }
    const plays = rows.filter((r) => r.type === "play").length;
    const visitorsSeeded = new Set(
      rows.map((r) => r.visitor_id).filter(Boolean),
    ).size;
    console.log(
      `✅ seeded ${rows.length} events (${plays} plays · ${visitorsSeeded} distinct visitors). Mock data — clear with \`pnpm db:seed --clear\` before launch.`,
    );
  } finally {
    await client.end();
  }
};

main().catch((err) => {
  console.error("seed failed:", err);
  process.exit(1);
});
