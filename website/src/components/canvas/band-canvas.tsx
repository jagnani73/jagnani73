"use client";

import { useRef } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCanvasScene } from "@/hooks/use-canvas-scene";
import { contourSegments } from "@/utils/functions/contours";
import { rgba } from "@/utils/functions/canvas";

// Virtual-time multiplier: contours advance 2.5× wall-clock so the drift reads at a glance.
const SPEED = 2.5;

// Tap/click ripple: an expanding, decaying ring that warps the iso-lines outward.
// Works on both pointer types (mouse click + finger tap) so touch gets an
// interaction the hover-trace can't give it.
const RIPPLE_LIFE = 1300; // ms a ripple lives
const RIPPLE_SPD = 0.34; // px/ms the ring radius grows
const RIPPLE_AMP = 1.15; // field bump at the ring crest (fades to 0 over its life)
const RIPPLE_W2 = 1500; // ring thickness (Gaussian denominator)

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
      // active tap/click ripples; `age` advances in real ms each frame
      const ripples: { x: number; y: number; age: number }[] = [];

      // Hover-trace is a desktop affordance (no touch equivalent): touch gets the
      // tap-ripple below instead, so skip the persistent bump for touch pointers.
      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const r = canvas.getBoundingClientRect();
        ptr.x = e.clientX - r.left;
        ptr.y = e.clientY - r.top;
      };
      const onLeave = () => {
        ptr.x = -1e4;
        ptr.y = -1e4;
      };
      // A click (desktop) or tap (touch) drops a ripple. Not paired with
      // `touch-action: none`, so a touch-drag still scrolls the page past the hero.
      const onDown = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, age: 0 });
        if (ripples.length > 6) ripples.shift(); // cap rapid-tap pile-up
      };
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);

      // Preload the static frame to a developed pattern (matches the old reduced-motion frame).
      let vt = reduced ? 9000 : 0;

      return {
        draw: ({ W, H, dpr, dt }) => {
          vt += dt * SPEED;
          const t = vt * 0.000045;
          // age ripples in real time and drop the spent ones (oldest first)
          for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].age += dt;
            if (ripples[i].age >= RIPPLE_LIFE) ripples.splice(i, 1);
          }
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
            for (const rp of ripples) {
              const p = rp.age / RIPPLE_LIFE; // 0 → 1 over its life
              const ring = Math.hypot(rp.x - x, rp.y - y) - rp.age * RIPPLE_SPD;
              v += RIPPLE_AMP * (1 - p) * Math.exp((-ring * ring) / RIPPLE_W2);
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
          host.removeEventListener("pointerdown", onDown);
        },
      };
    },
    [tokens, reduced],
  );

  return <div ref={hostRef} className="absolute inset-0" />;
};
