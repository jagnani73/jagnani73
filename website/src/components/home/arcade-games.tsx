"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { rnd, rndBetween } from "@/utils/functions/random";
import type { ArcadeGame, GameProps } from "@/utils/types/arcade.types";

// Compact playfields for the arcade hub + board. Each game gets props.score(value);
// the card records bests + fires confetti/sound on a win/new-best.
//
// Unified layout: every board game is [a shared-size square board] + [a fixed-width
// control panel] — a status/instruction line over a reserved-height action slot
// (button / keyboard / nothing) — centered as a tight group with a fixed gap (not
// stretched into equal halves), so there are no odd empty gaps and the pair stays
// together; the panel's fixed width + reserved slot keep buttons put with no reflow
// between idle/playing/done. Every board fills the same SQUARE box (cells derived to
// fill it), so the grids line up game-to-game. The `.arcade-game-row` wrapper lives
// in globals.css: it's this horizontal row on a wide card, and stacks board-over-
// panel on a narrow card (phone) so nothing overflows — so the playfield owns the
// responsive direction, not these games. Colors are CSS vars so games flip with the
// theme. Reaction is the deliberate exception: a full-bleed, click-anywhere flash.

const MONO = "var(--font-jetbrains), monospace";
const ANTON = "var(--font-anton), sans-serif";

const dashBtn: CSSProperties = {
  fontFamily: MONO,
  fontSize: "11px",
  color: "var(--sig)",
  background: "transparent",
  border: "1px dashed var(--pri)",
  borderRadius: "4px",
  padding: "6px 14px",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

// ── shared game layout ──
// The board+panel row lives in globals.css as `.arcade-game-row` (it needs a
// container query to stack on narrow cards, which an inline style can't express).
// Each board game's root uses that class; HALF just centers the board / panel within
// the row (or the stack).
const HALF: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const PANEL: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  textAlign: "center",
};
const STATUS: CSSProperties = {
  fontFamily: MONO,
  fontSize: "11.5px",
  lineHeight: 1.5,
};
const SLOT: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// The control panel — a status/instruction line over a reserved-height action slot.
const Panel = ({
  status,
  color,
  width = 150,
  slot = 36,
  children,
}: {
  status: ReactNode;
  color?: string;
  width?: number;
  slot?: number;
  children?: ReactNode;
}) => (
  <div style={HALF}>
    <div style={{ ...PANEL, width }}>
      <div style={{ ...STATUS, color: color ?? "var(--tx3)" }}>{status}</div>
      <div style={{ ...SLOT, minHeight: slot }}>{children}</div>
    </div>
  </div>
);

const SQUARE = 166; // px — every board game's playfield square
// Min playfield height — matches `.arcade-play { min-height }` in globals.css. Used
// by the full-bleed Reaction game (which sits outside `.arcade-game-row`) so it
// fills the playfield even though the card height is content-driven.
const PLAY_MIN_H = 250;

// The shared square playfield: a fixed SQUARE box that centers a game's grid, so
// every board has the same footprint and the grids line up game-to-game. Reaction
// opts out (it's full-bleed).
const Board = ({ children }: { children: ReactNode }) => (
  <div style={HALF}>
    <div
      style={{
        width: SQUARE,
        height: SQUARE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </div>
);

// A `cols`×`rows` grid of square cells sized to fill SQUARE on its longer axis
// (the bounding box never exceeds the square), centered by <Board>. Returns the
// grid style + the derived cell edge so a caller sizes its cells from the one
// number instead of re-hardcoding a dimension.
const boardGrid = (cols: number, rows: number, gap: number) => {
  const n = Math.max(cols, rows);
  const cell = Math.floor((SQUARE - gap * (n - 1)) / n);
  return {
    cell,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
      gap: `${gap}px`,
    } as CSSProperties,
  };
};

/* 1 · REACTION (min ms) — full-bleed exception */
function AReaction({ score, start }: GameProps) {
  const [st, setSt] = useState<"idle" | "wait" | "go" | "early" | "done">(
    "idle"
  );
  const [ms, setMs] = useState(0);
  const t = useRef(0);
  const to = useRef<ReturnType<typeof setTimeout> | null>(null);
  const go = () => {
    if (st === "idle") start(); // first engagement only — idle is the initial state
    setSt("wait");
    to.current = setTimeout(() => {
      t.current = performance.now();
      setSt("go");
    }, rndBetween(900, 2200));
  };
  const click = () => {
    if (st === "wait") {
      if (to.current) clearTimeout(to.current);
      setSt("early");
    } else if (st === "go") {
      const d = Math.round(performance.now() - t.current);
      setMs(d);
      setSt("done");
      score(d);
    } else go();
  };
  useEffect(() => () => void (to.current && clearTimeout(to.current)), []);
  const bg =
    st === "go" ? "var(--ok)" : st === "wait" ? "var(--flag)" : "var(--panel)";
  const fg =
    st === "go" || st === "wait"
      ? "var(--bg)"
      : st === "early"
      ? "var(--flag)"
      : "var(--tx)";
  const msg =
    st === "idle"
      ? "click to start"
      : st === "wait"
      ? "wait for green…"
      : st === "go"
      ? "NOW!"
      : st === "early"
      ? "too soon — retry"
      : ms + " ms — retry";
  return (
    <div
      onClick={click}
      style={{
        cursor: "pointer",
        minHeight: PLAY_MIN_H,
        width: "100%",
        alignSelf: "stretch",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.1s",
        userSelect: "none",
        fontFamily: ANTON,
        fontSize: "24px",
        color: fg,
      }}
    >
      {msg}
    </div>
  );
}

/* 2 · MEMORY (max level) */
const MM = ["var(--sig)", "var(--acc)", "var(--ok)", "var(--flag)"];
const MM_GRID = boardGrid(2, 2, 8);
function AMemory({ score, start }: GameProps) {
  const [seq, setSeq] = useState<number[]>([]);
  const [fl, setFl] = useState(-1);
  const [ui, setUi] = useState(0);
  const [st, setSt] = useState<"idle" | "show" | "in" | "over">("idle");
  const sr = useRef<number[]>([]);
  const play = (s: number[]) => {
    setSt("show");
    let i = 0;
    const step = () => {
      if (i >= s.length) {
        setSt("in");
        setUi(0);
        return;
      }
      setFl(s[i]);
      setTimeout(() => {
        setFl(-1);
        i++;
        setTimeout(step, 200);
      }, 420);
    };
    setTimeout(step, 400);
  };
  const nx = (s: number[]) => {
    const ns = s.concat(rnd(4));
    sr.current = ns;
    setSeq(ns);
    play(ns);
  };
  const tap = (i: number) => {
    if (st !== "in") return;
    setFl(i);
    setTimeout(() => setFl(-1), 150);
    if (sr.current[ui] !== i) {
      setSt("over");
      score(sr.current.length - 1);
      return;
    }
    if (ui + 1 === sr.current.length) setTimeout(() => nx(sr.current), 480);
    else setUi(ui + 1);
  };
  const status =
    st === "idle"
      ? "watch, then repeat"
      : st === "show"
      ? "watch the sequence…"
      : st === "in"
      ? "your turn · level " + seq.length
      : "missed · level " + (seq.length - 1);
  return (
    <div className="arcade-game-row">
      <Board>
        <div style={MM_GRID.style}>
          {MM.map((c, i) => (
            <div
              key={i}
              onClick={() => tap(i)}
              style={{
                width: MM_GRID.cell,
                height: MM_GRID.cell,
                borderRadius: "8px",
                background: c,
                opacity: fl === i ? 1 : 0.28,
                cursor: st === "in" ? "pointer" : "default",
                transition: "opacity 0.12s",
              }}
            />
          ))}
        </div>
      </Board>
      <Panel status={status} color={st === "over" ? "var(--flag)" : undefined}>
        {st === "idle" || st === "over" ? (
          <button
            onClick={() => {
              start();
              nx([]);
            }}
            style={dashBtn}
          >
            {st === "over" ? "↻ again" : "start"}
          </button>
        ) : null}
      </Panel>
    </div>
  );
}

/* 3 · QUICK CLICKS (max) */
const CLICKS_GRID = boardGrid(3, 3, 8);
function AClicks({ score, start: onStart }: GameProps) {
  const [pos, setPos] = useState(4);
  const [sc, setSc] = useState(0);
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);
  const scRef = useRef(0);
  useEffect(() => {
    scRef.current = sc;
  }, [sc]);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(
      () =>
        setTime((x) => {
          if (x <= 1) {
            setRun(false);
            clearInterval(t);
            score(scRef.current);
            return 0;
          }
          return x - 1;
        }),
      1000
    );
    return () => clearInterval(t);
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps
  const start = () => {
    onStart();
    setSc(0);
    setTime(10);
    setRun(true);
    setPos(rnd(9));
  };
  const hit = (i: number) => {
    if (!run || i !== pos) return;
    setSc((s) => s + 1);
    let n = pos;
    while (n === pos) n = rnd(9);
    setPos(n);
  };
  return (
    <div className="arcade-game-row">
      <Board>
        <div style={CLICKS_GRID.style}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              onClick={() => hit(i)}
              style={{
                width: CLICKS_GRID.cell,
                height: CLICKS_GRID.cell,
                borderRadius: "8px",
                border: "1px solid var(--rule)",
                background: run && i === pos ? "var(--sig)" : "var(--bg)",
                cursor: run ? "pointer" : "default",
                transition: "background 0.1s",
              }}
            />
          ))}
        </div>
      </Board>
      <Panel
        status={run ? time + "s · score " + sc : "tap the lit square"}
        color={run ? "var(--acc)" : undefined}
      >
        {!run ? (
          <button onClick={start} style={dashBtn}>
            {sc ? "↻ again" : "start · 10s"}
          </button>
        ) : null}
      </Panel>
    </div>
  );
}

// Player pieces on a board (cells set to 1) — the "moves" stat for tic-tac-toe
// and Connect 4, where 1 is the human and 2 the AI.
const myMoves = (bd: number[]) => bd.filter((v) => v === 1).length;

/* 4 · TIC-TAC-TOE (wins) */
const TTT_W = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const TTT_GRID = boardGrid(3, 3, 6);
function ATicTac({ score, start, end }: GameProps) {
  const [b, setB] = useState<number[]>(Array(9).fill(0));
  const [done, setDone] = useState(0);
  const win = (bd: number[], p: number) =>
    TTT_W.some((l) => l.every((i) => bd[i] === p));
  const emp = (bd: number[]) =>
    bd.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  const move = (i: number) => {
    if (done || b[i]) return;
    if (b.every((c) => !c)) start(); // first mark on a fresh board
    const nb = b.slice();
    nb[i] = 1;
    if (win(nb, 1)) {
      setB(nb);
      setDone(1);
      score(1, { moves: myMoves(nb) });
      return;
    }
    if (!emp(nb).length) {
      setB(nb);
      setDone(3);
      end({ outcome: "draw", moves: myMoves(nb) });
      return;
    }
    const o = emp(nb);
    let m = o.find((i) => {
      const t = nb.slice();
      t[i] = 2;
      return win(t, 2);
    });
    if (m == null)
      m = o.find((i) => {
        const t = nb.slice();
        t[i] = 1;
        return win(t, 1);
      });
    if (m == null && nb[4] === 0) m = 4;
    if (m == null) m = o[rnd(o.length)];
    nb[m] = 2;
    setB(nb);
    if (win(nb, 2)) {
      setDone(2);
      end({ outcome: "loss", moves: myMoves(nb) });
    } else if (!emp(nb).length) {
      setDone(3);
      end({ outcome: "draw", moves: myMoves(nb) });
    }
  };
  const status =
    done === 1
      ? "you win 🎉"
      : done === 2
      ? "I win"
      : done === 3
      ? "draw"
      : "get three in a row";
  return (
    <div className="arcade-game-row">
      <Board>
        <div style={TTT_GRID.style}>
          {b.map((v, i) => (
            <div
              key={i}
              onClick={() => move(i)}
              style={{
                width: TTT_GRID.cell,
                height: TTT_GRID.cell,
                border: "1px solid var(--rule)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: !v && !done ? "pointer" : "default",
                fontFamily: ANTON,
                fontSize: "28px",
                lineHeight: 1,
                color: v === 1 ? "var(--sig)" : "var(--acc)",
              }}
            >
              {v === 1 ? "X" : v === 2 ? "O" : ""}
            </div>
          ))}
        </div>
      </Board>
      <Panel
        status={status}
        color={
          done === 1 ? "var(--sig)" : done === 2 ? "var(--acc)" : undefined
        }
      >
        {done ? (
          <button
            onClick={() => {
              setB(Array(9).fill(0));
              setDone(0);
            }}
            style={dashBtn}
          >
            ↻ again
          </button>
        ) : null}
      </Panel>
    </div>
  );
}

/* 5 · CONNECT 4 (wins) */
const C4_C = 7;
const C4_R = 6;
const C4_GRID = boardGrid(C4_C, C4_R, 4);
function AConnect4({ score, start, end }: GameProps) {
  const [bd, setBd] = useState<number[]>(() => Array(C4_C * C4_R).fill(0));
  const [turn, setTurn] = useState(1);
  const [done, setDone] = useState(0);
  const [winC, setWinC] = useState<number[]>([]); // the four winning cells, lit on a win
  const ix = (c: number, r: number) => r * C4_C + c;
  const drop = (b: number[], c: number, w: number) => {
    for (let r = C4_R - 1; r >= 0; r--)
      if (!b[ix(c, r)]) {
        const nb = b.slice();
        nb[ix(c, r)] = w;
        return nb;
      }
    return null;
  };
  // The four cells of a winning run for `w`, or null — the array lets the board
  // light the winning discs (truthy/null still reads as a boolean win check).
  const win = (b: number[], w: number): number[] | null => {
    const D = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];
    for (let c = 0; c < C4_C; c++)
      for (let r = 0; r < C4_R; r++)
        if (b[ix(c, r)] === w)
          for (const [dc, dr] of D) {
            const line = [ix(c, r)];
            let k = 1;
            while (k < 4) {
              const nc = c + dc * k,
                nr = r + dr * k;
              if (
                nc < 0 ||
                nc >= C4_C ||
                nr < 0 ||
                nr >= C4_R ||
                b[ix(nc, nr)] !== w
              )
                break;
              line.push(ix(nc, nr));
              k++;
            }
            if (k === 4) return line;
          }
    return null;
  };
  const play = (c: number) => {
    if (done || turn !== 1) return;
    const nb = drop(bd, c, 1);
    if (!nb) return;
    if (bd.every((v) => !v)) start(); // first disc on a fresh board
    const pl = win(nb, 1);
    if (pl) {
      setBd(nb);
      setWinC(pl);
      setDone(1);
      score(1, { moves: myMoves(nb) });
      return;
    }
    if (nb.every((v) => v)) {
      // board filled on the player's move — a draw
      setBd(nb);
      setDone(3);
      end({ outcome: "draw", moves: myMoves(nb) });
      return;
    }
    setBd(nb);
    setTurn(2);
    setTimeout(() => {
      const o: number[] = [];
      for (let cc = 0; cc < C4_C; cc++) if (drop(nb, cc, 2)) o.push(cc);
      let m = o[rnd(o.length)];
      for (const cc of o) {
        const t = drop(nb, cc, 2);
        if (t && win(t, 2)) {
          m = cc;
          break;
        }
      }
      for (const cc of o) {
        const t = drop(nb, cc, 1);
        if (t && win(t, 1)) {
          m = cc;
          break;
        }
      }
      const ab = drop(nb, m, 2);
      if (!ab) {
        setTurn(1);
        return;
      }
      const al = win(ab, 2);
      if (al) {
        setWinC(al);
        setDone(2);
        end({ outcome: "loss", moves: myMoves(ab) });
      } else if (ab.every((v) => v)) {
        setDone(3);
        end({ outcome: "draw", moves: myMoves(ab) });
      }
      setBd(ab);
      setTurn(1);
    }, 320);
  };
  const status =
    done === 1
      ? "you win 🎉"
      : done === 2
      ? "I win"
      : done === 3
      ? "draw"
      : turn === 1
      ? "drop a disc"
      : "thinking…";
  return (
    <div className="arcade-game-row">
      <Board>
        <div style={C4_GRID.style}>
          {bd.map((v, i) => {
            const lit = winC.includes(i);
            return (
              <div
                key={i}
                onClick={() => play(i % C4_C)}
                style={{
                  width: C4_GRID.cell,
                  height: C4_GRID.cell,
                  borderRadius: "50%",
                  cursor: done ? "default" : "pointer",
                  background:
                    v === 1
                      ? "var(--sig)"
                      : v === 2
                      ? "var(--acc)"
                      : "var(--bg)",
                  border: "1px solid var(--rule)",
                  boxShadow: lit
                    ? "0 0 0 2px var(--ok), 0 0 6px var(--ok)"
                    : undefined,
                }}
              />
            );
          })}
        </div>
      </Board>
      <Panel
        status={status}
        color={
          done === 1 ? "var(--sig)" : done === 2 ? "var(--acc)" : undefined
        }
      >
        {done ? (
          <button
            onClick={() => {
              setBd(Array(C4_C * C4_R).fill(0));
              setTurn(1);
              setDone(0);
              setWinC([]);
            }}
            style={dashBtn}
          >
            ↻ again
          </button>
        ) : null}
      </Panel>
    </div>
  );
}

/* 6 · MINI WORDLE (wins) */
const WORDS = [
  "ABIDE", "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIN", "ADOPT", "ADORE", "ADULT",
  "AFTER", "AGENT", "AGILE", "AGONY", "AISLE", "ALBUM", "ALERT", "ALIEN", "ALIGN", "ALIKE",
  "ALIVE", "ALOFT", "ALONE", "ALONG", "ALOUD", "AMBER", "AMEND", "AMPLE", "ANGEL", "ANGER",
  "ANGLE", "ANKLE", "APRON", "ARGUE", "ARISE", "ASHEN", "ASIDE", "ATONE", "AUDIO", "AUDIT",
  "AVOID", "AWFUL", "AWOKE", "AXIOM", "AZURE", "BACON", "BADGE", "BAGEL", "BAKER", "BARON",
  "BASIC", "BASIL", "BASIN", "BEACH", "BEARD", "BEAST", "BEGAN", "BEGIN", "BEING", "BELOW",
  "BENCH", "BINGE", "BIPED", "BIRCH", "BLACK", "BLADE", "BLAME", "BLANK", "BLAZE", "BLEND",
  "BLIMP", "BLIND", "BLINK", "BLITZ", "BLOAT", "BLOCK", "BLOND", "BLOWN", "BLUNT", "BLURT",
  "BLUSH", "BOARD", "BOAST", "BOGUS", "BOUND", "BOWEL", "BOXER", "BRACE", "BRAID", "BRAIN",
  "BRAKE", "BRAND", "BRAVE", "BREAD", "BREAK", "BRICK", "BRIDE", "BRIEF", "BRING", "BRINK",
  "BRISK", "BROAD", "BROKE", "BROWN", "BRUSH", "BRUTE", "BUILD", "BUILT", "BULGE", "BUNCH",
  "BURNT", "CABIN", "CABLE", "CADET", "CAMEL", "CAMEO", "CANDY", "CAPER", "CARGO", "CARVE",
  "CASTE", "CAUSE", "CEDAR", "CHAFE", "CHAIR", "CHALK", "CHAMP", "CHANT", "CHAOS", "CHARD",
  "CHARM", "CHART", "CHASE", "CHEAP", "CHEAT", "CHEST", "CHIDE", "CHIEF", "CHILD", "CHIME",
  "CHIMP", "CHINA", "CHIRP", "CHOIR", "CHORD", "CHORE", "CHOSE", "CHUMP", "CHUNK", "CHURN",
  "CIDER", "CIGAR", "CIVET", "CLAIM", "CLAMP", "CLANG", "CLANK", "CLASP", "CLEAN", "CLEAR",
  "CLERK", "CLIMB", "CLING", "CLOAK", "CLONE", "CLOSE", "CLOTH", "CLOUD", "CLOUT", "CLOVE",
  "CLOWN", "COAST", "COBRA", "COMET", "CORAL", "CORGI", "COULD", "COUNT", "COURT", "COVER",
  "COVET", "CRAFT", "CRAMP", "CRANE", "CRANK", "CRASH", "CRATE", "CRAVE", "CRAWL", "CRAZE",
  "CREAK", "CREAM", "CREDO", "CREPT", "CREST", "CRIED", "CRIME", "CRISP", "CROAK", "CRONE",
  "CRONY", "CROWD", "CROWN", "CRUMB", "CRUSH", "CRUST", "CRYPT", "CUBIT", "CURIO", "CURLY",
  "CURSE", "CURVE", "CYBER", "DAIRY", "DANCE", "DATUM", "DAUNT", "DEALT", "DEBIT", "DEBUG",
  "DEBUT", "DECAY", "DECOY", "DEITY", "DELAY", "DELTA", "DEMON", "DEMOS", "DENIM", "DEPOT",
  "DEPTH", "DERBY", "DEVIL", "DIARY", "DIMLY", "DINER", "DINGO", "DINGY", "DIRTY", "DITCH",
  "DIVER", "DOGMA", "DOING", "DONUT", "DOUBT", "DOUGH", "DOWEL", "DOWNY", "DOZEN", "DRAFT",
  "DRAIN", "DRAKE", "DRANK", "DRAPE", "DRAWL", "DRAWN", "DREAM", "DRIFT", "DRINK", "DRIVE",
  "DRONE", "DROWN", "DRUNK", "DUMPY", "DWARF", "DWELT", "DYING", "EARLY", "EARTH", "EBONY",
  "ECLAT", "EDICT", "EIGHT", "ELBOW", "ELFIN", "EMAIL", "EMPTY", "ENACT", "ENDOW", "ENJOY",
  "ENTRY", "ENVOY", "EPOCH", "EQUAL", "EQUIP", "ERUPT", "ETHIC", "ETHOS", "EVICT", "EXALT",
  "EXIST", "EXTRA", "FABLE", "FAINT", "FAIRY", "FAITH", "FALSE", "FANCY", "FAULT", "FAVOR",
  "FEAST", "FEIGN", "FEINT", "FELON", "FEMUR", "FETCH", "FETUS", "FIBER", "FIELD", "FIEND",
  "FIERY", "FIGHT", "FILER", "FILMY", "FINAL", "FINCH", "FJORD", "FLAIR", "FLAKE", "FLAME",
  "FLANK", "FLARE", "FLASH", "FLECK", "FLESH", "FLICK", "FLIER", "FLING", "FLINT", "FLIRT",
  "FLOAT", "FLOCK", "FLORA", "FLOUR", "FLOUT", "FLOWN", "FLUID", "FLUKE", "FLUME", "FLUNG",
  "FLUNK", "FLUSH", "FLUTE", "FOAMY", "FOCAL", "FOCUS", "FOIST", "FORCE", "FORGE", "FORTE",
  "FORTY", "FORUM", "FOUND", "FOYER", "FRAIL", "FRAME", "FRANC", "FRANK", "FRAUD", "FREAK",
  "FRIED", "FRISK", "FROCK", "FROND", "FRONT", "FROST", "FROZE", "FRUIT", "FUDGE", "FUNGI",
  "FUNKY", "GABLE", "GAILY", "GAMUT", "GATES", "GAUDY", "GAUNT", "GAUZE", "GAVEL", "GAWKY",
  "GAZER", "GECKO", "GETUP", "GHOST", "GHOUL", "GIANT", "GIRTH", "GIVEN", "GIVER", "GLADE",
  "GLAND", "GLARE", "GLAZE", "GLEAM", "GLEAN", "GLIDE", "GLINT", "GLOAT", "GLOBE", "GLORY",
  "GLOVE", "GLYPH", "GNOME", "GODLY", "GOURD", "GRACE", "GRADE", "GRAIN", "GRAND", "GRANT",
  "GRAPE", "GRAPH", "GRASP", "GRATE", "GRAVE", "GRAVY", "GRAZE", "GREAT", "GRIEF", "GRIME",
  "GRIMY", "GRIND", "GRIPE", "GROAN", "GROIN", "GROPE", "GROWL", "GROWN", "GRUNT", "GUARD",
  "GUEST", "GUIDE", "GUILD", "GUILT", "GUISE", "GULCH", "GUMBO", "GUSTO", "GUSTY", "HABIT",
  "HAIRY", "HALVE", "HANDY", "HARDY", "HAREM", "HASTE", "HASTY", "HAUNT", "HAVEN", "HAVOC",
  "HAZEL", "HEADY", "HEARD", "HEART", "HEAVY", "HEFTY", "HEIST", "HELIX", "HERON", "HINGE",
  "HOARD", "HOIST", "HOMER", "HONEY", "HORDE", "HORSE", "HOTEL", "HOTLY", "HOUND", "HOUSE",
  "HOVEL", "HOVER", "HOWDY", "HUMAN", "HUMID", "HUMOR", "HUSKY", "HYDRO", "HYENA", "IDEAL",
  "IMAGE", "IMBUE", "IMPLY", "INBOX", "INCUR", "INDEX", "INEPT", "INFER", "INGOT", "INLET",
  "INPUT", "INTRO", "IRATE", "IRONY", "IVORY", "JAUNT", "JOINT", "JOIST", "JOKER", "JUDGE",
  "JUICY", "JUMBO", "KNAVE", "KNIFE", "KUDOS", "LABOR", "LADEN", "LAGER", "LANCE", "LANKY",
  "LAPSE", "LARGE", "LASER", "LATCH", "LATER", "LAYER", "LEAFY", "LEAKY", "LEANT", "LEARN",
  "LEASH", "LEAST", "LEFTY", "LEMON", "LEMUR", "LIGHT", "LIKEN", "LIMBO", "LINER", "LINGO",
  "LOAFS", "LOAMY", "LOATH", "LOCUS", "LODGE", "LOFTY", "LOGIC", "LONER", "LOSER", "LOUSY",
  "LOVER", "LOWER", "LUCID", "LUCKY", "LUMPY", "LUNAR", "LUNCH", "LURCH", "LURID", "LYING",
  "LYRIC", "MACHO", "MACRO", "MADLY", "MAGIC", "MAIZE", "MAJOR", "MAKER", "MANGO", "MANGY",
  "MAPLE", "MARCH", "MARSH", "MASON", "MATCH", "MAUVE", "MAYBE", "MAYOR", "MEATY", "MEDAL",
  "MEDIA", "MEDIC", "MELON", "MERCY", "MERIT", "METAL", "METRO", "MICRO", "MIDST", "MIGHT",
  "MINCE", "MINER", "MINTY", "MINUS", "MISER", "MIXER", "MOCHA", "MODAL", "MODEL", "MOIST",
  "MOLAR", "MOLDY", "MONEY", "MONTH", "MORAL", "MORPH", "MOTEL", "MOTIF", "MOUND", "MOUNT",
  "MOURN", "MOUSE", "MOUTH", "MOVER", "MUCKY", "MULCH", "MURAL", "MURKY", "MUSIC", "MUSKY",
  "MUSTY", "NAIVE", "NASTY", "NAVEL", "NEIGH", "NERDY", "NICHE", "NIGHT", "NOBLE", "NOBLY",
  "NODAL", "NOISE", "NOISY", "NOMAD", "NORTH", "NOTCH", "NOVEL", "NUDGE", "NURSE", "NYMPH",
  "OAKEN", "OCEAN", "OFTEN", "OUGHT", "OUNCE", "OVALS", "OVERT", "PACED", "PAINT", "PALER",
  "PANEL", "PANIC", "PANSY", "PARCH", "PARSE", "PASTY", "PATCH", "PATIO", "PAUSE", "PEACH",
  "PEARL", "PEDAL", "PENAL", "PERCH", "PERIL", "PESKY", "PESTO", "PETAL", "PHASE", "PHONE",
  "PHONY", "PIANO", "PICKY", "PIETY", "PILOT", "PINCH", "PINKY", "PINTO", "PIOUS", "PIVOT",
  "PIXEL", "PLACE", "PLAID", "PLAIN", "PLAIT", "PLANE", "PLANK", "PLANT", "PLEAD", "PLEAT",
  "PLIED", "PLUCK", "PLUMB", "PLUME", "PLUSH", "POINT", "POISE", "POKER", "POLAR", "POLKA",
  "PORCH", "POSER", "POSIT", "POUCH", "POUND", "POWER", "PRANK", "PRAWN", "PRICE", "PRICK",
  "PRIDE", "PRIED", "PRIME", "PRINT", "PRISM", "PRIVY", "PRIZE", "PROBE", "PRONE", "PRONG",
  "PROSE", "PROUD", "PROWL", "PRUDE", "PUBIC", "PULSE", "PUNCH", "PURGE", "PUSHY", "QUAIL",
  "QUAKE", "QUALM", "QUART", "QUASH", "QUERY", "QUEST", "QUICK", "QUIET", "QUILT", "QUIRK",
  "QUITE", "QUOTA", "QUOTE", "QUOTH", "RABID", "RADIO", "RAINY", "RAISE", "RANCH", "RANDY",
  "RANGE", "RAPID", "RASPY", "RATIO", "RAVEN", "REACH", "REACT", "READY", "REALM", "REBUS",
  "RECAP", "REDUX", "REGAL", "REIGN", "RELAX", "RELAY", "RELIC", "REMIT", "RENAL", "REPAY",
  "REPLY", "RESIN", "RETCH", "RHINO", "RHYME", "RIDGE", "RIFLE", "RIGHT", "RINSE", "RIPEN",
  "RISEN", "RISKY", "RIVAL", "ROACH", "ROAST", "ROBIN", "ROCKY", "ROGUE", "ROMAN", "ROUGE",
  "ROUGH", "ROUND", "ROUTE", "ROYAL", "RUGBY", "RUSTY", "SABER", "SADLY", "SAFER", "SAINT",
  "SALON", "SALTY", "SALVE", "SANDY", "SATIN", "SATYR", "SAUCE", "SAUCY", "SAVOR", "SAVOY",
  "SCALD", "SCALE", "SCALP", "SCALY", "SCAMP", "SCANT", "SCARE", "SCARF", "SCARY", "SCENT",
  "SCOLD", "SCONE", "SCOPE", "SCORE", "SCORN", "SCOUR", "SCOUT", "SCOWL", "SCRAM", "SCRAP",
  "SCRUB", "SCUBA", "SEDAN", "SEPIA", "SETUP", "SHADE", "SHAFT", "SHAKY", "SHALE", "SHAME",
  "SHANK", "SHAPE", "SHARD", "SHARE", "SHARK", "SHARP", "SHAVE", "SHAWL", "SHEAR", "SHELF",
  "SHIFT", "SHINE", "SHINY", "SHIRE", "SHIRK", "SHIRT", "SHOAL", "SHOCK", "SHONE", "SHORE",
  "SHORT", "SHOUT", "SHOWN", "SHOWY", "SHRED", "SHRUB", "SHRUG", "SHUNT", "SIGHT", "SIGMA",
  "SILKY", "SINCE", "SINEW", "SINGE", "SIREN", "SIXTH", "SIXTY", "SLACK", "SLAIN", "SLANT",
  "SLATE", "SLAVE", "SLEPT", "SLICE", "SLICK", "SLIDE", "SLIME", "SLIMY", "SLING", "SLINK",
  "SLOPE", "SLOTH", "SLUMP", "SLUNG", "SLUNK", "SLURP", "SMART", "SMEAR", "SMELT", "SMILE",
  "SMIRK", "SMITE", "SMITH", "SMOCK", "SMOKE", "SMOKY", "SNACK", "SNAIL", "SNAKE", "SNAKY",
  "SNARE", "SNEAK", "SNIDE", "SNIPE", "SNORE", "SNORT", "SNOUT", "SNOWY", "SNUCK", "SOAPY",
  "SOBER", "SOLAR", "SOLID", "SOLVE", "SONAR", "SONIC", "SOUND", "SOUTH", "SPACE", "SPADE",
  "SPANK", "SPARE", "SPARK", "SPAWN", "SPEAK", "SPEAR", "SPECK", "SPEND", "SPENT", "SPERM",
  "SPICE", "SPICY", "SPIED", "SPIKE", "SPIKY", "SPINE", "SPINY", "SPIRE", "SPITE", "SPLAT",
  "SPLIT", "SPOIL", "SPOKE", "SPORE", "SPORT", "SPOUT", "SPRAY", "SPRIG", "SPUNK", "SPURN",
  "SPURT", "SQUAD", "SQUAT", "SQUID", "STACK", "STAGE", "STAID", "STAIN", "STAIR", "STAKE",
  "STALE", "STALK", "STAMP", "STAND", "STANK", "STARE", "STARK", "STAVE", "STEAD", "STEAK",
  "STEAL", "STEAM", "STEIN", "STERN", "STICK", "STING", "STINK", "STOCK", "STOIC", "STOKE",
  "STOLE", "STOMP", "STONE", "STONY", "STORE", "STORK", "STORM", "STOVE", "STRAP", "STRAW",
  "STRAY", "STRIP", "STUCK", "STUDY", "STUMP", "STUNG", "STUNK", "STYLE", "SUAVE", "SUGAR",
  "SUITE", "SULKY", "SUPER", "SURGE", "SURLY", "SWAMI", "SWAMP", "SWARM", "SWATH", "SWEAR",
  "SWEAT", "SWEPT", "SWIFT", "SWINE", "SWING", "SWIPE", "SWIRL", "SWORD", "SWORE", "SWORN",
  "SWUNG", "SYRUP", "TABLE", "TACKY", "TALON", "TAMED", "TAPER", "TAPIR", "TARDY", "TAWNY",
  "TEACH", "TEARY", "TEMPO", "TENOR", "TEPID", "THANK", "THEIR", "THICK", "THIEF", "THING",
  "THINK", "THIRD", "THONG", "THORN", "THOSE", "THREW", "THROB", "THROW", "THRUM", "THUMB",
  "THUMP", "THYME", "TIDAL", "TIGER", "TILDE", "TIMER", "TIPSY", "TOADS", "TODAY", "TOKEN",
  "TONAL", "TONGA", "TONIC", "TOPAZ", "TOPIC", "TORCH", "TOUCH", "TOUGH", "TOWEL", "TOWER",
  "TOXIC", "TOXIN", "TRACE", "TRACK", "TRADE", "TRAIL", "TRAIN", "TRAMP", "TRASH", "TRAWL",
  "TREAD", "TREND", "TRIAD", "TRIAL", "TRIBE", "TRICK", "TRIED", "TRIPE", "TROPE", "TROVE",
  "TRUCE", "TRUCK", "TRULY", "TRUMP", "TRUNK", "TULIP", "TUMOR", "TUNIC", "TURBO", "TWANG",
  "TWEAK", "TWICE", "TWINE", "TWIRL", "ULCER", "ULTRA", "UMBRA", "UNCLE", "UNDER", "UNFIT",
  "UNIFY", "UNITE", "UNITY", "UNLIT", "UNTIL", "UNZIP", "UPSET", "URBAN", "URINE", "USAGE",
  "USHER", "USING", "VAGUE", "VALET", "VALID", "VALOR", "VALUE", "VAPOR", "VAULT", "VEGAN",
  "VENOM", "VICAR", "VIDEO", "VIGOR", "VINYL", "VIOLA", "VIPER", "VIRAL", "VIRUS", "VISOR",
  "VISTA", "VITAL", "VIXEN", "VOCAL", "VODKA", "VOGUE", "VOICE", "VOILA", "VOTER", "VOUCH",
  "WAFER", "WAGER", "WAGON", "WAIST", "WALTZ", "WASTE", "WATCH", "WATER", "WAVER", "WEARY",
  "WEIGH", "WEIRD", "WHACK", "WHALE", "WHARF", "WHEAT", "WHELP", "WHILE", "WHINE", "WHINY",
  "WHIRL", "WHISK", "WHITE", "WHOLE", "WHOSE", "WIDEN", "WIDTH", "WIELD", "WIMPY", "WINCE",
  "WINCH", "WINDY", "WIPER", "WISER", "WITCH", "WOMAN", "WOMEN", "WORLD", "WORSE", "WORST",
  "WORTH", "WOULD", "WOUND", "WOVEN", "WRATH", "WRECK", "WREST", "WRING", "WRIST", "WRITE",
  "WRONG", "WROTE", "WRUNG", "YACHT", "YEARN", "YEAST", "YIELD", "YODEL", "YOKEL", "YOUNG",
  "YOUTH", "ZEBRA", "ZESTY", "ZONAL",
];
const pick = () => WORDS[rnd(WORDS.length)];
const TRIES = 5; // guesses allowed before the word is revealed
const WORDLE_GRID = boardGrid(5, TRIES, 4);
function AWordle({ score, start, end }: GameProps) {
  const [ans, setAns] = useState(pick);
  const [rows, setRows] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const [done, setDone] = useState(0);
  const grade = (g: string) =>
    g.split("").map((c, i) => (c === ans[i] ? 2 : ans.includes(c) ? 1 : 0));
  const key = (k: string) => {
    if (done) return;
    if (k === "⏎") {
      if (cur.length !== 5) return;
      const ng = [...rows, cur];
      setRows(ng);
      if (cur === ans) {
        setDone(1);
        score(1, { moves: ng.length, word: ng[0] });
      } else if (ng.length >= TRIES) {
        setDone(2);
        end({ outcome: "loss", moves: ng.length, word: ng[0] });
      }
      setCur("");
    } else if (k === "⌫") setCur((c) => c.slice(0, -1));
    else if (cur.length < 5) {
      if (!rows.length && !cur) start(); // first letter of the round
      setCur((c) => c + k);
    }
  };
  const KB = ["QWERTYUIOP", "ASDFGHJKL", "⌫ZXCVBNM⏎"];
  const cell = (ch: string, state: number | null) => (
    <div
      style={{
        width: WORDLE_GRID.cell,
        height: WORDLE_GRID.cell,
        border: "1px solid " + (state == null ? "var(--rule)" : "transparent"),
        background:
          state === 2
            ? "var(--ok)"
            : state === 1
            ? "var(--acc)"
            : state === 0
            ? "var(--rule-strong)"
            : "transparent",
        color: state == null ? "var(--tx)" : "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO,
        fontSize: "15px",
        fontWeight: 600,
        borderRadius: "3px",
      }}
    >
      {ch}
    </div>
  );
  const status =
    done === 1
      ? "solved 🎉"
      : done === 2
      ? "it was " + ans
      : "guess the 5-letter word";
  return (
    <div className="arcade-game-row">
      <Board>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {Array.from({ length: TRIES }).map((_, r) => {
            const g = rows[r];
            const grd = g ? grade(g) : null;
            const txt = g || (r === rows.length ? cur : "");
            return (
              <div key={r} style={{ display: "flex", gap: "4px" }}>
                {Array.from({ length: 5 }).map((_, c) => (
                  <Fragment key={c}>
                    {cell(txt[c] || "", grd ? grd[c] : null)}
                  </Fragment>
                ))}
              </div>
            );
          })}
        </div>
      </Board>
      <Panel
        status={status}
        color={
          done === 1 ? "var(--ok)" : done === 2 ? "var(--flag)" : undefined
        }
        width={248}
        slot={86}
      >
        {done ? (
          <button
            onClick={() => {
              setAns(pick());
              setRows([]);
              setCur("");
              setDone(0);
            }}
            style={dashBtn}
          >
            ↻ new word
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              alignItems: "center",
            }}
          >
            {KB.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: "3px" }}>
                {row.split("").map((k, ki) => {
                  const isEnter = k === "⏎";
                  const isDel = k === "⌫";
                  const special = isEnter || isDel;
                  return (
                    <div
                      key={ri + "-" + ki}
                      onClick={() => key(k)}
                      style={{
                        minWidth: special ? "36px" : "20px",
                        padding: "6px 5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isEnter ? "var(--pri)" : "var(--panel)",
                        border: "1px solid var(--rule)",
                        borderRadius: "3px",
                        fontFamily: MONO,
                        fontSize: isEnter ? "8px" : "10px",
                        letterSpacing: isEnter ? "0.06em" : undefined,
                        color: isEnter ? "var(--bg)" : "var(--tx2)",
                        cursor: "pointer",
                      }}
                    >
                      {isEnter ? "ENTER" : k}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

export const ARCADE_GAMES: ArcadeGame[] = [
  {
    key: "reaction",
    label: "Reaction test",
    mode: "min",
    mine: 900,
    unit: "ms",
    Comp: AReaction,
  },
  {
    key: "memory",
    label: "Memory",
    mode: "max",
    mine: 11,
    unit: "lvl",
    Comp: AMemory,
  },
  {
    key: "clicks",
    label: "Quick clicks",
    mode: "max",
    mine: 21,
    unit: "",
    Comp: AClicks,
  },
  {
    key: "ttt",
    label: "Tic-tac-toe",
    mode: "wins",
    mine: 3,
    unit: "×",
    Comp: ATicTac,
  },
  {
    key: "c4",
    label: "Connect 4",
    mode: "wins",
    mine: 21,
    unit: "×",
    Comp: AConnect4,
  },
  {
    key: "wordle",
    label: "Mini wordle",
    mode: "wins",
    mine: 8,
    unit: "×",
    Comp: AWordle,
  },
];
