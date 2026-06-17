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
