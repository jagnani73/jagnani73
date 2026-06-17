"use client";

import { useRef } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCanvasScene } from "@/hooks/use-canvas-scene";
import { contourSegments } from "@/utils/functions/contours";
import { rgba } from "@/utils/functions/canvas";

// Virtual-time multiplier: contours advance 2.5× wall-clock so the drift reads at a glance.
const SPEED = 2.5;

// fig. 1 — masthead contours: marching-squares iso-lines of a slow scalar field that bumps up under the cursor.
export const BandCanvas = () => {
  const tokens = useThemeTokens();
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  useCanvasScene(
    hostRef,
    reduced,
    (ctx, host, canvas) => {
      const priT = (a: number) => rgba(tokens.priRGB, a);
      const sigT = (a: number) => rgba(tokens.sigRGB, a);
      const BG = tokens.fluidBg;
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
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);

      // Preload the static frame to a developed pattern (matches the old reduced-motion frame).
      let vt = reduced ? 9000 : 0;

      return {
        draw: ({ W, H, dpr, dt }) => {
          vt += dt * SPEED;
          const t = vt * 0.000045;
          const f = (x: number, y: number) => {
            let v =
              Math.sin(x * 0.011 + t * 2.1) * Math.cos(y * 0.017 - t * 1.4) +
              Math.sin((x + y) * 0.007 + t) * 0.7 +
              Math.sin(Math.hypot(x - W * 0.3, y - H * 0.6) * 0.012 - t * 1.8) *
                0.5;
            if (ptr.y > 0) {
              const d = Math.hypot(ptr.x - x, ptr.y - y);
              v += Math.exp((-d * d) / 5200) * 0.9;
            }
            return v / 2.2;
          };

          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.fillStyle = BG;
          ctx.fillRect(0, 0, W, H);
          contourSegments(W, H, f).forEach((segs, li) => {
            ctx.strokeStyle = li === 3 ? sigT(0.4) : priT(0.16 + li * 0.07);
            ctx.lineWidth = li === 3 ? 1.2 : 1;
            ctx.beginPath();
            for (const [x1, y1, x2, y2] of segs) {
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
            }
            ctx.stroke();
          });
        },
        cleanup: () => {
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
        },
      };
    },
    [tokens, reduced],
  );

  return <div ref={hostRef} className="absolute inset-0" />;
};
