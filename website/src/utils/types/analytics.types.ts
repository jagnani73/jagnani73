import type {
  GameMode,
  Outcome,
  ArcadePage,
  ArcadeGameKey,
} from "./arcade.types";

// The JSON body the client beacons to /api/arcade-event. Mirrors the GA4 params
// (utils/functions/analytics.ts) plus the identity fields the Postgres sink needs
// for per-visitor stats. `visitor_id` is null when gated (privacy geo / opt-out);
// `session_id` is the ephemeral per-page-load id; `dnt` forwards the client's
// opt-out signal so the server can drop the id too.
export type ArcadeEventType = "view" | "start" | "play";

export interface ArcadeEventPayload {
  type: ArcadeEventType;
  game: ArcadeGameKey;
  mode: GameMode;
  page: ArcadePage;
  outcome?: Outcome;
  score?: number;
  new_best?: boolean;
  moves?: number;
  duration_ms?: number;
  first_word?: string;
  session_plays?: number;
  win_streak?: number;
  visitor_id: string | null;
  session_id: string | null;
  dnt: boolean;
}
