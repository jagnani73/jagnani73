import type { MetadataRoute } from "next";
import { getAllCaseSlugs } from "@/content/cases";
import { SITE_URL } from "@/lib/seo";

const sitemap = (): MetadataRoute.Sitemap => {
  const cases: MetadataRoute.Sitemap = getAllCaseSlugs().map((slug) => ({
    url: `${SITE_URL}/record/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/record`, changeFrequency: "weekly", priority: 0.9 },
    ...cases,
  ];
};

export default sitemap;
