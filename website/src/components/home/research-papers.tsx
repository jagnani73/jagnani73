import type { ResearchPapersProps } from "@/utils/types/home.types";
import Link from "next/link";

export const ResearchPapers: React.FC<ResearchPapersProps> = ({
  researchPapers,
}) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Research Papers</h1>
      <h3>Academic contributions</h3>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-16 mt-8">
        {researchPapers.map((paper) => (
          <article key={paper.url} className="flex flex-col h-full">
            <h4 className="font-semibold">
              <Link
                href={paper.url}
                className="link-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                {paper.title}
              </Link>
            </h4>

            <div className="flex flex-col gap-1 mt-auto pt-3">
              {paper.felicitation && (
                <p className="text-sm font-semibold">{paper.felicitation}</p>
              )}

              <p className="text-sm">{paper.date}</p>

              {paper.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold bg-steel-blue w-fit px-2 py-1 rounded-sm text-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
