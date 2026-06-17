"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import { dpr as getDpr } from "@/utils/functions/canvas";

/** Per-frame info handed to a scene's `draw`. */
export interface SceneFrame {
  W: number;
  H: number;
  dpr: number;
  now: number;
  /** ms since the previous frame, clamped to 100; `0` on the static (reduced-motion) frame. */
  dt: number;
}

export interface Scene {
  draw: (frame: SceneFrame) => void;
  /** Tear down anything `setup` registered (listeners, etc.). */
  cleanup?: () => void;
}

/**
 * Owns the 2D-canvas lifecycle shared by the masthead band and the record
 * constellation: element creation, DPR-capped resize, the reduced-motion static
 * frame, the rAF loop, offscreen pause (IntersectionObserver), and teardown.
 *
 * `setup` runs once after the context is ready and returns the per-frame `draw`
 * (closing over `ctx` and any scene state) plus an optional `cleanup`.
 */
export const useCanvasScene = (
  hostRef: RefObject<HTMLDivElement | null>,
  reduced: boolean,
  setup: (
    ctx: CanvasRenderingContext2D,
    host: HTMLDivElement,
    canvas: HTMLCanvasElement,
  ) => Scene,
  deps: DependencyList,
): void => {
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    let W = 0;
    let H = 0;
    let ratio = 1;
    const resize = () => {
      const r = host.getBoundingClientRect();
      ratio = getDpr();
      W = r.width;
      H = r.height;
      canvas.width = W * ratio;
      canvas.height = H * ratio;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const scene = setup(ctx, host, canvas);
    const frame = (now: number, dt: number): void =>
      scene.draw({ W, H, dpr: ratio, now, dt });

    const teardown = (): void => {
      ro.disconnect();
      scene.cleanup?.();
      canvas.remove();
    };

    if (reduced) {
      frame(performance.now(), 0); // static end-state, no loop
      return teardown;
    }

    let raf: number | null = null;
    let killed = false;
    let visible = true;
    let last = performance.now();
    const loop = (now: number): void => {
      if (killed || !visible) {
        raf = null;
        return;
      }
      const dt = Math.min(now - last, 100);
      last = now;
      frame(now, dt);
      raf = requestAnimationFrame(loop);
    };

    // Pause the loop while the host scrolls offscreen.
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && raf === null && !killed) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(host);
    raf = requestAnimationFrame(loop);

    return () => {
      killed = true;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      teardown();
    };
    // deps are owned by the caller; this hook intentionally forwards them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
