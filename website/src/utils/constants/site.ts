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

// ── Documents — redirect targets for /api/resume and /api/cover-letter ────────
export const RESUME =
  "https://drive.google.com/file/d/1onbdfPCgcTndFta_NYXg5yq3pW95FaMj/view?usp=drive_link";
export const COVER_LETTER =
  "https://drive.google.com/file/d/1Feh-3W3H5yAkAAZYEgDth-TAJXoqGfqs/view?usp=drive_link";

// ── Standing copy — single source for the masthead bar + footers + OG card ────
/** Right-hand status shown after the `STATUS:` label across the mastheads and OG. */
export const STATUS = "NTU SINGAPORE - AUG 2026";
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
