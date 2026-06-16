"use client";

import { useId, useState, type ReactNode } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";

// Vendored verbatim from react-easy-marquee v1.2.4. Two tweaks: `animation` shorthand
// expanded to longhand (avoids React's shorthand/longhand warning on pauseOnHover re-render); id from useId().
interface MarqueeProps {
  axis?: "X" | "Y";
  reverse?: boolean;
  align?: "center" | "start" | "end";
  background?: string;
  duration?: number;
  height?: string;
  width?: string;
  pauseOnHover?: boolean;
  children?: ReactNode;
}

const Marquee = ({
  axis = "X",
  reverse,
  align,
  background,
  duration = 5000,
  height = "5rem",
  width = "100%",
  pauseOnHover,
  children,
}: MarqueeProps) => {
  const [animate, setAnimate] = useState<"running" | "paused">("running");
  const id = useId().replace(/:/g, "");
  const offsets = [-1, 0, 1];
  return (
    <div
      onMouseEnter={() => pauseOnHover && setAnimate("paused")}
      onMouseLeave={() => pauseOnHover && setAnimate("running")}
      style={{
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        backgroundColor: background ?? "transparent",
        height,
        width,
      }}
    >
      {offsets.map((offset) => {
        const name = `m${id}s${offset < 0 ? "n1" : offset}`;
        const from = offset * 100;
        const to = (reverse ? -100 : 100) + 100 * offset;
        return (
          <span
            key={offset}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              position: "absolute",
              animationName: name,
              animationDuration: `${duration}ms`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: animate,
              minWidth: "100%",
            }}
          >
            <style>{`@keyframes ${name} { from { transform: translate${axis}(${from}%); } to { transform: translate${axis}(${to}%); } }`}</style>
            <div
              style={{
                width: "100%",
                height: "100%",
                whiteSpace: "nowrap",
                display: "flex",
                overflow: "hidden",
                justifyContent: "space-around",
                flexDirection:
                  axis === "X"
                    ? reverse
                      ? "row-reverse"
                      : "row"
                    : reverse
                    ? "column-reverse"
                    : "column",
                alignItems:
                  align === "center" ? "center" : `flex-${align ?? "start"}`,
              }}
            >
              {children}
            </div>
          </span>
        );
      })}
    </div>
  );
};

const ROW_A: [string, string][] = [
  ["zero dependencies", "sig"],
  ["CSS keyframes — no JS timers", "tx"],
  ["pauseOnHover", "tx2"],
  ["axis: X / Y", "acc"],
  ["reverse", "tx2"],
  ["custom duration", "tx"],
  ["105,000+ downloads", "ok"],
];
const ROW_B: [string, string][] = [
  ["<Marquee>", "sig"],
  ["duration={8000}", "tx2"],
  ['axis="X"', "acc"],
  ["reverse", "tx2"],
  ["pauseOnHover", "tx"],
  ["background", "tx2"],
  ["height / width", "tx2"],
  ["{children}", "ok"],
];

export const FigMarquee = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const reduced = useReducedMotion();
  const colorFor = (k: string) =>
    k === "sig"
      ? t.sig
      : k === "tx"
      ? t.tx
      : k === "acc"
      ? t.acc
      : k === "ok"
      ? t.ok
      : t.tx2;

  const pills = (row: [string, string][]) =>
    row.map(([label, c], i) => {
      const col = colorFor(c);
      return (
        <span
          key={i}
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            margin: "0 7px",
            padding: "7px 15px",
            borderRadius: 99,
            border: `1px solid ${c === "tx2" ? t.rule : col}`,
            background: t.bg,
            fontSize: 13,
            color: col,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      );
    });

  const rowStyle = {
    border: `1px solid ${t.rule}`,
    borderRadius: 6,
    background: t.panel,
    overflow: "hidden",
  } as const;
  const h = mob ? 46 : 52;

  // Static fallback: reduced motion or paused offscreen.
  if (reduced || !active) {
    return (
      <div>
        <FigCaption
          left="fig. 1 — react-easy-marquee, rendering itself"
          right="v1.2.4"
        />
        <div className="flex flex-col gap-2.5">
          {[ROW_A, ROW_B].map((row, i) => (
            <div
              key={i}
              className="flex items-center"
              style={{ ...rowStyle, height: h, padding: "0 8px" }}
            >
              {pills(row)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <FigCaption
        left="fig. 1 — this strip is react-easy-marquee, rendering itself"
        right="v1.2.4 · hover to pause"
      />
      <div className="flex flex-col gap-2.5">
        <div style={rowStyle}>
          <Marquee
            axis="X"
            duration={mob ? 13000 : 18000}
            pauseOnHover
            height={`${h}px`}
            align="center"
          >
            {pills(ROW_A)}
          </Marquee>
        </div>
        <div style={rowStyle}>
          <Marquee
            axis="X"
            reverse
            duration={mob ? 16000 : 24000}
            pauseOnHover
            height={`${h}px`}
            align="center"
          >
            {pills(ROW_B)}
          </Marquee>
        </div>
      </div>
      <p
        className="m-0 mt-2.5 font-mono text-[10.5px]"
        style={{ color: t.tx3 }}
      >
        ↳ no requestAnimationFrame, no scroll listeners — three offset copies
        and one CSS @keyframes translate
      </p>
    </div>
  );
};
