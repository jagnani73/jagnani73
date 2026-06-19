import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Types are generated FROM the live DB (`pnpm db:pull`), so the schema in
// src/common/database/ can never drift from the real Neon tables. schema.sql
// stays the human-authored DDL; this just mirrors the applied DB into TS.
// Introspection uses the direct (unpooled) connection.
config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  out: "./src/common/database",
  schemaFilter: ["public"],
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "",
  },
});
