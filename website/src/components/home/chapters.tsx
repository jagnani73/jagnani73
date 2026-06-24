import { CHAPTERS } from "@/content/home";
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
        <div className="px-4 pt-5 pb-[22px] rail:hidden">
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
          <p className="mt-3 font-sans text-[15.5px] leading-[1.6] text-tx2">
            {c.deck}
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

        <div className="hidden items-center gap-x-7 px-11 py-[30px] rail:grid rail:grid-cols-[160px_320px_1fr_290px]">
          <span className="text-center font-display text-[46px] text-transparent [-webkit-text-stroke:1px_var(--rule-strong)]">
            {c.n}
          </span>
          <span>
            <ChapterOrg url={c.url} org={c.org} size="text-[28px]" />
            <br />
            <span className="font-mono text-[12.5px] text-tx2">{c.role}</span>
          </span>
          <span className="font-sans text-[17.5px] leading-[1.65] text-tx2">
            {c.deck}
          </span>
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
