import type { ProjectType } from "@/utils/types/projects.types";
import { LINKS_NAMES } from "@/utils/constants/shared-constants";
import { stripMarkdown } from "@/utils/functions/strip-markdown";
import type { CaseData, Plate } from "@/content/case-types";

const firstSentence = (md: string): string => {
  const noLinks = md.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const plain = stripMarkdown(noLinks);
  const match = plain.match(/^(.*?[.!?])(\s|$)/);
  const sentence = (match ? match[1] : plain).trim();
  return sentence.length > 180
    ? sentence.slice(0, 177).trimEnd() + "…"
    : sentence;
};

// Derive a baseline case from a data.ts project so every project has a /work/[slug]
// page. Authored cases (insidepoly, agent-sdk, dewls) override these.
export const projectToCase = (
  project: ProjectType,
  nextSlug: string,
): CaseData => {
  const images = [project.preview, ...(project.images ?? [])];
  const plates: Plate[] = images.map((src, i) => ({
    kind: "img",
    src,
    cap: i === 0 ? "the project" : `plate ${String(i + 1).padStart(2, "0")}`,
  }));
  const primary =
    project.links.find((l) => l.name === LINKS_NAMES.WEBSITE) ??
    project.links.find((l) => l.name === LINKS_NAMES.GITHUB) ??
    project.links[0];
  const stack = project.stack.join(" · ");

  return {
    slug: project.slug,
    title: project.name.toUpperCase(),
    docTitle: `${project.name} — Case Study`,
    badge: project.tag.toUpperCase(),
    deck: firstSentence(project.description),
    fig: null,
    ogImage: project.preview,
    sections: [
      {
        type: "prose",
        n: "01",
        title: "OVERVIEW",
        note: stack,
        markdown: project.description,
        stack,
      },
      ...(plates.length
        ? [
            {
              type: "plates" as const,
              n: "02",
              title: "IN THE WILD",
              note: `plates 01–${String(plates.length).padStart(2, "0")}`,
              plates,
              cta: primary
                ? { label: `view on ${primary.name} ↗`, href: primary.url }
                : undefined,
            },
          ]
        : []),
    ],
    next: nextSlug,
  };
};
