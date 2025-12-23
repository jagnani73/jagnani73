import Link from "next/link";

import { ROUTES } from "@/utils/constants/shared-constants";
import { Project } from "@/components/shared";
import type { ProjectsProps } from "@/utils/types/projects.types";

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Projects</h1>
      <h3>A showcase for ideas</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`${ROUTES.PROJECTS}/${project.slug}`}
            className="lg:w-10/12 mx-auto mt-10"
          >
            <Project primary={true} project={project} />
          </Link>
        ))}
      </div>

      <Link
        href={ROUTES.PROJECTS}
        className="mt-8 text-xl lg:text-2xl block w-fit lg:ml-auto"
      >
        See all my <span className="font-bold">projects</span>
      </Link>
    </section>
  );
};
