// One-time helper — mints a Spotify refresh token via the Authorization Code flow.
//
// The "now spinning" panel needs user-scoped data (currently-playing / recently-
// played / top tracks), which Client Credentials can't reach — so the account
// owner consents once here and stores the long-lived refresh token in .env.local.
//
// Usage:
//   1. The redirect URI below must be registered on your Spotify app
//      (Edit settings → Redirect URIs). Default: http://127.0.0.1:3000/callback
//      — override with SPOTIFY_REDIRECT_URI if you registered a different one.
//   2. Ensure SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET are in website/.env.local
//      (or exported in your shell).
//   3. STOP the dev server first (it shares port 3000), then from website/:
//        npx tsx scripts/spotify-refresh-token.ts
//      (no install needed — npx fetches tsx on demand; on Node ≥22.6 you can also
//       run `node --experimental-strip-types scripts/spotify-refresh-token.ts`).
//   4. Open the printed URL, approve, then copy the printed
//        SPOTIFY_REFRESH_TOKEN=...   line into website/.env.local

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REDIRECT =
  process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/callback";
const PORT = Number(new URL(REDIRECT).port) || 3000;
const CB_PATH = new URL(REDIRECT).pathname; // matches whatever path is registered
const SCOPES =
  "user-read-currently-playing user-read-recently-played user-top-read";

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

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || fromEnvFile("SPOTIFY_CLIENT_ID");
const CLIENT_SECRET =
  process.env.SPOTIFY_CLIENT_SECRET || fromEnvFile("SPOTIFY_CLIENT_SECRET");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET (set them in website/.env.local or your shell).",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT,
    scope: SCOPES,
  }).toString();

console.log("\n1) Confirm this Redirect URI is registered on your Spotify app:");
console.log("   " + REDIRECT);
console.log("\n2) Open this URL, log in, and approve:\n");
console.log("   " + authUrl + "\n");

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url || !req.url.startsWith(CB_PATH)) {
    res.writeHead(404);
    res.end();
    return;
  }
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");
  if (err) {
    res.end("Authorization failed: " + err);
    console.error("Authorization failed:", err);
    server.close();
    process.exit(1);
  }
  if (!code) {
    res.end("No authorization code in callback.");
    return;
  }
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT,
      }),
    });
    const data = (await tokenRes.json()) as { refresh_token?: string };
    if (!tokenRes.ok || !data.refresh_token) {
      throw new Error(JSON.stringify(data));
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>Done — close this tab and return to the terminal.</h2>");
    console.log("\n✅ Add this line to website/.env.local:\n");
    console.log("SPOTIFY_REFRESH_TOKEN=" + data.refresh_token + "\n");
  } catch (e) {
    res.end("Token exchange failed; see the terminal.");
    console.error("Token exchange failed:", e);
  } finally {
    server.close();
    setTimeout(() => process.exit(0), 200);
  }
});

server.listen(PORT, "127.0.0.1", () =>
  console.log("Waiting for the redirect on " + REDIRECT + " …\n"),
);
