// Star catalogue + alt-az projection shared by the live sky map
// (home/sky-map.tsx, redrawn each frame onto a canvas) and the static X banner
// (utils/functions/banner.tsx, traced once into SVG). Both must plot the SAME
// sky — keeping the catalogue and the camera here is the only way to guarantee
// that without the two copies silently drifting apart.

import type { SkyLocation } from "@/utils/types/sky.types";

/** Bright-star catalogue (J2000): name, RA hours, Dec deg, magnitude. */
export const STARS: [string, number, number, number][] = [
  ["Sirius", 6.7525, -16.716, -1.46],
  ["Canopus", 6.399, -52.696, -0.74],
  ["Arcturus", 14.261, 19.182, -0.05],
  ["Vega", 18.615, 38.784, 0.03],
  ["Capella", 5.278, 45.998, 0.08],
  ["Rigel", 5.242, -8.202, 0.13],
  ["Procyon", 7.655, 5.225, 0.34],
  ["Betelgeuse", 5.919, 7.407, 0.5],
  ["Achernar", 1.629, -57.237, 0.46],
  ["Hadar", 14.064, -60.373, 0.61],
  ["Altair", 19.846, 8.868, 0.77],
  ["Acrux", 12.443, -63.099, 0.77],
  ["Aldebaran", 4.599, 16.509, 0.85],
  ["Antares", 16.49, -26.432, 1.09],
  ["Spica", 13.42, -11.161, 1.04],
  ["Pollux", 7.755, 28.026, 1.14],
  ["Fomalhaut", 22.961, -29.622, 1.16],
  ["Deneb", 20.69, 45.28, 1.25],
  ["Mimosa", 12.795, -59.689, 1.25],
  ["Regulus", 10.139, 11.967, 1.35],
  ["Adhara", 6.977, -28.972, 1.5],
  ["Castor", 7.577, 31.888, 1.58],
  ["Gacrux", 12.519, -57.113, 1.59],
  ["Shaula", 17.56, -37.104, 1.62],
  ["Bellatrix", 5.418, 6.35, 1.64],
  ["Elnath", 5.438, 28.608, 1.65],
  ["Miaplacidus", 9.22, -69.717, 1.69],
  ["Alnilam", 5.604, -1.202, 1.69],
  ["Alnitak", 5.679, -1.943, 1.74],
  ["Alioth", 12.9, 55.96, 1.76],
  ["Dubhe", 11.062, 61.751, 1.79],
  ["Mirfak", 3.405, 49.861, 1.79],
  ["Wezen", 7.14, -26.393, 1.83],
  ["Alkaid", 13.792, 49.313, 1.85],
  ["Avior", 8.375, -59.51, 1.86],
  ["Menkalinan", 5.992, 44.947, 1.9],
  ["Atria", 16.811, -69.028, 1.91],
  ["Alphard", 9.46, -8.659, 1.98],
  ["Polaris", 2.53, 89.264, 1.98],
  ["Mirzam", 6.378, -17.956, 1.98],
  ["Hamal", 2.119, 23.462, 2.0],
  ["Diphda", 0.726, -17.987, 2.04],
  ["Nunki", 18.921, -26.297, 2.05],
  ["Mirach", 1.162, 35.621, 2.05],
  ["Alpheratz", 0.14, 29.09, 2.06],
  ["Kochab", 14.845, 74.156, 2.08],
  ["Saiph", 5.796, -9.67, 2.09],
  ["Denebola", 11.818, 14.572, 2.11],
  ["Algol", 3.136, 40.956, 2.12],
  ["Mintaka", 5.533, -0.299, 2.23],
  ["Mizar", 13.399, 54.925, 2.23],
  ["Schedar", 0.675, 56.537, 2.24],
  ["Caph", 0.153, 59.15, 2.28],
  ["Merak", 11.031, 56.383, 2.37],
  ["Scheat", 23.063, 28.083, 2.42],
  ["Phecda", 11.897, 53.695, 2.44],
  ["Markab", 23.079, 15.205, 2.49],
  ["Gamma Cas", 0.945, 60.717, 2.47],
  ["Enif", 21.736, 9.875, 2.4],
  ["Ruchbah", 1.43, 60.235, 2.68],
  ["Megrez", 12.257, 57.033, 3.31],
  ["Altais", 19.209, 67.661, 3.07],
];

/** Constellation segments, by star name. */
export const LINES: [string, string][] = [
  ["Betelgeuse", "Bellatrix"],
  ["Bellatrix", "Mintaka"],
  ["Mintaka", "Alnilam"],
  ["Alnilam", "Alnitak"],
  ["Alnitak", "Betelgeuse"],
  ["Mintaka", "Rigel"],
  ["Alnitak", "Saiph"],
  ["Dubhe", "Merak"],
  ["Merak", "Phecda"],
  ["Phecda", "Megrez"],
  ["Megrez", "Dubhe"],
  ["Megrez", "Alioth"],
  ["Alioth", "Mizar"],
  ["Mizar", "Alkaid"],
  ["Caph", "Schedar"],
  ["Schedar", "Gamma Cas"],
  ["Gamma Cas", "Ruchbah"],
  ["Acrux", "Gacrux"],
  ["Dubhe", "Polaris"],
  ["Kochab", "Polaris"],
];

export const LABELLED = new Set([
  "Sirius",
  "Vega",
  "Arcturus",
  "Capella",
  "Polaris",
  "Deneb",
  "Altair",
  "Betelgeuse",
  "Aldebaran",
  "Pollux",
  "Dubhe",
]);

/** Seeded RNG — the starfield must be identical on server and client. */
export const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Procedural faint background starfield over the whole sphere: RA hours, Dec
 * deg, magnitude. Only a fraction lands in any one frame, so a wide crop (the X
 * header) asks for a much higher count than the square-ish sky map card.
 */
export const makeBgStars = (
  count: number,
  seed: number,
): [number, number, number][] => {
  const r = mulberry32(seed);
  const out: [number, number, number][] = [];
  for (let i = 0; i < count; i++)
    out.push([
      r() * 24,
      Math.asin(2 * r() - 1) / (Math.PI / 180),
      2.8 + r() * 3,
    ]);
  return out;
};

export const BG_STARS = makeBgStars(320, 73);

/** Ground silhouette noise. */
export const HILL: number[] = (() => {
  const r = mulberry32(91);
  const out: number[] = [];
  for (let i = 0; i <= 64; i++) out.push(r());
  return out;
})();

export const D2R = Math.PI / 180;
export const TRAIL_MS = 10 * 3600 * 1000;
export const TRAIL_N = 54;
/** Facing North, centred 30° up, 112° wide. */
export const AZ0 = 0;
export const ALT0 = 30;
export const FOVH = 112;

export const julian = (ms: number) => ms / 86400000 + 2440587.5;

export const gmst = (jd: number) => {
  const g = (280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360;
  return g < 0 ? g + 360 : g;
};

export const altaz = (
  raH: number,
  decD: number,
  latD: number,
  lstD: number,
) => {
  const dec = decD * D2R,
    lat = latD * D2R,
    ha = (lstD - raH * 15) * D2R;
  const sinAlt =
    Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  let cosAz =
    (Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) /
    (Math.cos(alt) * Math.cos(lat));
  cosAz = Math.max(-1, Math.min(1, cosAz));
  let az = Math.acos(cosAz);
  if (Math.sin(ha) > 0) az = 2 * Math.PI - az;
  return { alt: alt / D2R, az: az / D2R };
};

export const lstAt = (ms: number, lon: number) =>
  (((gmst(julian(ms)) + lon) % 360) + 360) % 360;

/** Unit vector from alt/az (east, north, up). */
export const vec = (alt: number, az: number): [number, number, number] => {
  const a = alt * D2R,
    z = az * D2R,
    c = Math.cos(a);
  return [c * Math.sin(z), c * Math.cos(z), Math.sin(a)];
};

export interface Projected {
  x: number;
  y: number;
  /** Dot product with the view axis; <= -0.92 is culled as behind the camera. */
  fd: number;
}

/**
 * Stereographic camera facing (viewAlt, viewAz). Planar radius = tan(θ/2), and
 * `scale` maps half the horizontal FOV onto half the width.
 */
export const makeProjector = (
  w: number,
  h: number,
  viewAlt: number,
  viewAz: number,
  fovH: number = FOVH,
) => {
  const f = vec(viewAlt, viewAz);
  const right = (() => {
    const r: [number, number, number] = [f[1], -f[0], 0];
    const n = Math.hypot(r[0], r[1], r[2]) || 1;
    return [r[0] / n, r[1] / n, r[2] / n] as [number, number, number];
  })();
  const up: [number, number, number] = [
    right[1] * f[2] - right[2] * f[1],
    right[2] * f[0] - right[0] * f[2],
    right[0] * f[1] - right[1] * f[0],
  ];
  const scale = w / 2 / Math.tan((fovH / 4) * D2R);
  const cx = w / 2;
  const cy = h * 0.52;

  return (alt: number, az: number): Projected | null => {
    const v = vec(alt, az);
    const fd = v[0] * f[0] + v[1] * f[1] + v[2] * f[2];
    if (fd <= -0.92) return null;
    const k = 1 / (1 + fd);
    const rx = (v[0] * right[0] + v[1] * right[1] + v[2] * right[2]) * k;
    const uy = (v[0] * up[0] + v[1] * up[1] + v[2] * up[2]) * k;
    return { x: cx + rx * scale, y: cy - uy * scale, fd };
  };
};

/** Compass word for an azimuth in degrees, e.g. 90 → "east". */
export const compassName = (az: number) => {
  const names = [
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest",
  ];
  const i = Math.round((((az % 360) + 360) % 360) / 45) % 8;
  return names[i];
};

const degMin = (v: number, pos: string, neg: string) => {
  const a = Math.abs(v);
  const d = Math.floor(a);
  const m = Math.round((a - d) * 60);
  return `${d}°${String(m).padStart(2, "0")}′${v >= 0 ? pos : neg}`;
};

/** Latitude alone, e.g. 1°21′N. */
export const formatLat = (loc: SkyLocation) => degMin(loc.lat, "N", "S");

/** Formats a decimal lat/lon as a plate caption, e.g. 1°21′N 103°49′E. */
export const formatCoords = (loc: SkyLocation) =>
  `${degMin(loc.lat, "N", "S")} ${degMin(loc.lon, "E", "W")}`;
