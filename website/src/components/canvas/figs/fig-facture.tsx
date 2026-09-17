"use client";

import { useThemeTokens } from "@/hooks/use-theme-tokens";
import { useTick } from "@/hooks/use-tick";
import { FigCaption } from "./fig-caption";
import {
  FIG_BEAT,
  FIG_DIM,
  FIG_EASE,
  FIG_HOLD,
  FIG_TRACK,
  MONO as M,
  figH,
  figPanel,
  figTone,
  figType,
} from "./fig-style";

// Facture — the curve a receivable reads its price off.
//
// Both bids are the ones the demo book's buyer actually holds, and the trade
// is MF-2080 as it sold on Hedera and Arc testnet on 6 Sep 2026
// (docs/deployments.md in the facture repo): B-rated, $20,000 face, 40 days,
// taken by Harrow Point's escrowed mandate at 850 bps. $19,813.69 is
// 2,000,000 x 850 x 40 / 3,650,000 cents rounded up in the buyer's favour, so
// changing any input means re-deriving the price. Seven bids were screened in
// all; four refused it on rating or on debtor exposure.
const BIDS = [
  {
    yield: 18.5,
    maxTenor: 120,
    terms: ["no default, 120d", "no default on record, 120 days"],
  },
  {
    yield: 8.5,
    maxTenor: 90,
    terms: ["B or better, 90d", "B or better, 90 days, escrowed on Arc"],
  },
] as const;

// The invoice, and the axes it is read against.
const TENOR = 40;
const FACE = "$20,000";
const PRICE = "$19,813.69";
const X_MAX = 120;
const Y_MIN = 6;
const Y_MAX = 20.5;

// Plot box inside the panel, in percent.
const L = 13;
const R = 97;
const TOP = 16;
const BOT = 82;

const x = (days: number) => L + (days / X_MAX) * (R - L);
const y = (rate: number) =>
  BOT - ((rate - Y_MIN) / (Y_MAX - Y_MIN)) * (BOT - TOP);

// Beat 0 draws the book, 1 drops the invoice's tenor, 2 prices it, then it holds.
const PRICED_AT = 2;

export const FigFacture = ({
  mob,
  active = true,
}: {
  mob: boolean;
  active?: boolean;
}) => {
  const t = useThemeTokens();
  const n = useTick(FIG_BEAT.base, PRICED_AT + 1 + FIG_HOLD, active, PRICED_AT);
  const v = mob ? 0 : 1;
  const dropped = n >= 1;
  const priced = n >= PRICED_AT;
  const label = figType("label", mob);
  const sub = figType("sub", mob);
  const ok = figTone(t, "ok");

  return (
    <div>
      <FigCaption
        left="fig. 1: the bids were standing before the invoice arrived, so its price was already there"
        right={
          mob ? "MF-2080 · 40 days" : "MF-2080 · B · " + FACE + " · 40 days"
        }
      />
      <div
        className="relative overflow-hidden"
        style={{ ...figPanel(t), height: figH("lg", mob) }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* the tenor axis */}
          <line
            x1={`${L}%`}
            y1={`${BOT}%`}
            x2={`${R}%`}
            y2={`${BOT}%`}
            stroke={t.rule}
            strokeWidth={1}
          />
          {[0, 30, 60, 90, 120].map((d) => (
            <line
              key={d}
              x1={`${x(d)}%`}
              y1={`${BOT}%`}
              x2={`${x(d)}%`}
              y2={`${BOT + 2}%`}
              stroke={t.ruleStrong}
              strokeWidth={1}
            />
          ))}

          {/* each standing bid runs flat out to the tenor it will take */}
          {BIDS.map((b) => {
            const won = priced && b.yield === 8.5;
            const lost = priced && !won;
            const tone = won ? ok : lost ? t.tx3 : t.sig;
            return (
              <g key={b.yield}>
                <line
                  x1={`${L}%`}
                  y1={`${y(b.yield)}%`}
                  x2={`${x(b.maxTenor)}%`}
                  y2={`${y(b.yield)}%`}
                  stroke={tone}
                  strokeWidth={won ? 2 : 1.5}
                  style={{ transition: FIG_EASE }}
                />
                {/* the tenor ceiling: past here the bid will not go */}
                <line
                  x1={`${x(b.maxTenor)}%`}
                  y1={`${y(b.yield) - 4}%`}
                  x2={`${x(b.maxTenor)}%`}
                  y2={`${y(b.yield) + 4}%`}
                  stroke={tone}
                  strokeWidth={1.5}
                  style={{ transition: FIG_EASE }}
                />
              </g>
            );
          })}

          {/* the invoice's own tenor, dropped onto the book */}
          <line
            x1={`${x(TENOR)}%`}
            y1={`${TOP}%`}
            x2={`${x(TENOR)}%`}
            y2={`${BOT}%`}
            stroke={priced ? ok : t.sig}
            strokeWidth={1.5}
            strokeDasharray="3 4"
            opacity={dropped ? 1 : 0}
            style={{ transition: FIG_EASE }}
          />
          {priced ? (
            <>
              <circle
                cx={`${x(TENOR)}%`}
                cy={`${y(8.5)}%`}
                r={6}
                fill={`${ok}33`}
              />
              <circle cx={`${x(TENOR)}%`} cy={`${y(8.5)}%`} r={3} fill={ok} />
            </>
          ) : null}
        </svg>

        {/* yield axis */}
        {BIDS.map((b) => {
          const won = priced && b.yield === 8.5;
          const lost = priced && !won;
          return (
            <span
              key={b.yield}
              className="absolute"
              style={{
                left: 10,
                top: `${y(b.yield)}%`,
                transform: "translateY(-50%)",
                fontFamily: M,
                fontSize: sub,
                color: won ? ok : lost ? t.tx3 : t.tx2,
                transition: FIG_EASE,
              }}
            >
              {b.yield.toFixed(2)}%
            </span>
          );
        })}

        {/* what each bid will take, written on the bid itself */}
        {BIDS.map((b) => {
          const won = priced && b.yield === 8.5;
          const lost = priced && !won;
          return (
            <span
              key={b.yield}
              className="absolute whitespace-nowrap"
              style={{
                left: `${L + 2}%`,
                top: `calc(${y(b.yield)}% - ${mob ? 15 : 17}px)`,
                fontFamily: M,
                fontSize: sub,
                color: won ? ok : lost ? t.tx3 : t.tx3,
                opacity: lost ? FIG_DIM + 0.4 : 1,
                transition: FIG_EASE,
              }}
            >
              {b.terms[v]}
            </span>
          );
        })}

        {/* the tenor scale */}
        {[0, 30, 60, 90, 120].map((d) => (
          <span
            key={d}
            className="absolute"
            style={{
              left: `${x(d)}%`,
              top: `${BOT + 4}%`,
              transform: "translateX(-50%)",
              fontFamily: M,
              fontSize: label,
              letterSpacing: FIG_TRACK,
              color: d === 0 ? t.tx3 : t.tx3,
            }}
          >
            {d}d
          </span>
        ))}

        {/* the invoice, and the price the book gives it */}
        <span
          className="absolute whitespace-nowrap"
          style={{
            left: `${x(TENOR) + 2}%`,
            top: `${TOP + 2}%`,
            fontFamily: M,
            fontSize: sub,
            color: priced ? ok : t.sig,
            opacity: dropped ? 1 : 0,
            transition: FIG_EASE,
          }}
        >
          MF-2080 · 40 days
        </span>
        <span
          className="absolute whitespace-nowrap"
          style={{
            left: `${x(TENOR) + 2}%`,
            top: `calc(${y(8.5)}% + ${mob ? 6 : 8}px)`,
            fontFamily: M,
            fontSize: figType("title", mob),
            color: ok,
            opacity: priced ? 1 : 0,
            transition: FIG_EASE,
          }}
        >
          {PRICE}
        </span>
      </div>
      <div
        style={{
          fontFamily: M,
          fontSize: sub,
          color: t.tx3,
          marginTop: 8,
        }}
      >
        ↳ seven bids were screened; four refused it on rating or on exposure
      </div>
    </div>
  );
};
