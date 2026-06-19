import "server-only";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/common/database/schema";

// Typed Drizzle client over Neon's HTTP driver (one-shot per query — the right
// fit for route handlers + ISR). Bound to the DB-introspected schema, so every
// query is typed from the live table. `db` is null when the DB env isn't
// configured (e.g. a Preview deploy without the integration); callers must
// handle that rather than crash at import.
const url = process.env.DATABASE_URL;

export const db = url ? drizzle(neon(url), { schema }) : null;
