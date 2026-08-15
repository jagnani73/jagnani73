/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) requires <img>, not next/image */
// The LinkedIn profile banner, rendered from the site's own tokens and the
// shared marching-squares contour field — so the banner, the masthead band and
// the OG card all trace the same geometry and can't drift apart.
//
// Two consumers import this module: the /linkedin-banner.png route handler and
// scripts/linkedin-banner.tsx (which writes every variant to disk). Keeping the
// variant table and the renderer here is what stops those two diverging.

import { ImageResponse } from "next/og";
import { THEME_TOKENS } from "@/utils/constants/theme-tokens";
import { contourSegments } from "@/utils/functions/contours";
import type {
  BannerVariant,
  BannerVariantKey,
} from "@/utils/types/banner.types";
import type { ThemeTokens } from "@/utils/types/theme.types";

/** LinkedIn's nominal layout size. Authoring units — never render at 1x. */
export const BANNER_W = 1584;
export const BANNER_H = 396;

/** Outer margin, design units. */
const L = 60;

/**
 * LinkedIn crops inward on mobile/tablet; the conservative safe area is the
 * centre 1350x220 → x 117..1467, y 88..308. Variants differ mainly in whether
 * their text clears it.
 */
export const BANNER_SAFE = { x0: 117, y0: 88, x1: 1467, y1: 308 } as const;

/**
 * The banner renders ~1128 CSS px wide, so a high-DPI display wants ~2256
 * device px and a 1x file gets upscaled. 3x is the shipping default.
 */
export const DEFAULT_SCALE = 3;

/**
 * Scale is attacker-controllable through the route's query string and drives
 * the raster size, so it is capped: 4x is already 6336x1584.
 */
export const MAX_SCALE = 4;

export const DEFAULT_VARIANT: BannerVariantKey = "b-safe";

const SCRIM_BALANCED = [0.38, 0.22, 0.9, 0.92, 0.42, 0.26] as const;
const SCRIM_OPEN = [0.3, 0.16, 0.82, 0.84, 0.34, 0.2] as const;

export const BANNER_VARIANTS: Record<BannerVariantKey, BannerVariant> = {
  "a-masthead": {
    key: "a-masthead",
    label: "Masthead",
    theme: "light",
    textX: 470,
    y: { eyebrow: 116, name: 146, tagline: 246, footline: BANNER_H - 34 },
    nameSize: 78,
    taglineSize: 36,
    chrome: true,
    scrim: SCRIM_BALANCED,
  },
  "b-safe": {
    key: "b-safe",
    label: "Safe zone",
    theme: "light",
    textX: 470,
    y: { eyebrow: 100, name: 126, tagline: 226, footline: 286 },
    nameSize: 74,
    taglineSize: 34,
    chrome: true,
    scrim: SCRIM_BALANCED,
  },
  "c-dark": {
    key: "c-dark",
    label: "Dark",
    theme: "dark",
    textX: 470,
    y: { eyebrow: 116, name: 146, tagline: 246, footline: BANNER_H - 34 },
    nameSize: 78,
    taglineSize: 36,
    chrome: true,
    scrim: SCRIM_BALANCED,
  },
  "d-quiet": {
    key: "d-quiet",
    label: "Quiet",
    theme: "light",
    textX: 470,
    y: { eyebrow: 0, name: 140, tagline: 262, footline: 0 },
    nameSize: 88,
    taglineSize: 34,
    chrome: false,
    scrim: SCRIM_OPEN,
  },
  "e-centred": {
    key: "e-centred",
    label: "Centred",
    theme: "light",
    textX: 0,
    y: { eyebrow: 112, name: 142, tagline: 244, footline: 300 },
    nameSize: 72,
    taglineSize: 33,
    chrome: true,
    scrim: SCRIM_OPEN,
    centred: true,
  },
};

export const isBannerVariant = (v: string): v is BannerVariantKey =>
  Object.hasOwn(BANNER_VARIANTS, v);

const EYEBROW = "BLOCKCHAIN · DATA INFRASTRUCTURE · DEVELOPER TOOLING";
const NAME = "YASHVARDHAN JAGNANI";
const TAGLINE = "software, shipped at agent speed.";
const FOOTLINE = "jagnani73.com  ·  MSc BLOCKCHAIN, NTU SINGAPORE";

const toDataUri = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

/**
 * Traced once in design units and emitted with a viewBox, so one trace renders
 * vector-sharp at any scale instead of re-tracing at a finer cell.
 */
const contoursDataUri = (P: ThemeTokens, dark: boolean, scale: number) => {
  const t = 3.6;
  const f = (x: number, y: number) => {
    const v =
      Math.sin(x * 0.0075 + t * 2.1) * Math.cos(y * 0.019 - t * 1.4) +
      Math.sin((x + y) * 0.006 + t) * 0.7 +
      Math.sin(
        Math.hypot(x - BANNER_W * 0.28, y - BANNER_H * 0.5) * 0.011 - t * 1.8,
      ) *
        0.5;
    return v / 2.2;
  };

  let paths = "";
  contourSegments(BANNER_W, BANNER_H, f).forEach((segs, li) => {
    const stroke = li === 3 ? P.sig : P.pri;
    // Paper needs more ink than the dark card to read at the same weight.
    const opacity = dark
      ? li === 3
        ? 0.34
        : 0.13 + li * 0.05
      : li === 3
        ? 0.52
        : 0.22 + li * 0.07;
    const lw = li === 3 ? 1.4 : 1;
    let d = "";
    for (const [x1, y1, x2, y2] of segs) {
      d += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
    paths += `<path d="${d}" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="${lw}" fill="none"/>`;
  });

  return toDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${BANNER_W * scale}" height="${BANNER_H * scale}" viewBox="0 0 ${BANNER_W} ${BANNER_H}"><rect width="${BANNER_W}" height="${BANNER_H}" fill="${P.fluidBg}"/>${paths}</svg>`,
  );
};

const FONT_URLS = [
  "https://cdn.jsdelivr.net/fontsource/fonts/anton@latest/latin-400-normal.ttf",
  "https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@latest/latin-400-italic.ttf",
  "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf",
] as const;

const fetchFont = async (url: string): Promise<ArrayBuffer> => {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`[banner] font fetch failed (${res.status}): ${url}`);
    throw new Error(`banner font ${res.status}`);
  }
  return res.arrayBuffer();
};

// Module-cached so a warm function doesn't refetch on every request. A failure
// clears the cache so the next request retries instead of serving the rejection
// forever.
let fontsPromise: Promise<ArrayBuffer[]> | null = null;
const getFonts = () => {
  fontsPromise ??= Promise.all(FONT_URLS.map(fetchFont)).catch(
    (err: unknown) => {
      fontsPromise = null;
      throw err;
    },
  );
  return fontsPromise;
};

export const renderBanner = async (
  key: BannerVariantKey = DEFAULT_VARIANT,
  scale: number = DEFAULT_SCALE,
  headers?: HeadersInit,
): Promise<ImageResponse> => {
  const v = BANNER_VARIANTS[key];
  const P = THEME_TOKENS[v.theme];
  const dark = v.theme === "dark";
  const [anton, serifItalic, mono] = await getFonts();

  // Everything below is authored in design units; s() maps to output pixels.
  const s = (n: number) => n * scale;
  const W = s(BANNER_W);
  const H = s(BANNER_H);
  const [s0, s1, s2, s3, s4, s5] = v.scrim;

  // The centred variant lays its type out with flex instead of absolute lefts.
  const col = (top: number) =>
    v.centred
      ? {
          position: "absolute" as const,
          left: 0,
          top: s(top),
          width: W,
          display: "flex",
          justifyContent: "center",
        }
      : { position: "absolute" as const, left: s(v.textX), top: s(top) };

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: W,
          height: H,
          backgroundColor: P.bg,
          fontFamily: "JetBrains Mono",
        }}
      >
        <img
          src={contoursDataUri(P, dark, scale)}
          alt=""
          width={W}
          height={H}
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* Scrim: contours stay visible at the edges, type stays legible. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: W,
            height: H,
            backgroundImage: `linear-gradient(90deg, rgba(${P.bgRGB},${s0}) 0%, rgba(${P.bgRGB},${s1}) 16%, rgba(${P.bgRGB},${s2}) 32%, rgba(${P.bgRGB},${s3}) 70%, rgba(${P.bgRGB},${s4}) 90%, rgba(${P.bgRGB},${s5}) 100%)`,
          }}
        />

        {/* Masthead rules */}
        <div
          style={{
            position: "absolute",
            left: s(L),
            top: s(34),
            width: W - s(L) * 2,
            height: s(1),
            backgroundColor: P.ruleStrong,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: s(L),
            top: s(BANNER_H - 46),
            width: W - s(L) * 2,
            height: s(1),
            backgroundColor: P.rule,
          }}
        />

        {v.chrome ? (
          <div
            style={{
              position: "absolute",
              left: s(L),
              top: s(50),
              fontSize: s(16),
              letterSpacing: "0.06em",
              color: P.tx3,
            }}
          >
            FIG. 1 — jagnani73
          </div>
        ) : null}
        {v.chrome ? (
          <div
            style={{
              position: "absolute",
              right: s(L),
              top: s(50),
              fontSize: s(16),
              letterSpacing: "0.06em",
              color: P.tx3,
            }}
          >
            EST. 2019
          </div>
        ) : null}

        {v.chrome ? (
          <div
            style={{
              ...col(v.y.eyebrow),
              fontSize: s(16),
              letterSpacing: "0.16em",
              color: P.pri,
            }}
          >
            {EYEBROW}
          </div>
        ) : null}

        <div
          style={{
            ...col(v.y.name),
            fontFamily: "Anton",
            fontSize: s(v.nameSize),
            letterSpacing: "0.01em",
            color: P.tx,
          }}
        >
          {NAME}
        </div>

        <div
          style={{
            ...col(v.y.tagline),
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: s(v.taglineSize),
            color: P.tx2,
          }}
        >
          {TAGLINE}
        </div>

        {v.chrome ? (
          <div
            style={{
              ...col(v.y.footline),
              fontSize: s(16),
              letterSpacing: "0.04em",
              color: P.tx3,
            }}
          >
            {FOOTLINE}
          </div>
        ) : null}
      </div>
    ),
    {
      width: W,
      height: H,
      ...(headers ? { headers } : {}),
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        {
          name: "Instrument Serif",
          data: serifItalic,
          weight: 400,
          style: "italic",
        },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
};
