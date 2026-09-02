import type { SiteDocument } from "@/utils/types/document.types";

// ── Layout ───────────────────────────────────────────────────────────────────
/**
 * Height (px) of the mobile sticky SiteRail bar (logo 40 + `py-2.5` + border).
 * Sticky year marks and the constellation gutter offset by this so content
 * tucks below the bar instead of being clipped behind it.
 */
export const MOBILE_BAR_H = 60;

// ── Contact ──────────────────────────────────────────────────────────────────
export const EMAIL = "yashjagnani73@gmail.com";
export const TWITTER_HANDLE = "@jagnani73";

/** Profile links — single source for the person section + JSON-LD `sameAs`. */
export const GITHUB_URL = "https://github.com/jagnani73";
export const LINKEDIN_URL = "https://www.linkedin.com/in/yashvardhan-jagnani/";
export const TWITTER_URL = "https://twitter.com/jagnani73";

// ── Spotify — the playlists pinned in the music panel ─────────────────────────
/**
 * Hand-picked, in display order. Only the id is curated: name, cover and track
 * count are read live from Spotify, so a rename or a new track can't drift.
 * All three are public playlists, which the route's token reads without the
 * `playlist-read-private` scope — keep it that way or the token needs a re-mint.
 * Lives here rather than `content/home.ts` so the API route doesn't pull the
 * case registry into its bundle.
 */
export const SPOTIFY_PLAYLIST_IDS = [
  "60eooajlbtb0gXgLYDH0A9", // Jaggi got Crazy
  "2vxAGCkRyH1Nw56BopHFwo", // Jagg se Back
  "6Ij9WaqXyarfzxeO8N6k9L", // I'm Gamma
];

// ── Documents — the three PDFs served by /resume, /cv and /cover-letter ───────
/**
 * Upstream sources. A sibling private repo (`cv-cl`) builds all three from
 * LaTeX and publishes them to these stable public_ids on every push, so the
 * URLs never change and always hold the current build. Delivery is
 * `resource_type: raw`, which is why `.pdf` is part of the path rather than a
 * format suffix.
 */
export const RESUME =
  "https://res.cloudinary.com/jagnani73/raw/upload/cv-cl/resume.pdf";
export const CV =
  "https://res.cloudinary.com/jagnani73/raw/upload/cv-cl/cv.pdf";
export const COVER_LETTER =
  "https://res.cloudinary.com/jagnani73/raw/upload/cv-cl/cover-letter.pdf";

/**
 * The one place that decides where a document lives: upstream URL, the path
 * this site serves it at, and the name it downloads under. Read by the three
 * route handlers, by the legacy `/api/*` redirects and by the home résumé
 * link — so moving a document is a single edit here.
 *
 * The set is closed on purpose. Each route handler names one of these entries;
 * **no document URL is ever assembled from a request segment**. A catch-all
 * `/[doc]` is exploitable — `%2F`/`%5C` survive Next's decode, `new URL()` then
 * resolves `..`, and the result can be pivoted onto `/image/fetch/` or another
 * cloud. Do not add a slug, a variant or a query parameter.
 */
export const DOCUMENTS = {
  resume: {
    url: RESUME,
    path: "/resume",
    filename: "Yashvardhan Jagnani [Resume].pdf",
  },
  cv: {
    url: CV,
    path: "/cv",
    filename: "Yashvardhan Jagnani [CV].pdf",
  },
  coverLetter: {
    url: COVER_LETTER,
    path: "/cover-letter",
    filename: "Yashvardhan Jagnani [Cover Letter].pdf",
  },
} as const satisfies Record<string, SiteDocument>;

// ── Standing copy — single source for the masthead bar + footers + OG card ────
/** Right-hand status shown after the `STATUS:` label across the mastheads and OG. */
export const STATUS = "NTU SINGAPORE - MSC BLOCKCHAIN";
/** Footer copyright line (the AstroLine fact is appended after it on every page). */
export const COPYRIGHT = "© 2026 YASHVARDHAN JAGNANI";

// ── Footer fact line (AstroLine) ──────────────────────────────────────────────
// Astronomy facts kept ≤ ~24 chars so the desktop one-line footer lockup holds.
export const ASTRO_FACTS = [
  "SATURN COULD FLOAT",
  "VENUS SPINS BACKWARD",
  "SPACE IS SILENT",
  "STARLIGHT IS ANCIENT",
  "WE ARE STARDUST",
  "THE MOON IS DRIFTING",
  "THE SUN IS A STAR",
  "MARS HAS BLUE SUNSETS",
  "VENUS RAINS METAL",
  "JUPITER HAS NO SURFACE",
  "NEUTRON STARS ARE DENSE",
  "MOST GOLD IS STELLAR",
  "THE SUN HUMS",
  "PLUTO HAS A HEART",
  "THE MILKY WAY IS WARPED",
  "STARS OUTNUMBER SAND",
  "BLACK HOLES HUM",
  "THE SUN LOSES MASS",
  "MERCURY HAS ICE",
  "GALAXIES COLLIDE SLOWLY",
  "ANDROMEDA IS COMING",
  "THE SUN IS MIDDLE-AGED",
  "JUPITER SHIELDS EARTH",
  "NEPTUNE WAS FOUND BY MATH",
  "THE SUN IS REALLY WHITE",
  "SUNLIGHT IS MINUTES OLD",
  "MOONLIGHT IS SUNLIGHT",
  "YOUR ATOMS ARE STELLAR",
  "HALLEY RETURNS IN 2061",
  "MARS HAS THE TALLEST PEAK",
  "JUPITER IS A FAILED STAR",
  "BLACK HOLES EVAPORATE",
  "GRAVITY BENDS TIME",
  "THE MOON MAKES TIDES",
  "PLANETS DO NOT TWINKLE",
  "MOST STARS ARE RED DWARFS",
  "WATER FLOATS IN SPACE",
  "SATURN'S RINGS ARE YOUNG",
  "THE SUN WILL SWELL UP",
  "ATOMS ARE MOSTLY EMPTY",
  "VENUS IS THE HOTTEST",
  "THE COSMOS IS EXPANDING",
  "SPACE IS GETTING COLDER",
  "SOME STARS ARE GONE",
  "THE FIRST STARS WERE HUGE",
  "SUPERNOVAE MAKE IRON",
  "PULSARS KEEP TIME",
  "DARK MATTER IS UNSEEN",
  "SPACE IS MOSTLY EMPTY",
  "SHOOTING STARS ARE DUST",
  "THE AURORA IS SOLAR WIND",
  "MARS ONCE HAD RIVERS",
  "THE SUN ORBITS THE GALAXY",
  "COMETS ARE ICY",
  "EARTH WOBBLES SLOWLY",
  "STARS FORGE ELEMENTS",
  "THE SKY HAS NO EDGE",
  "THE MOON IS SLOWING US",
  "JUPITER SPINS FASTEST",
  "THE MOON IS LOPSIDED",
  "EARTH IS NOT A SPHERE",
  "COMET TAILS POINT AWAY",
  "BLACK HOLES TRAP LIGHT",
  "SUN IS ONE OF BILLIONS",
  "MARS IS RUSTY",
  "SATURN IS THE LIGHTEST",
  "EARTH HAS A TILT",
  "THE NIGHT SKY IS THE PAST",
  "METEORS ARE TINY",
  "GALAXIES HIDE BLACK HOLES",
  "EARTH RINGS LIKE A BELL",
  "SPACE HAS NO UP",
  "EVERY STAR WILL DIE",
] as const;
