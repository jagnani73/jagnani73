// Applies website/db/schema.sql to the Postgres (Neon) database.
//
// schema.sql is the human-authored, canonical DDL. Drizzle's generated schema
// (src/common/database) only mirrors the live DB for *types* (`pnpm db:pull`) —
// it does not apply changes. This script is how the DDL actually lands. It's
// idempotent (CREATE TABLE/INDEX IF NOT EXISTS), so it's safe to re-run.
//
// Usage (from website/):
//   pnpm db:apply
//   # or directly: npx tsx scripts/apply-schema.ts
//
// Reads the direct (unpooled) connection from website/.env.local
// (DATABASE_URL_UNPOOLED, falling back to DATABASE_URL) or the shell env.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Client } from "pg";

const here = dirname(fileURLToPath(import.meta.url));
const envPath = join(here, "..", ".env.local");
const schemaPath = join(here, "..", "db", "schema.sql");

// Tiny .env.local reader — matches scripts/spotify-refresh-token.ts (no dotenv
// dependency needed for a one-off script).
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
  console.error(
    "Missing DATABASE_URL_UNPOOLED / DATABASE_URL (set in website/.env.local or your shell).",
  );
  process.exit(1);
}

const main = async (): Promise<void> => {
  const sql = readFileSync(schemaPath, "utf8");
  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    await client.query(sql);
    console.log("✅ schema applied from db/schema.sql");
  } finally {
    await client.end();
  }
};

main().catch((err) => {
  console.error("schema apply failed:", err);
  process.exit(1);
});
