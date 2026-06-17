"use client";

import { useRef } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCanvasScene } from "@/hooks/use-canvas-scene";
import { rgba } from "@/utils/functions/canvas";
import { MOBILE_BAR_H } from "@/utils/constants/site";
import type { TimeConstellationProps } from "@/utils/types/component.types";

// fig. 2 — drifting node-mesh behind the year gutter; nodes link within range and ripple when a year confirms.
export const TimeConstellation = ({
  scrollVel,
  bursts,
  mob,
  gut,
}: TimeConstellationProps) => {
  const tokens = useThemeTokens();
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  useCanvasScene(
    hostRef,
    reduced,
    (ctx) => {
      const { priRGB, sigRGB } = tokens;

      // Deterministic LCG so the mesh is identical each load.
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

      return {
        draw: ({ W, H, dpr, now, dt }) => {
          const dts = Math.min(dt / 1000, 0.05);
          // scrollVel is decayed by the owner (RecordClient); read-only here.
          const sv = scrollVel.current * 0.00002;
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
            n.x += n.vx * dts * 60 * 0.016;
            n.y += n.vy * dts * 60 * 0.016 - sv;
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
                ctx.strokeStyle = rgba(rgb, (0.22 + 0.45 * b) * (1 - d2 / 4200));
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
            ctx.fillStyle = rgba(sigRGB, 0.45 + 0.25 * b);
            ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
          }
        },
      };
    },
    [tokens, reduced, scrollVel, bursts],
  );

  return (
    <div
      className="pointer-events-none fixed z-0"
      style={{
        left: mob ? 0 : 64,
        top: mob ? MOBILE_BAR_H : 0,
        // Stable large-viewport height (not bottom:0) so the mobile URL-bar
        // show/hide doesn't resize the canvas and flicker the fade on scroll.
        height: mob ? `calc(100lvh - ${MOBILE_BAR_H}px)` : "100lvh",
        width: gut,
      }}
    >
      <div
        ref={hostRef}
        className="absolute inset-0"
        style={{ opacity: mob ? 0.4 : 0.5 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: [
            // top fade — soften the panel's top edge so it doesn't read as
            // spilling above the header margin when scrolled.
            "linear-gradient(180deg, rgba(var(--bg-rgb),1), rgba(var(--bg-rgb),0) 64px)",
            // right fade — dissolve into the content column. rgba(bg,0) (not
            // `transparent`) avoids a grey midtone on the light theme.
            "linear-gradient(90deg, rgba(var(--bg-rgb),0) 55%, rgba(var(--bg-rgb),0.95) 94%)",
          ].join(", "),
        }}
      />
    </div>
  );
};
