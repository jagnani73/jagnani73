-- Arcade analytics event sink (append-only) — canonical schema.
--
-- Powers the undisclosed /arcade/stats dashboard. Every card-view, first
-- engagement, and finished round is one IMMUTABLE row. The "cool stats" are
-- QUERIES over this table, not pre-aggregates — so new metrics need no schema
-- change, as long as the underlying signal was captured at the time.
--
-- `detail` (jsonb) is RESERVED for future game-specific signals (Wordle guess
-- sequence, per-attempt reaction times, board state, ...) — nothing writes it yet;
-- it stays at the default {}. Adding a signal later is just a new key, no
-- migration. Cross-cutting fields stay as typed columns.
--
-- Apply: `pnpm db:apply` (scripts/apply-schema.ts), or paste into the Neon SQL
-- Editor. Idempotent (IF NOT EXISTS) — safe to re-run.

CREATE TABLE IF NOT EXISTS arcade_events (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type          TEXT    NOT NULL CHECK (type IN ('view', 'start', 'play')),
    game          TEXT    NOT NULL,            -- reaction | memory | clicks | ttt | c4 | wordle
    mode          TEXT,                        -- min | max | wins
    page          TEXT,                        -- home | arcade
    outcome       TEXT,                        -- win | loss | draw | done   (play only)
    score         INTEGER,                     -- play only
    new_best      BOOLEAN,
    moves         INTEGER,                     -- marks / discs / guesses
    duration_ms   INTEGER,                     -- round length (start -> end)
    first_word    TEXT,                        -- Wordle opener
    first_letter  TEXT GENERATED ALWAYS AS (upper(left(first_word, 1))) STORED,
    session_plays INTEGER,                     -- rounds this page-session
    win_streak    INTEGER,                     -- current streak at emit time
    detail        JSONB   NOT NULL DEFAULT '{}'::jsonb,  -- game-specific signals
    visitor_id    UUID,                        -- persistent anon id (NULL when gated / opted out)
    session_id    UUID,                        -- ephemeral, per page-load
    country       TEXT,                        -- coarse geo (x-vercel-ip-country); never the IP
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_arcade_events_type_game  ON arcade_events (type, game);
CREATE INDEX IF NOT EXISTS idx_arcade_events_game_score ON arcade_events (game, score);
CREATE INDEX IF NOT EXISTS idx_arcade_events_visitor    ON arcade_events (visitor_id) WHERE visitor_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_arcade_events_created_at ON arcade_events (created_at);
CREATE INDEX IF NOT EXISTS idx_arcade_events_detail_gin ON arcade_events USING gin (detail);
