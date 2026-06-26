"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { THEME_TOKENS } from "@/utils/constants/theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useInView } from "@/hooks/use-in-view";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { dpr as getDpr, hexRgb, rgba } from "@/utils/functions/canvas";
import type { SkyLocation } from "@/utils/types/sky.types";

// A realtime, location-aware star map in a natural perspective view (facing the
// draggable point of view). True alt-az from the observer's location + time, a
// stereographic camera (~112° FOV), a faint starfield, a translucent horizon,
// 10-hour trails, and a speed control that time-lapses the rotation. No embed.
//
// Dark mode is a fixed night scene (the dark token palette). Light mode is a flat
// paper sky with ink stars: the panel tone stays constant and stars/trails/lines
// render in a dark ink ramp at full visibility — no sun, no day↔night blend, so
// the time-lapse never washes out. Card chrome uses live theme vars. Reduced
// motion disables the auto-advance; an in-view gate pauses rAF.

// ── bright-star catalogue (J2000): name, RA hours, Dec deg, magnitude ──
const STARS: [string, number, number, number][] = [
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
const LINES: [string, string][] = [
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
const LABELLED = new Set([
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

// procedural faint background starfield (deterministic — same on server and client)
const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const BG_STARS: [number, number, number][] = (() => {
  const r = mulberry32(73);
  const out: [number, number, number][] = [];
  for (let i = 0; i < 320; i++)
    out.push([
      r() * 24,
      Math.asin(2 * r() - 1) / (Math.PI / 180),
      2.8 + r() * 3,
    ]);
  return out;
})();
const HILL: number[] = (() => {
  const r = mulberry32(91);
  const out: number[] = [];
  for (let i = 0; i <= 64; i++) out.push(r());
  return out;
})();

const D2R = Math.PI / 180;
const TRAIL_MS = 10 * 3600 * 1000;
const TRAIL_N = 54;
const SPEEDS: [string, number][] = [
  ["live", 0],
  ["730×", 730],
  ["7300×", 7300],
];
const AZ0 = 0;
const ALT0 = 30;
const FOVH = 112; // facing North, centred 30° up, 112° wide

const julian = (ms: number) => ms / 86400000 + 2440587.5;
const gmst = (jd: number) => {
  const g = (280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360;
  return g < 0 ? g + 360 : g;
};
const altaz = (raH: number, decD: number, latD: number, lstD: number) => {
  const dec = decD * D2R,
    lat = latD * D2R,
    ha = (lstD - raH * 15) * D2R;
  const sinAlt =
    Math.sin(dec) * Math.sin(lat) +
    Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  let cosAz =
    (Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) /
    (Math.cos(alt) * Math.cos(lat));
  cosAz = Math.max(-1, Math.min(1, cosAz));
  let az = Math.acos(cosAz);
  if (Math.sin(ha) > 0) az = 2 * Math.PI - az;
  return { alt: alt / D2R, az: az / D2R };
};
const lstAt = (ms: number, lon: number) =>
  (((gmst(julian(ms)) + lon) % 360) + 360) % 360;
// unit vector from alt/az (east, north, up)
const vec = (alt: number, az: number): [number, number, number] => {
  const a = alt * D2R,
    z = az * D2R,
    c = Math.cos(a);
  return [c * Math.sin(z), c * Math.cos(z), Math.sin(a)];
};

const MONO = "var(--font-jetbrains), monospace";

// light mode paints ink stars on the flat paper panel — always fully visible (no
// sun, no day↔night fade): a dark→muted star ramp + a toned-down slate starfield.
const LIGHT_STAR = ["#16191C", "rgba(42,58,72,0.95)", "rgba(78,98,114,0.9)"]; // bright, mid, faint
const LIGHT_BG_STAR = "rgba(96,116,134,0.85)";

export const SkyMap = () => {
  const [wrapRef, inView] = useInView<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const tokens = useThemeTokens();
  const isLight = tokens === THEME_TOKENS.light;

  const [loc, setLoc] = useState<SkyLocation>({
    lat: 28.6139,
    lon: 77.209,
    name: "New Delhi, IN",
  });
  const [speed, setSpeed] = useState(reduced ? 0 : 730);
  const [shownTime, setShownTime] = useState(() => Date.now());
  // transient feedback for the "use my location" button (denied / unavailable)
  const [geoMsg, setGeoMsg] = useState<string | null>(null);

  const offsetRef = useRef(0);
  const locRef = useRef(loc);
  const viewRef = useRef({ az: AZ0, alt: ALT0 }); // draggable point of view
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const drawAt = useCallback(
    (vt: number) => {
      const cv = canvasRef.current,
        wrap = wrapRef.current;
      if (!cv || !wrap) return;
      const L = locRef.current;
      const ratio = getDpr();
      const w = wrap.clientWidth,
        h = wrap.clientHeight;
      cv.width = w * ratio;
      cv.height = h * ratio;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // opaque base — light mode is the flat paper panel; dark mode the night ground
      // (so the panel never bleeds through the translucent layers above).
      ctx.fillStyle = isLight ? tokens.panel : tokens.bg;
      ctx.fillRect(0, 0, w, h);

      const lstNow = lstAt(vt, L.lon);

      // dark mode lays a teal night-sky gradient over the base; light mode keeps the
      // flat paper panel (no gradient, no sun-driven day↔night blend).
      if (!isLight) {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "rgba(20,42,52,0.55)");
        grad.addColorStop(0.7, "rgba(10,22,28,0.4)");
        grad.addColorStop(1, "rgba(8,16,18,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // camera basis (stereographic), facing the draggable view direction
      const VAZ = viewRef.current.az,
        VALT = viewRef.current.alt;
      const f = vec(VALT, VAZ);
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
      // stereographic: planar radius = tan(θ/2); scale maps FOVH/2 to half-width
      const scale = w / 2 / Math.tan((FOVH / 4) * D2R);
      const cx = w / 2,
        cy = h * 0.52;
      const project = (alt: number, az: number) => {
        const v = vec(alt, az);
        const fd = v[0] * f[0] + v[1] * f[1] + v[2] * f[2];
        if (fd <= -0.92) return null; // only cull what's nearly behind
        const k = 1 / (1 + fd);
        const rx = (v[0] * right[0] + v[1] * right[1] + v[2] * right[2]) * k;
        const uy = (v[0] * up[0] + v[1] * up[1] + v[2] * up[2]) * k;
        return { x: cx + rx * scale, y: cy - uy * scale, fd };
      };

      // faint background starfield (continues below horizon, dimmed there)
      BG_STARS.forEach(([ra, dec, m]) => {
        const { alt, az } = altaz(ra, dec, L.lat, lstNow);
        if (alt <= -26) return;
        const p = project(alt, az);
        if (!p || p.x < -4 || p.x > w + 4 || p.y < -4 || p.y > h + 4) return;
        const a = Math.max(0.12, 0.7 - (m - 2.8) * 0.16) * (alt < 0 ? 0.45 : 1);
        ctx.globalAlpha = isLight ? a * 0.45 : a;
        ctx.fillStyle = isLight ? LIGHT_BG_STAR : "#9fb9c2";
        ctx.beginPath();
        ctx.arc(p.x, p.y, m > 4.6 ? 0.5 : 0.8, 0, 7);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 10-hour trails (behind named stars)
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      STARS.forEach(([, ra, dec, m]) => {
        if (m > 2.2) return;
        let prev: { x: number; y: number } | null = null;
        for (let k = TRAIL_N; k >= 0; k--) {
          const dtm = (k / TRAIL_N) * TRAIL_MS;
          const lst =
            (((lstNow - (dtm * 360.98564736629) / 86400000) % 360) + 360) % 360;
          const { alt, az } = altaz(ra, dec, L.lat, lst);
          if (alt <= -26) {
            prev = null;
            continue;
          }
          const p = project(alt, az);
          if (!p) {
            prev = null;
            continue;
          }
          if (prev) {
            const recency = 1 - k / TRAIL_N;
            const a = isLight ? 0.05 + recency * 0.2 : 0.05 + recency * 0.34;
            ctx.strokeStyle = rgba(tokens.priRGB, a);
            ctx.lineWidth = 0.6 + recency * 1.0;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
          prev = p;
        }
      });

      // current bright-star positions
      const pos: Record<string, { x: number; y: number; fd: number } | null> =
        {};
      STARS.forEach(([n, ra, dec]) => {
        const { alt, az } = altaz(ra, dec, L.lat, lstNow);
        pos[n] = alt > -18 ? project(alt, az) : null;
      });

      // constellation lines
      ctx.strokeStyle = rgba(tokens.priRGB, isLight ? 0.5 : 0.26);
      ctx.lineWidth = 1;
      LINES.forEach(([a, b]) => {
        const pa = pos[a],
          pb = pos[b];
        if (pa && pb) {
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      });

      // bright stars + labels — full visibility (light mode no longer fades by day)
      STARS.forEach(([n, , , m]) => {
        const p = pos[n];
        if (!p) return;
        const rad = Math.max(0.8, 2.7 - m * 0.6);
        if (!isLight && m < 0.6) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 4.5);
          g.addColorStop(0, rgba(tokens.sigRGB, 0.5));
          g.addColorStop(1, rgba(tokens.sigRGB, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 4.5, 0, 7);
          ctx.fill();
        }
        ctx.fillStyle = isLight
          ? m < 1.0
            ? LIGHT_STAR[0]
            : m < 2.0
              ? LIGHT_STAR[1]
              : LIGHT_STAR[2]
          : m < 1.4
            ? "#EAF4F6"
            : m < 2.2
              ? "#CFE6EC"
              : "rgba(190,212,219,0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, 7);
        ctx.fill();
        if (LABELLED.has(n)) {
          ctx.fillStyle = isLight ? tokens.tx3 : "rgba(143,168,173,0.9)";
          ctx.font = `10px ${MONO}`;
          ctx.fillText(n, p.x + rad + 4, p.y - 4);
        }
      });
      ctx.globalAlpha = 1;

      // ground horizon — sample alt≈0 across the view and fill below
      const horizonPts: { x: number; y: number }[] = [];
      for (let i = 0; i <= 64; i++) {
        const az = VAZ - FOVH / 2 - 8 + (i / 64) * (FOVH + 16);
        const p = project(0.6, az); // a hair above true horizon
        if (p) horizonPts.push(p);
      }
      if (horizonPts.length > 1) {
        ctx.beginPath();
        ctx.moveTo(-4, h + 4);
        horizonPts.forEach((p, i) => {
          const hill = (HILL[i] - 0.5) * 7;
          ctx.lineTo(p.x, p.y + 4 + hill);
        });
        ctx.lineTo(w + 4, h + 4);
        ctx.closePath();
        // translucent dimming (not opaque) — the sky stays faintly visible beyond it
        let topY = h;
        horizonPts.forEach((p) => {
          if (p.y < topY) topY = p.y;
        });
        const gg = ctx.createLinearGradient(0, topY - 6, 0, h);
        gg.addColorStop(0, rgba(tokens.bgRGB, 0.32));
        gg.addColorStop(0.45, rgba(tokens.bgRGB, 0.8));
        gg.addColorStop(1, rgba(tokens.bgRGB, 0.97));
        ctx.fillStyle = gg;
        ctx.fill();
        // horizon line
        ctx.strokeStyle = isLight
          ? rgba(hexRgb(tokens.ruleStrong), 0.7)
          : rgba(tokens.priRGB, 0.22);
        ctx.lineWidth = 1;
        ctx.beginPath();
        horizonPts.forEach((p, i) => {
          const hill = (HILL[i] - 0.5) * 7;
          if (i) ctx.lineTo(p.x, p.y + 4 + hill);
          else ctx.moveTo(p.x, p.y + 4 + hill);
        });
        ctx.stroke();
      }

      // compass marks (N/E/S/W) at their true azimuths, where visible. Gate on the
      // azimuth delta from the view direction: a cardinal behind the camera still
      // projects to a near-centre x (its forward-dot never reaches the cull), so
      // without this it would overlap the front mark — and shift as you drag.
      ctx.fillStyle = tokens.tx3;
      ctx.font = `600 10.5px ${MONO}`;
      ctx.textAlign = "center";
      (
        [
          ["N", 0],
          ["E", 90],
          ["S", 180],
          ["W", 270],
        ] as [string, number][]
      ).forEach(([lab, az]) => {
        const daz = ((az - VAZ + 540) % 360) - 180;
        if (Math.abs(daz) > FOVH / 2) return;
        const cp = project(0.6, az);
        if (cp && cp.x > 8 && cp.x < w - 8) ctx.fillText(lab, cp.x, h - 5);
      });
      ctx.textAlign = "left";

      // top fade
      const fade = ctx.createLinearGradient(0, 0, 0, 26);
      fade.addColorStop(0, tokens.panel);
      fade.addColorStop(1, rgba(tokens.bgRGB, 0));
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, 26);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens, isLight],
  );

  // sync the draw loop's location ref and redraw at once — in `live` mode the 30s
  // interval would otherwise delay a freshly-picked location by up to 30s.
  useEffect(() => {
    locRef.current = loc;
    drawAt(Date.now() + offsetRef.current);
  }, [loc, drawAt]);

  // animation: time-lapse rotation (speed>0) or a once-a-minute live redraw.
  // Skipped while offscreen; reduced motion draws a single static frame.
  useEffect(() => {
    if (reduced || !inView) {
      drawAt(Date.now() + offsetRef.current);
      return;
    }
    drawAt(Date.now() + offsetRef.current); // guaranteed first paint
    let raf = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    let last = performance.now();
    let lastShown = 0;
    if (speed > 0) {
      const tick = (now: number) => {
        const dt = now - last;
        last = now;
        offsetRef.current += dt * speed;
        const vt = Date.now() + offsetRef.current;
        drawAt(vt);
        if (now - lastShown >= 1000) {
          lastShown = now;
          setShownTime(vt);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else {
      offsetRef.current = 0;
      const redraw = () => {
        const vt = Date.now();
        drawAt(vt);
        setShownTime(vt);
      };
      redraw();
      interval = setInterval(redraw, 30000);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (interval) clearInterval(interval);
    };
  }, [speed, drawAt, inView, reduced]);

  // redraw on resize (the card is fluid-width)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => drawAt(Date.now() + offsetRef.current));
    ro.observe(wrap);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawAt]);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoMsg("not supported");
      return;
    }
    setGeoMsg("locating…");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setGeoMsg(null);
        setLoc({
          lat: p.coords.latitude,
          lon: p.coords.longitude,
          name: "your location",
        });
      },
      (err) => {
        console.warn("[sky] geolocation failed", err);
        setGeoMsg(
          err.code === err.PERMISSION_DENIED
            ? "permission denied"
            : "unavailable",
        );
      },
    );
  };

  const d = new Date(shownTime);
  const timeStr = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dayStr = d.toLocaleDateString([], { month: "short", day: "numeric" });

  // drag to pan the point of view (grab-the-sky)
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const degPerPx = FOVH / wrap.clientWidth;
    const dx = e.clientX - dragRef.current.x,
      dy = e.clientY - dragRef.current.y;
    dragRef.current = { x: e.clientX, y: e.clientY };
    let az = (viewRef.current.az - dx * degPerPx) % 360;
    if (az < 0) az += 360;
    const alt = Math.max(-8, Math.min(82, viewRef.current.alt + dy * degPerPx));
    viewRef.current = { az, alt };
    drawAt(Date.now() + offsetRef.current);
  };
  const onUp = () => {
    dragRef.current = null;
  };
  const resetView = () => {
    viewRef.current = { az: AZ0, alt: ALT0 };
    drawAt(Date.now() + offsetRef.current);
  };

  return (
    <div
      style={{
        border: "1px solid var(--rule)",
        borderRadius: "6px",
        overflow: "hidden",
        background: "var(--panel)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 13px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: "10.5px",
            letterSpacing: "0.12em",
            color: "var(--pri)",
          }}
        >
          THE SKY ABOVE ME · drag to look around
        </span>
        <span
          suppressHydrationWarning
          style={{ fontFamily: MONO, fontSize: "10px", color: "var(--tx3)" }}
        >
          {loc.name} · {speed > 0 ? dayStr + " " : ""}
          {timeStr}
        </span>
      </div>
      <div
        ref={wrapRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onDoubleClick={resetView}
        style={{
          position: "relative",
          width: "100%",
          minHeight: 0,
          cursor: "grab",
          touchAction: "none",
        }}
        className="h-[188px] rail:h-[210px]"
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 13px",
          borderTop: "1px solid var(--rule)",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            border: "1px solid var(--rule)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {SPEEDS.map(([lab, v]) => (
            <button
              key={lab}
              onClick={() => setSpeed(v)}
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.04em",
                padding: "4px 9px",
                border: "none",
                cursor: "pointer",
                background: speed === v ? "var(--pri)" : "transparent",
                color: speed === v ? "var(--bg)" : "var(--tx2)",
                transition: "background 0.15s",
              }}
            >
              {lab}
            </button>
          ))}
        </div>
        <button
          onClick={useMyLocation}
          style={{
            fontFamily: MONO,
            fontSize: "10.5px",
            letterSpacing: "0.04em",
            color: "var(--sig)",
            background: "transparent",
            border: "1px dashed var(--pri)",
            borderRadius: "4px",
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          ↳ {geoMsg ?? "use my location"}
        </button>
      </div>
    </div>
  );
};
