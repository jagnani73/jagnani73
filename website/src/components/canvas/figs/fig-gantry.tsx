"use client";

import { useEffect, useState } from "react";
import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FigCaption } from "./fig-caption";
import { MONO as M } from "./fig-style";

// Gantry — two doors crossed against two currencies, settling to one payout.
//
// The crossing is the whole drawing: four lines from two door glyphs to two
// currency chips, so "either door, either currency" is a shape rather than a
// sentence and holds in a frozen frame. Two earlier versions put the second
// currency on the time axis, which meant the claim only existed for a reader
// who watched a masthead fig for half a minute. Nobody does.
//
// The amounts are real and they are the point: 3.352955 USDC and 2.980133 EURC
// are both quotes for S$4.50 at the swap's owner-set rates (1.3421 and 1.5100),
// so the two inputs differ in currency AND in amount and leave as an identical
// 4.50 XSGD. The fig demonstrates the claim instead of labelling it. Changing
// either figure means re-deriving it against the rate, or the arithmetic on
// screen stops working.
const DOOR_X = 9; // door glyph centre
const DOOR_R = 15; // where a mesh line starts, clear of the glyph
const CUR_X = 35; // currency chip centre
const CUR_L = 29;
const CUR_R = 41;
const CORE_X = 62;
const CORE_L = 54;
const CORE_R = 70;
const OUT_X = 90; // payout box centre
const OUT_L = 82;
const MID = 50; // the shared rail
const DOOR_Y = [26, 74];
const CUR_Y = [36, 64];
// Labels hang directly off the element they name rather than off the panel top,
// which left a gap wide enough that neither read as attached to anything. The
// offset clears half a box, the label's own line, and enough air that the two
// still read as separate things.
const LABEL_UP = { desk: 47, mob: 39 };
// Leg boundaries within a cycle: cross the mesh, converge on the core, leave.
const LEG_1 = 0.38;
const LEG_2 = 0.68;
// The panel runs the full column width; the geometry inside is capped so the
// lanes keep a readable slope instead of flattening out on a wide screen.
const FRAME = 1100;

const CURRENCIES = [
  { name: "USDC", amount: "3.352955" },
  { name: "EURC", amount: "2.980133" },
];

// A printed QR, drawn in a 24x24 box: three finder patterns and enough data
// modules to read as a code rather than as a grid.
const QrGlyph = ({ size, c }: { size: number; c: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    {[
      [0, 0],
      [17, 0],
      [0, 17],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <rect
          x={x + 0.75}
          y={y + 0.75}
          width={5.5}
          height={5.5}
          fill="none"
          stroke={c}
          strokeWidth={1.5}
        />
        <rect x={x + 2.5} y={y + 2.5} width={2} height={2} fill={c} />
      </g>
    ))}
    {[
      [10, 1],
      [10, 5],
      [13, 3],
      [10, 9],
      [14, 8],
      [18, 10],
      [22, 8],
      [13, 12],
      [17, 14],
      [21, 13],
      [10, 14],
      [14, 18],
      [18, 18],
      [22, 21],
      [14, 22],
      [18, 22],
    ].map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x} y={y} width={2} height={2} fill={c} />
    ))}
  </svg>
);

// The machine door: a chip. Square like the QR so the pair reads as two of the
// same kind of thing, and sober enough for a fig drawn in hairlines.
const ChipGlyph = ({ size, c }: { size: number; c: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <rect
      x={5.5}
      y={5.5}
      width={13}
      height={13}
      rx={1.5}
      fill="none"
      stroke={c}
      strokeWidth={1.5}
    />
    <rect x={10} y={10} width={4} height={4} fill={c} />
    {[9, 15].map((n) => (
      <g key={n} stroke={c} strokeWidth={1.5}>
        <line x1={n} y1={1.5} x2={n} y2={5.5} />
        <line x1={n} y1={18.5} x2={n} y2={22.5} />
        <line x1={1.5} y1={n} x2={5.5} y2={n} />
        <line x1={18.5} y1={n} x2={22.5} y2={n} />
      </g>
    ))}
  </svg>
);

export const FigGantry = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    let raf = 0;
    const loop = (time: number) => {
      setP((time * 0.00016) % 2); // two cycles; the doors swap currencies
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, active]);

  // Static frame under reduced motion: both packets mid-crossing, which is the
  // frame that carries the claim.
  const cycle = reduced ? 0 : Math.floor(p);
  const q = reduced ? 0.19 : p % 1;
  const leg = q < LEG_1 ? 0 : q < LEG_2 ? 1 : 2;
  const k =
    leg === 0
      ? q / LEG_1
      : leg === 1
        ? (q - LEG_1) / (LEG_2 - LEG_1)
        : (q - LEG_2) / (1 - LEG_2);

  // Which currency each door is paying in this cycle. Swapping it every cycle
  // is what stops a reader deciding that the QR is the dollar door.
  const via = (i: number) => (i + cycle) % CURRENCIES.length;

  const H = mob ? 172 : 192;
  const title = mob ? 10.5 : 12.5;
  const sub = mob ? 8.5 : 10;
  const glyph = mob ? 22 : 28;
  // The glyph names the door, so the caption under it carries only what the
  // drawing cannot: who is paying, and over which protocol.
  const doors = [
    {
      Glyph: QrGlyph,
      proto: mob ? "human" : "human · EIP-3009",
      c: t.sig,
    },
    {
      Glyph: ChipGlyph,
      proto: mob ? "agent" : "agent · x402 v2",
      c: t.acc,
    },
  ];

  const packets =
    leg === 2
      ? [
          {
            key: "out",
            x: CORE_R + (OUT_L - CORE_R) * k,
            y: MID,
            c: t.ok,
          },
        ]
      : DOOR_Y.map((y0, i) => {
          const cy = CUR_Y[via(i)];
          return {
            key: `in-${i}`,
            x:
              leg === 0
                ? DOOR_R + (CUR_L - DOOR_R) * k
                : CUR_R + (CORE_L - CUR_R) * k,
            y: leg === 0 ? y0 + (cy - y0) * k : cy + (MID - cy) * k,
            c: doors[i].c,
          };
        });

  return (
    <div>
      <FigCaption
        left="fig. 1: different currencies, different amounts, the same S$4.50"
        right="USDC or EURC in · XSGD out"
      />
      <div
        className="relative overflow-hidden rounded-md"
        style={{
          height: H,
          border: `1px solid ${t.rule}`,
          background: t.panel,
        }}
      >
        <div
          className="relative h-full"
          style={{ maxWidth: FRAME, margin: "0 auto" }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            {/* The crossing. All four are always drawn, so the frozen frame
                still says either door reaches either currency; the two the
                packets are taking this cycle are lit. */}
            {DOOR_Y.map((y0, i) =>
              CUR_Y.map((cy, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={`${DOOR_R}%`}
                  y1={`${y0}%`}
                  x2={`${CUR_L}%`}
                  y2={`${cy}%`}
                  stroke={leg === 0 && via(i) === j ? doors[i].c : t.ruleStrong}
                  strokeWidth={1.5}
                  strokeDasharray="2 5"
                />
              )),
            )}
            {CUR_Y.map((cy, j) => (
              <line
                key={`conv-${j}`}
                x1={`${CUR_R}%`}
                y1={`${cy}%`}
                x2={`${CORE_L}%`}
                y2={`${MID}%`}
                stroke={
                  leg === 1 ? doors[via(0) === j ? 0 : 1].c : t.ruleStrong
                }
                strokeWidth={1.5}
                strokeDasharray="2 5"
              />
            ))}
            <line
              x1={`${CORE_R}%`}
              y1={`${MID}%`}
              x2={`${OUT_L}%`}
              y2={`${MID}%`}
              stroke={leg === 2 ? t.ok : t.ruleStrong}
              strokeWidth={1.5}
              strokeDasharray="2 5"
            />

            {packets.map((pk) => (
              <g key={pk.key}>
                <circle
                  cx={`${pk.x}%`}
                  cy={`${pk.y}%`}
                  r={6}
                  fill={`${pk.c}33`}
                />
                <circle cx={`${pk.x}%`} cy={`${pk.y}%`} r={3} fill={pk.c} />
              </g>
            ))}
          </svg>

          {doors.map((d, i) => (
            <div
              key={d.proto}
              className="absolute flex flex-col items-center gap-2.5"
              style={{
                left: `${DOOR_X}%`,
                top: `${DOOR_Y[i]}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <d.Glyph size={glyph} c={leg === 0 ? d.c : t.tx2} />
              <span
                style={{
                  fontFamily: M,
                  fontSize: sub,
                  color: t.tx3,
                  whiteSpace: "nowrap",
                }}
              >
                {d.proto}
              </span>
            </div>
          ))}

          {CURRENCIES.map((cur, j) => (
            <div
              key={cur.name}
              className="absolute flex flex-col items-center rounded-md border"
              style={{
                left: `${CUR_X}%`,
                top: `${CUR_Y[j]}%`,
                transform: "translate(-50%, -50%)",
                borderColor:
                  leg < 2 ? doors[via(0) === j ? 0 : 1].c : t.ruleStrong,
                background: t.bg,
                padding: mob ? "5px 8px" : "7px 12px",
                transition: "border-color 0.3s",
              }}
            >
              <span
                style={{
                  fontFamily: M,
                  fontSize: title,
                  color: t.tx,
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {cur.name}
              </span>
              <span style={{ fontFamily: M, fontSize: sub, color: t.tx3 }}>
                {cur.amount}
              </span>
            </div>
          ))}

          <div
            className="absolute flex flex-col items-center rounded-md border"
            style={{
              left: `${CORE_X}%`,
              top: `${MID}%`,
              transform: "translate(-50%, -50%)",
              borderColor: t.pri,
              background: t.bg,
              padding: mob ? "6px 8px" : "9px 13px",
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontSize: title,
                color: t.tx,
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              GantryCore
            </span>
            <span style={{ fontFamily: M, fontSize: sub, color: t.pri }}>
              _settle()
            </span>
          </div>

          <div
            className="absolute flex flex-col items-center rounded-md border"
            style={{
              left: `${OUT_X}%`,
              top: `${MID}%`,
              transform: "translate(-50%, -50%)",
              borderColor: leg === 2 ? t.ok : t.ruleStrong,
              background: t.bg,
              padding: mob ? "5px 8px" : "7px 12px",
              transition: "border-color 0.3s",
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontSize: title,
                color: t.ok,
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              4.50 XSGD
            </span>
            <span
              style={{
                fontFamily: M,
                fontSize: sub,
                color: t.tx3,
                whiteSpace: "nowrap",
              }}
            >
              {mob ? "shop" : "merchant"}
            </span>
          </div>

          <span
            className="absolute"
            style={{
              left: `${CUR_X}%`,
              top: `calc(${CUR_Y[0]}% - ${mob ? LABEL_UP.mob : LABEL_UP.desk}px)`,
              transform: "translateX(-50%)",
              fontFamily: M,
              fontSize: sub,
              color: t.tx3,
              whiteSpace: "nowrap",
            }}
          >
            either currency
          </span>
          <span
            className="absolute"
            style={{
              left: `${OUT_X}%`,
              top: `calc(${MID}% - ${mob ? LABEL_UP.mob : LABEL_UP.desk}px)`,
              transform: "translateX(-50%)",
              fontFamily: M,
              fontSize: sub,
              color: t.tx3,
              whiteSpace: "nowrap",
            }}
          >
            one payout
          </span>
        </div>
      </div>
    </div>
  );
};
