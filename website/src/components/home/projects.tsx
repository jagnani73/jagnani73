import Link from "next/link";

import { ROUTES } from "@/utils/constants/shared-constants";
import { Project } from "@/components/shared";
import type { ProjectsProps } from "@/utils/types/projects.types";

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Projects</h1>
      <h3>Things I&apos;ve built</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {projects.map((project) => (
          <Project key={project.slug} primary={true} project={project} />
        ))}
      </div>

      <Link
        href={ROUTES.PROJECTS}
        className="mt-8 text-xl lg:text-2xl block w-fit lg:ml-auto link-hover"
      >
        See all my <span className="font-bold">projects</span>
      </Link>
    </section>
  );
};
