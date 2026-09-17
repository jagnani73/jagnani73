"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_EASE,
  FIG_HOLD,
  FIG_TRACK,
  MONO as M,
  figH,
  figPanel,
  figType,
} from "./fig-style";

const BEACON_PINS = [
  { x: 30, y: 28 },
  { x: 62, y: 40 },
  { x: 44, y: 58 },
  { x: 72, y: 66 },
  { x: 22, y: 62 },
  { x: 56, y: 22 },
];

// Bharat Beacon — distress signals polled onto the government dashboard.
export const FigBeacon = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  // One signal per beat; the full map holds for FIG_HOLD beats.
  const n = useTick(
    FIG_BEAT.base,
    BEACON_PINS.length + FIG_HOLD,
    active,
    BEACON_PINS.length,
  );
  const shown = Math.min(n, BEACON_PINS.length);

  return (
    <div>
      <FigCaption
        left="fig. 1: distress signals polled onto the government dashboard in real time"
        right="IoT · MapBox · HTTP polling"
      />
      <div
        style={{
          ...figPanel(t),
          height: figH("lg", mob),
          position: "relative",
          overflow: "hidden",
          backgroundImage: `linear-gradient(${t.rule} 1px, transparent 1px), linear-gradient(90deg, ${t.rule} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 13,
            fontFamily: M,
            fontSize: figType("label", mob),
            letterSpacing: FIG_TRACK,
            color: t.tx3,
          }}
        >
          GOVERNMENT PORTAL · live map
        </span>
        {BEACON_PINS.map((p, i) => {
          const vis = i < shown;
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%,-50%)",
                opacity: vis ? 1 : 0,
                transition: FIG_EASE,
              }}
            >
              {vis ? (
                <span
                  className="animate-beacon-pulse"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 30,
                    height: 30,
                    transform: "translate(-50%,-50%)",
                    borderRadius: "50%",
                    border: `1px solid ${t.flag}`,
                  }}
                />
              ) : null}
              <span
                style={{
                  position: "relative",
                  display: "block",
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: t.flag,
                  boxShadow: `0 0 8px ${t.flag}`,
                }}
              />
            </span>
          );
        })}
        <span
          style={{
            position: "absolute",
            bottom: 10,
            right: 13,
            fontFamily: M,
            fontSize: figType("body", mob),
            color: t.ok,
          }}
        >
          polling… +{shown} active
        </span>
      </div>
    </div>
  );
};
