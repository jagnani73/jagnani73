/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) requires <img>, not next/image */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { THEME_TOKENS } from "@/utils/constants/theme-tokens";
import { contourSegments } from "@/utils/functions/contours";
import { STATUS } from "@/utils/constants/site";

export const runtime = "nodejs";
export const alt = "Yashvardhan Jagnani — software, shipped at agent speed";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const W = 1200;
const H = 630;
const L = 64;

// Palette from the single source (dark theme — the OG card is always dark).
const P = THEME_TOKENS.dark;
const C = {
  bg: P.bg,
  fluidBg: P.fluidBg,
  pri: P.priRGB,
  sig: P.sigRGB,
  tx: P.tx,
  tx2: P.tx2,
  tx3: P.tx3,
  rule: P.rule,
  ruleStrong: P.ruleStrong,
  acc: P.acc,
};

const toDataUri = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

// Marching-squares contour field (deterministic, t = 3.6) → one SVG path per
// level. Geometry comes from the shared generator so this matches the live band.
const contoursDataUri = () => {
  const t = 3.6;
  const f = (x: number, y: number) => {
    const v =
      Math.sin(x * 0.011 + t * 2.1) * Math.cos(y * 0.017 - t * 1.4) +
      Math.sin((x + y) * 0.007 + t) * 0.7 +
      Math.sin(Math.hypot(x - W * 0.66, y - H * 0.5) * 0.012 - t * 1.8) * 0.5;
    return v / 2.2;
  };
  let paths = "";
  contourSegments(W, H, f).forEach((segs, li) => {
    const stroke = li === 3 ? `rgb(${C.sig})` : `rgb(${C.pri})`;
    const opacity = li === 3 ? 0.32 : 0.12 + li * 0.05;
    const lw = li === 3 ? 1.2 : 1;
    let d = "";
    for (const [x1, y1, x2, y2] of segs) {
      d += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
    paths += `<path d="${d}" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="${lw}" fill="none"/>`;
  });
  return toDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${C.fluidBg}"/>${paths}</svg>`,
  );
};

// Fonts are remote (jsdelivr) — surface a CDN failure in build/function logs
// instead of letting a garbage buffer fail opaquely inside ImageResponse.
const fetchFont = async (url: string): Promise<ArrayBuffer> => {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`[og] font fetch failed (${res.status}): ${url}`);
    throw new Error(`og font ${res.status}`);
  }
  return res.arrayBuffer();
};

const Pill = ({ label }: { label: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: 34,
      padding: "0 16px",
      border: `1px solid ${C.rule}`,
      borderRadius: 17,
      fontFamily: "JetBrains Mono",
      fontWeight: 500,
      fontSize: 17,
      color: C.tx2,
    }}
  >
    {label}
  </div>
);

const Image = async () => {
  const logoUri = toDataUri(
    readFileSync(join(process.cwd(), "public/logo.svg"), "utf8"),
  );

  const [anton, serifItalic, mono, monoMed] = await Promise.all([
    fetchFont("https://cdn.jsdelivr.net/fontsource/fonts/anton@latest/latin-400-normal.ttf"),
    fetchFont("https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@latest/latin-400-italic.ttf"),
    fetchFont("https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf"),
    fetchFont("https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: W,
          height: H,
          backgroundColor: C.bg,
          fontFamily: "JetBrains Mono",
        }}
      >
        <img src={contoursDataUri()} alt="" width={W} height={H} style={{ position: "absolute", top: 0, left: 0 }} />
        {/* legibility scrim */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: W,
            height: H,
            backgroundImage: `linear-gradient(90deg, rgba(${P.bgRGB},0.96) 0%, rgba(${P.bgRGB},0.62) 62%, rgba(${P.bgRGB},0.80) 100%)`,
          }}
        />

        <div style={{ position: "absolute", left: L, top: 30, width: W - L * 2, height: 1, backgroundColor: C.ruleStrong }} />
        <img src={logoUri} alt="" width={34} height={34} style={{ position: "absolute", left: L, top: 50 }} />
        <div style={{ position: "absolute", left: L + 48, top: 57, fontSize: 18, color: C.tx3 }}>jagnani73</div>
        <div style={{ position: "absolute", right: L, top: 57, fontSize: 18, color: C.tx3 }}>
          EST. 2019 — BLOCKCHAIN · AI · SOFTWARE
        </div>

        <div
          style={{
            position: "absolute",
            left: L,
            top: 150,
            display: "flex",
            flexDirection: "column",
            fontFamily: "Anton",
            fontSize: 104,
            lineHeight: 1.04,
            letterSpacing: "0.01em",
            color: C.tx,
          }}
        >
          <div>YASHVARDHAN</div>
          <div>JAGNANI</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: L,
            top: 392,
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 42,
            color: C.tx2,
          }}
        >
          software, shipped at agent speed.
        </div>

        <div style={{ position: "absolute", left: L, top: 486, width: W - L * 2, height: 1, backgroundColor: C.rule }} />
        <div style={{ position: "absolute", left: L, top: 504, display: "flex", gap: 10 }}>
          <Pill label="BLOCKCHAIN" />
          <Pill label="AI-NATIVE" />
          <Pill label="FORWARD-DEPLOYED" />
        </div>
        <div style={{ position: "absolute", right: L, top: 511, display: "flex", fontSize: 17 }}>
          <span style={{ color: C.tx3 }}>STATUS:&nbsp;</span>
          <span style={{ color: C.acc }}>{STATUS}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: monoMed, weight: 500, style: "normal" },
      ],
    },
  );
};

export default Image;
