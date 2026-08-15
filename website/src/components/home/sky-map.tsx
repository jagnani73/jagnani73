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
import {
  ALT0,
  AZ0,
  BG_STARS,
  FOVH,
  HILL,
  LABELLED,
  LINES,
  STARS,
  TRAIL_MS,
  TRAIL_N,
  altaz,
  lstAt,
  makeProjector,
} from "@/utils/functions/sky";
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

const SPEEDS: [string, number][] = [
  ["live", 0],
  ["730×", 730],
  ["7300×", 7300],
];

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

      // stereographic camera facing the draggable point of view — shared with
      // the X banner via utils/functions/sky so both plot the same sky
      const VAZ = viewRef.current.az;
      const project = makeProjector(w, h, viewRef.current.alt, VAZ);

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
