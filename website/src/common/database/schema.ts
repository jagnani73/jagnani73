import {
  pgTable,
  index,
  check,
  bigint,
  text,
  integer,
  boolean,
  jsonb,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { ArcadeDetail } from "./jsonb.types";

export const arcadeEvents = pgTable(
  "arcade_events",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "arcade_events_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    type: text().notNull(),
    game: text().notNull(),
    mode: text(),
    page: text(),
    outcome: text(),
    score: integer(),
    newBest: boolean("new_best"),
    moves: integer(),
    durationMs: integer("duration_ms"),
    firstWord: text("first_word"),
    firstLetter: text("first_letter").generatedAlwaysAs(
      sql`upper("left"(first_word, 1))`,
    ),
    sessionPlays: integer("session_plays"),
    winStreak: integer("win_streak"),
    // MANUAL: jsonb hand-typed via .$type<ArcadeDetail> — `db:pull` resets this to
    // `unknown`, so re-apply the .$type<>() (and this import) after introspecting.
    // RESERVED: nothing reads/writes detail yet (see jsonb.types.ts).
    detail: jsonb().$type<ArcadeDetail>().default({}).notNull(),
    visitorId: uuid("visitor_id"),
    sessionId: uuid("session_id"),
    country: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_arcade_events_created_at").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_arcade_events_detail_gin").using(
      "gin",
      table.detail.asc().nullsLast().op("jsonb_ops"),
    ),
    index("idx_arcade_events_game_score").using(
      "btree",
      table.game.asc().nullsLast().op("text_ops"),
      table.score.asc().nullsLast().op("text_ops"),
    ),
    index("idx_arcade_events_type_game").using(
      "btree",
      table.type.asc().nullsLast().op("text_ops"),
      table.game.asc().nullsLast().op("text_ops"),
    ),
    index("idx_arcade_events_visitor")
      .using("btree", table.visitorId.asc().nullsLast().op("uuid_ops"))
      .where(sql`(visitor_id IS NOT NULL)`),
    check(
      "arcade_events_type_check",
      sql`type = ANY (ARRAY['view'::text, 'start'::text, 'play'::text])`,
    ),
  ],
);
