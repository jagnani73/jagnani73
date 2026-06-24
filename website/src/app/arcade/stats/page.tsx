import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/shared/page-shell";
import { SectionHead } from "@/components/shared/section-head";
import { getArcadeStats } from "@/utils/functions/arcade-stats";
import { gameLabel, formatScore } from "@/utils/constants/arcade-meta";

// Undisclosed "cool stats" board for the arcade — not linked anywhere, not in the
// sitemap, noindex. (We deliberately don't list it in robots.txt: a Disallow rule
// would publish the path. noindex keeps it quiet without advertising it.) ISR'd,
// so the aggregate queries run at most once a minute.
export const metadata: Metadata = {
  title: "Arcade · The Numbers",
  robots: { index: false, follow: false },
};

export const revalidate = 60;

const nf = new Intl.NumberFormat("en-US");

const dur = (ms: number): string => {
  const s = Math.round(ms / 1000);
  if (s <= 0) return "0s";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
};

const SubHead = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-tx3">
    {children}
  </h2>
);

const Tile = ({ value, label }: { value: string; label: string }) => (
  <div className="border border-rule bg-panel px-4 py-4">
    <div className="font-display text-[34px] leading-none text-tx rail:text-[40px]">
      {value}
    </div>
    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-tx3">
      {label}
    </div>
  </div>
);

const BarRow = ({
  label,
  fill,
  right,
}: {
  label: string;
  fill: number;
  right: string;
}) => (
  <div className="flex items-center gap-3 py-1.5">
    <span className="w-28 shrink-0 truncate font-mono text-[12px] text-tx">
      {label}
    </span>
    <span className="relative h-2 flex-1 overflow-hidden rounded-sm bg-pri-a08">
      <span
        className="absolute inset-y-0 left-0 rounded-sm bg-sig"
        style={{ width: `${Math.min(100, Math.max(0, fill))}%` }}
      />
    </span>
    <span className="w-16 shrink-0 text-right font-mono text-[12px] text-tx2">
      {right}
    </span>
  </div>
);

const Dash = ({ label = "—" }: { label?: string }) => (
  <p className="font-mono text-[13px] text-tx3">{label}</p>
);

const ArcadeStatsPage = async () => {
  const s = await getArcadeStats();

  const head = (
    <SectionHead
      source="page"
      n="08"
      title="THE NUMBERS"
      note="arcade telemetry · the quiet ledger"
    />
  );

  if (s.errored) {
    return (
      <PageShell page="STATS">
        {head}
        <p className="max-w-[60ch] px-4 py-16 font-serif text-[18px] leading-relaxed text-tx2 rail:px-11">
          The stats are temporarily unavailable. We hit a snag fetching them.
          Check back shortly.
        </p>
      </PageShell>
    );
  }

  if (!s.configured) {
    return (
      <PageShell page="STATS">
        {head}
        <p className="max-w-[60ch] px-4 py-16 font-serif text-[18px] leading-relaxed text-tx2 rail:px-11">
          Telemetry isn&apos;t configured for this environment.
        </p>
      </PageShell>
    );
  }

  if (s.totals.plays === 0) {
    return (
      <PageShell page="STATS">
        {head}
        <p className="max-w-[60ch] px-4 py-16 font-serif text-[18px] leading-relaxed text-tx2 rail:px-11">
          No rounds on record yet. The arcade only logs from the live production
          site. Once it&apos;s deployed and a few games have been played, the
          numbers fill in here.
        </p>
      </PageShell>
    );
  }

  const maxPlays = s.byGame[0]?.plays ?? 0;
  const maxPct = s.letters[0]?.pct ?? 0;
  // view/start fire once per session, play fires per round — so this isn't a
  // decreasing funnel. Report engagement (start rate) and depth (rounds/session).
  const startRate =
    s.totals.views > 0
      ? Math.round((s.totals.starts / s.totals.views) * 100)
      : null;
  const roundsPerSession =
    s.totals.starts > 0 ? (s.totals.plays / s.totals.starts).toFixed(1) : null;

  return (
    <PageShell page="STATS">
      {head}
      <div className="space-y-12 px-4 py-8 rail:px-11 rail:py-10">
        {/* At a glance */}
        <section>
          <SubHead>At a glance</SubHead>
          <div className="grid grid-cols-2 gap-3 rail:grid-cols-4">
            <Tile value={nf.format(s.totals.plays)} label="rounds played" />
            <Tile value={nf.format(s.totals.visitors)} label="players" />
            <Tile value={dur(s.totals.playMs)} label="time at play" />
            <Tile value={nf.format(s.totals.views)} label="arcade views" />
          </div>
          <p className="mt-4 font-mono text-[12px] text-tx3">
            {nf.format(s.totals.views)} cards seen →{" "}
            {nf.format(s.totals.starts)} engaged
            {startRate != null ? ` · ${startRate}% start rate` : ""}
            {roundsPerSession != null
              ? ` · ${roundsPerSession} rounds per session`
              : ""}
          </p>
        </section>

        {/* Favourite games */}
        <section>
          <SubHead>Favourite games</SubHead>
          {s.byGame.length ? (
            <div>
              {s.byGame.map((g) => (
                <BarRow
                  key={g.game}
                  label={gameLabel(g.game)}
                  fill={maxPlays > 0 ? (g.plays / maxPlays) * 100 : 0}
                  right={nf.format(g.plays)}
                />
              ))}
            </div>
          ) : (
            <Dash />
          )}
        </section>

        {/* Records & bests */}
        <section>
          <SubHead>Records &amp; bests</SubHead>
          <div className="mb-6 border border-rule bg-panel px-5 py-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-tx3">
              fastest reaction ever
            </div>
            <div className="mt-1 font-display text-[44px] leading-none text-sig">
              {s.fastestReaction != null ? `${s.fastestReaction} ms` : "—"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 rail:grid-cols-3">
            {s.bests
              .filter((b) => b.game !== "reaction")
              .map((b) => (
                <div key={b.game} className="border border-rule px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-tx3">
                    {gameLabel(b.game)}
                  </div>
                  <div className="mt-1 font-display text-[22px] text-tx">
                    {formatScore(b.game, b.best)}
                  </div>
                </div>
              ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-tx3">
            longest win streak · {s.longestStreak ?? "—"}
          </p>
        </section>

        {/* Wordle openers */}
        <section>
          <SubHead>Wordle openers</SubHead>
          {s.letters.length ? (
            <div className="grid gap-8 rail:grid-cols-2">
              <div>
                <p className="mb-2 font-mono text-[11px] text-tx3">
                  first letter
                </p>
                {s.letters.slice(0, 10).map((l) => (
                  <BarRow
                    key={l.letter}
                    label={l.letter}
                    fill={maxPct > 0 ? (l.pct / maxPct) * 100 : 0}
                    right={`${l.pct}%`}
                  />
                ))}
              </div>
              <div>
                <p className="mb-2 font-mono text-[11px] text-tx3">
                  top opening words
                </p>
                <ol className="space-y-1">
                  {s.topWords.map((w, i) => (
                    <li
                      key={w.word}
                      className="flex justify-between font-mono text-[13px] text-tx"
                    >
                      <span>
                        <span className="text-tx3">{i + 1}.</span>{" "}
                        {w.word.toUpperCase()}
                      </span>
                      <span className="text-tx2">{nf.format(w.n)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <Dash label="no wordle openers logged yet" />
          )}
        </section>

        {/* The regulars */}
        <section>
          <SubHead>The regulars</SubHead>
          <div className="grid gap-3 rail:grid-cols-2">
            <div className="border border-rule bg-panel px-5 py-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-tx3">
                most rounds · one player
              </div>
              {s.topVisitorOverall ? (
                <>
                  <div className="mt-1 font-display text-[40px] leading-none text-acc">
                    {nf.format(s.topVisitorOverall.plays)}
                  </div>
                  <div className="mt-1 font-mono text-[12px] text-tx3">
                    by anon {s.topVisitorOverall.label}
                  </div>
                </>
              ) : (
                <Dash />
              )}
            </div>
            <div className="border border-rule bg-panel px-5 py-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-tx3">
                most of one game · one player
              </div>
              {s.topVisitorGame ? (
                <>
                  <div className="mt-1 font-display text-[40px] leading-none text-acc">
                    {nf.format(s.topVisitorGame.plays)}
                    <span className="ml-2 font-mono text-[14px] text-tx2">
                      {s.topVisitorGame.game
                        ? gameLabel(s.topVisitorGame.game)
                        : ""}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[12px] text-tx3">
                    by anon {s.topVisitorGame.label}
                  </div>
                </>
              ) : (
                <Dash />
              )}
            </div>
          </div>
          <p className="mt-3 font-mono text-[11px] text-tx3">
            EU/EEA/UK visitors and opt-outs aren&apos;t counted here, by design.
          </p>
        </section>
      </div>
    </PageShell>
  );
};

export default ArcadeStatsPage;
