import type { ReactNode } from "react";
import { CHAPTERS } from "@/content/home";
import type { Chapter } from "@/utils/types/home.types";
import { SectionHead } from "@/components/shared/section-head";
import { CtaTerm } from "@/components/shared/cta-term";
import { Rule } from "@/components/shared/rule";

// The org links out when it has a `url`; without one (e.g. a dead domain) it
// renders as plain text instead of a non-navigating <a>.
const ChapterOrg = ({
  url,
  org,
  size,
}: {
  url?: string;
  org: string;
  size: string;
}) => {
  const base = `font-display ${size} tracking-[0.03em] text-tx`;
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} transition-colors hover:text-sig`}
    >
      {org}
    </a>
  ) : (
    <span className={base}>{org}</span>
  );
};

// Splits the deck around each `deckLinks` mention and links it in place, so the
// orgs stay inside the prose at body size rather than heading it. Same
// split-on-substring idiom as fig-flux's `highlight`.
// Accumulates into a fresh array per link rather than flatMap: ReactNode itself
// includes Iterable<ReactNode>, so flatMap can't tell "one node" from "nodes to
// flatten" and won't typecheck here.
const deckProse = (c: Chapter): ReactNode[] => {
  let parts: ReactNode[] = [c.deck];
  c.deckLinks?.forEach(({ text, url }) => {
    const next: ReactNode[] = [];
    parts.forEach((part) => {
      const at = typeof part === "string" ? part.indexOf(text) : -1;
      if (typeof part !== "string" || at < 0) {
        next.push(part);
        return;
      }
      next.push(
        part.slice(0, at),
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tx transition-colors hover:text-sig"
        >
          {text}
        </a>,
        part.slice(at + text.length),
      );
    });
    parts = next;
  });
  return parts;
};

// `size` tracks the two layouts, which set body copy at different sizes.
const ChapterBody = ({ c, size }: { c: Chapter; size: string }) => (
  <span className={`font-sans ${size} leading-[1.65] text-tx2`}>
    {deckProse(c)}
  </span>
);

export const Chapters = () => (
  <section>
    <SectionHead
      source="page"
      id="chapters"
      n="01"
      title="THE CHAPTERS"
      note={<CtaTerm href="/record">the full record</CtaTerm>}
    />
    {CHAPTERS.map((c, i) => (
      <div key={c.n}>
        <div className="px-4 pt-5 pb-5.5 rail:hidden">
          <div className="flex items-center gap-5">
            <span className="shrink-0 font-display text-[30px] text-transparent [-webkit-text-stroke:1px_var(--rule-strong)]">
              {c.n}
            </span>
            <span className="min-w-0">
              <ChapterOrg url={c.url} org={c.org} size="text-[21px]" />
              <br />
              <span className="font-mono text-[12px] text-tx3">{c.role}</span>
            </span>
          </div>
          <p className="mt-3">
            <ChapterBody c={c} size="text-[15.5px]" />
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[12.5px]">
            {c.stats.map(([v, l]) => (
              <span key={l}>
                <span className="text-acc">{v}</span>
                <span className="text-tx2"> {l}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-x-7 px-11 py-7.5 rail:grid rail:grid-cols-[160px_320px_1fr_290px]">
          <span className="text-center font-display text-[46px] text-transparent [-webkit-text-stroke:1px_var(--rule-strong)]">
            {c.n}
          </span>
          <span>
            <ChapterOrg url={c.url} org={c.org} size="text-[28px]" />
            <br />
            <span className="font-mono text-[12.5px] text-tx2">{c.role}</span>
          </span>
          <ChapterBody c={c} size="text-[17.5px]" />
          <span className="text-right font-mono text-[13px] leading-[2.1]">
            {c.stats.map(([v, l]) => (
              <span key={l}>
                <span className="text-acc">{v}</span>
                <span className="text-tx2"> {l}</span>
                <br />
              </span>
            ))}
          </span>
        </div>
        {i < CHAPTERS.length - 1 ? <Rule /> : null}
      </div>
    ))}
  </section>
);
