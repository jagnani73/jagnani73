export interface Chapter {
  n: string;
  org: string;
  role: string;
  url: string;
  deck: string;
  stats: [value: string, label: string][];
}

export interface SelectedWorkItem {
  /** case slug — also the React key */
  id: string;
  title: string;
  meta: string;
  year: string;
  /** acc-colored highlight; replaced by a live metric when `metric` is set */
  tag: string;
  metric?: "agentSdk" | "goldrushKit";
  /** the case's first img plate — image-less cases are skipped, so always present */
  img: string;
}

/** One run of bio prose; `em` highlights the segment (text-tx over the tx2 body). */
export interface BioSegment {
  t: string;
  em?: boolean;
}

export interface PersonLink {
  label: string;
  href: string;
  /** external `<a target="_blank">` vs a same-tab link (e.g. `mailto:`) */
  external: boolean;
}

/** one cell of the "currently" signal strip: [label, value] */
export type CurrentlyCell = [label: string, value: string];

// "03 · THE PERSON" — bio + arcade + currently-strip + media row + contacts.
export interface Person {
  /** italic pull-quote: `pre` in tx2, `emphasis` in tx */
  quote: { pre: string; emphasis: string };
  /** body paragraphs, each a run of (optionally emphasised) segments */
  bio: BioSegment[][];
  /** caption under the arcade */
  arcadeCaption: string;
  /** the "currently" signal strip — exactly 4 cells (the layout is grid-cols-4) */
  currently: [CurrentlyCell, CurrentlyCell, CurrentlyCell, CurrentlyCell];
  /** contact rows (github / linkedin / email) */
  links: PersonLink[];
  resume: { label: string; href: string };
}
