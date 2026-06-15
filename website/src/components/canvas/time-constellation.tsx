"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TimeConstellationProps {
  scrollVel: RefObject<number>;
  bursts: RefObject<number[]>;
  mob: boolean;
  gut: number;
}

// fig. 2 — a slow drifting node-mesh behind the year gutter. Nodes wander, link
// within range, drift with scroll velocity, and ripple when a year confirms.
// Ported from work.jsx, reading theme colors from tokens instead of window.PAGE_THEME.
export const TimeConstellation = ({
  scrollVel,
  bursts,
  mob,
  gut,
}: TimeConstellationProps) => {
  const tokens = useThemeTokens();
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const priRGB = tokens.priRGB;
    const sigRGB = tokens.sigRGB;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
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

    // Deterministic LCG so the mesh looks identical each load.
    let s = 59;
    const rr = () => {
      s = (s * 16807 + 17) % 2147483647;
      return (s & 0xffff) / 0xffff;
    };
    const nodes = Array.from({ length: 40 }, () => ({
      x: rr(),
      y: rr(),
      vx: (rr() - 0.5) * 0.011,
      vy: (rr() - 0.5) * 0.011,
    }));
    const ripples: { y: number; t0: number }[] = [];

    let last = performance.now();

    const render = (nowAbs: number, animate: boolean) => {
      const dt = animate ? Math.min((nowAbs - last) / 1000, 0.05) : 0.016;
      last = nowAbs;
      const now = nowAbs;

      // scrollVel is decayed by the owner (RecordClient); here we only read it.
      const sv = animate ? scrollVel.current * 0.00002 : 0;
      while (bursts.current.length) {
        ripples.push({
          y: bursts.current.pop()! / Math.max(window.innerHeight, 1),
          t0: now,
        });
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].t0 > 1600) ripples.splice(i, 1);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const pos = nodes.map((n) => {
        n.x += n.vx * dt * 60 * 0.016;
        n.y += n.vy * dt * 60 * 0.016 - sv;
        if (n.x < 0.05 || n.x > 0.95) {
          n.vx *= -1;
          n.x = Math.max(0.05, Math.min(0.95, n.x));
        }
        if (n.y < -0.02) n.y += 1.04;
        if (n.y > 1.02) n.y -= 1.04;
        return { x: n.x * W, y: n.y * H, yn: n.y };
      });

      const boost = (yn: number) => {
        let b = 0;
        for (const rp of ripples) {
          const age = (now - rp.t0) / 1600;
          const d = Math.abs(yn - rp.y);
          b = Math.max(b, Math.max(0, 1 - age) * Math.max(0, 1 - d * 6));
        }
        return b;
      };

      ctx.lineWidth = 0.8;
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 4200) {
            const b = Math.max(boost(pos[i].yn), boost(pos[j].yn));
            const rgb = b > 0.1 ? sigRGB : priRGB;
            ctx.strokeStyle = `rgba(${rgb},${(0.22 + 0.45 * b) * (1 - d2 / 4200)})`;
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pos) {
        const b = boost(p.yn);
        const sz = 4 + b * 3;
        ctx.fillStyle = `rgba(${sigRGB},${0.45 + 0.25 * b})`;
        ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
      }
    };

    if (reduced) {
      render(performance.now(), false);
      return () => {
        killed = true;
        ro.disconnect();
        canvas.remove();
      };
    }

    const loop = (nowAbs: number) => {
      if (killed) return;
      render(nowAbs, true);
      raf = requestAnimationFrame(loop);
    };
    loop(performance.now());

    return () => {
      killed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.remove();
    };
  }, [tokens, reduced, mob, gut, scrollVel, bursts]);

  return (
    <div
      className="pointer-events-none fixed z-0"
      style={{ left: mob ? 0 : 64, top: mob ? 46 : 0, bottom: 0, width: gut }}
    >
      <div
        ref={hostRef}
        className="absolute inset-0"
        style={{ opacity: mob ? 0.55 : 0.7 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 55%, rgba(var(--bg-rgb),0.95) 94%)",
        }}
      />
    </div>
  );
};
