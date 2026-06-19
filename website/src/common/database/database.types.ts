import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { arcadeEvents } from "./schema";

// Row + insert types inferred straight from the DB-introspected schema, so they
// can never drift from the live `arcade_events` table. The detail jsonb carries
// the hand-written ArcadeDetail shape (applied via .$type<> in schema.ts).
export type ArcadeEvent = InferSelectModel<typeof arcadeEvents>;
export type NewArcadeEvent = InferInsertModel<typeof arcadeEvents>;

export type { ArcadeDetail } from "./jsonb.types";
