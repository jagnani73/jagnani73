import Image from "next/image";
import Link from "next/link";
import type { Metrics } from "@/utils/types/metrics.types";
import { getSelectedWork } from "@/utils/functions/selected-work";
import { getAllCaseSlugs } from "@/content/cases";
import type { SelectedWorkItem } from "@/utils/types/home.types";
import { SectionHead } from "@/components/shared/section-head";
import { CtaTerm } from "@/components/shared/cta-term";

const tagFor = (item: SelectedWorkItem, metrics: Metrics): string => {
  if (item.metric === "agentSdk")
    return `${metrics.agentSdkStars}★ · ${metrics.agentSdkDownloads} dl`;
  if (item.metric === "goldrushKit") return `${metrics.goldrushKitStars}★`;
  return item.tag;
};

const rowClass =
  "group grid grid-cols-[96px_1fr] items-center gap-3.5 border-b border-rule px-4 py-3.5 transition-colors hover:bg-pri-a08 rail:grid-cols-[160px_1fr_auto_auto] rail:gap-7 rail:px-11 rail:py-[18px]";

const Row = ({ item, tag }: { item: SelectedWorkItem; tag: string }) => (
  <>
    <span className="relative block h-[60px] overflow-hidden rounded border border-rule bg-panel rail:h-[90px]">
      <Image
        src={item.img}
        alt={item.title}
        fill
        sizes="(max-width: 1200px) 96px, 160px"
        className="object-cover grayscale brightness-[0.85] transition-[filter] duration-300 group-hover:grayscale-0 group-hover:brightness-100"
      />
    </span>
    <span className="min-w-0">
      <span className="font-display text-[19px] uppercase tracking-[0.03em] text-tx transition-colors group-hover:text-sig rail:text-[31px]">
        {item.title}
      </span>
      <br className="rail:hidden" />
      <span className="font-mono text-[10.5px] text-tx2 rail:hidden">
        {item.year} · {tag} — {item.meta}
      </span>
      <span className="hidden font-mono text-[12px] text-tx2 rail:block">
        {item.meta}
      </span>
    </span>
    <span className="hidden font-mono text-[13.5px] text-tx3 rail:inline">
      {item.year}
    </span>
    <span className="hidden whitespace-nowrap font-mono text-[12.5px] text-acc rail:inline-block">
      {tag}
    </span>
  </>
);

export const SelectedWork = ({ metrics }: { metrics: Metrics }) => {
  const items = getSelectedWork();
  return (
    <section>
      <SectionHead
        source="page"
        id="work"
        n="02"
        title="SELECTED WORK"
        note={
          <CtaTerm href="/record?filter=cases">
            {items.length} of {getAllCaseSlugs().length} case studies
          </CtaTerm>
        }
      />
      {items.map((item) => (
        <Link key={item.id} href={`/record/${item.id}`} className={rowClass}>
          <Row item={item} tag={tagFor(item, metrics)} />
        </Link>
      ))}
    </section>
  );
};
