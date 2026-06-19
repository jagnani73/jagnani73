// Client-side identity for the arcade Postgres sink. Two ids:
//   - session_id: ephemeral, one per page-load (module scope) — not persisted,
//     so it isn't cross-visit tracking and is never gated.
//   - visitor_id: a persistent anonymous UUID in localStorage — the only piece
//     that enables per-visitor superlatives ("one person played 89×"), so it's
//     the only piece we gate. Suppressed when the visitor has opted out (GPC /
//     DNT) or sits in a privacy-gated geo (the `arc_geo` cookie set by
//     proxy.ts). All access is SSR-guarded and never throws.

const VISITOR_KEY = "arcade.vid";

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

// True when the persistent id must not be created/sent: an explicit opt-out
// signal, or a privacy-gated geo (the cookie middleware writes on first visit).
export const trackingDisallowed = (): boolean => {
  if (typeof navigator !== "undefined") {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.globalPrivacyControl === true) return true;
    if (nav.doNotTrack === "1" || nav.doNotTrack === "yes") return true;
  }
  return readCookie("arc_geo") === "gated";
};

let sessionId: string | null = null;

export const getSessionId = (): string | null => {
  if (typeof crypto === "undefined" || !crypto.randomUUID) return null;
  if (!sessionId) sessionId = crypto.randomUUID();
  return sessionId;
};

export const getVisitorId = (): string | null => {
  if (typeof window === "undefined" || typeof crypto === "undefined") return null;
  if (!crypto.randomUUID || trackingDisallowed()) return null;
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return null; // localStorage blocked (private mode / cookies disabled)
  }
};
