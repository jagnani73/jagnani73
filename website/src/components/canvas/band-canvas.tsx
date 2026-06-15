"use client";

import { useEffect, useRef } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SPEED = 2.5;

const hexToRGB = (h: string): string => {
  try {
    return `${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)}`;
  } catch {
    return "111,216,228";
  }
};

// fig. 1 — the masthead "contours" field: a marching-squares iso-line render of a
// slow-moving scalar field that bumps up under the cursor. Ported from band-final.jsx
// (contours engine), with prefers-reduced-motion + offscreen pause guards added.
export const BandCanvas = () => {
  const tokens = useThemeTokens();
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const priRGB = tokens.priRGB;
    const sigRGB = hexToRGB(tokens.sig);
    const priT = (a: number) => `rgba(${priRGB},${a})`;
    const sigT = (a: number) => `rgba(${sigRGB},${a})`;
    const BG = tokens.fluidBg;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;";
    el.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf: number | null = null;
    let killed = false;
    let visible = true;
    const ptr = { x: -1e4, y: -1e4 };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
    };
    const onLeave = () => {
      ptr.x = -1e4;
      ptr.y = -1e4;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const drawContours = (now: number) => {
      const cell = 13;
      const t = now * 0.000045;
      const f = (x: number, y: number) => {
        let v =
          Math.sin(x * 0.011 + t * 2.1) * Math.cos(y * 0.017 - t * 1.4) +
          Math.sin((x + y) * 0.007 + t) * 0.7 +
          Math.sin(Math.hypot(x - W * 0.3, y - H * 0.6) * 0.012 - t * 1.8) * 0.5;
        if (ptr.y > 0) {
          const d = Math.hypot(ptr.x - x, ptr.y - y);
          v += Math.exp((-d * d) / 5200) * 0.9;
        }
        return v / 2.2;
      };
      const cols = Math.ceil(W / cell) + 1;
      const rows = Math.ceil(H / cell) + 1;
      const grid: number[][] = [];
      for (let j = 0; j <= rows; j++) {
        grid.push([]);
        for (let i = 0; i <= cols; i++) grid[j].push(f(i * cell, j * cell));
      }
      const LEVELS = [-0.28, -0.08, 0.12, 0.32, 0.52];
      LEVELS.forEach((lvl, li) => {
        ctx.strokeStyle = li === 3 ? sigT(0.4) : priT(0.16 + li * 0.07);
        ctx.lineWidth = li === 3 ? 1.2 : 1;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const a = grid[j][i];
            const b = grid[j][i + 1];
            const c = grid[j + 1][i + 1];
            const d = grid[j + 1][i];
            const x = i * cell;
            const y = j * cell;
            const pts: [number, number][] = [];
            const lerp = (p: number, q: number) => (lvl - p) / (q - p);
            if (a < lvl !== b < lvl) pts.push([x + cell * lerp(a, b), y]);
            if (b < lvl !== c < lvl) pts.push([x + cell, y + cell * lerp(b, c)]);
            if (d < lvl !== c < lvl) pts.push([x + cell * lerp(d, c), y + cell]);
            if (a < lvl !== d < lvl) pts.push([x, y + cell * lerp(a, d)]);
            if (pts.length === 2) {
              ctx.moveTo(pts[0][0], pts[0][1]);
              ctx.lineTo(pts[1][0], pts[1][1]);
            }
          }
        }
        ctx.stroke();
      });
    };

    const renderFrame = (vt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      drawContours(vt);
    };

    if (reduced) {
      // Resolved end-state: a single representative contour frame, no loop.
      renderFrame(9000);
      return () => {
        killed = true;
        ro.disconnect();
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        canvas.remove();
      };
    }

    let vt = 0;
    let last = performance.now();
    const loop = (nowAbs: number) => {
      if (killed || !visible) {
        raf = null;
        return;
      }
      vt += Math.min(nowAbs - last, 100) * SPEED;
      last = nowAbs;
      renderFrame(vt);
      raf = requestAnimationFrame(loop);
    };

    // Pause the rAF loop when the band scrolls offscreen.
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && raf === null && !killed) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(el);

    raf = requestAnimationFrame(loop);

    return () => {
      killed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      canvas.remove();
    };
  }, [tokens, reduced]);

  return <div ref={hostRef} className="absolute inset-0" />;
};
