import type { ProjectsProps } from "@/utils/types/projects.types";
import { Project } from "@/components/shared";

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-28 lg:mt-48">
      <h1>Projects</h1>
      <h3>Things I&apos;ve built</h3>

      <p className="lg:w-11/12 mt-10">
        A collection of projects I&apos;ve worked on over the years. Some are
        hackathon experiments that got out of hand, others are client work or
        open-source contributions. I&apos;ve mentored teams, laid foundation
        code for startups, and built things that solve real problems. Most of
        these started with &quot;what if we tried...&quot; and ended up teaching
        me something new.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 lg:items-start mt-10 lg:mt-20">
        {projects.map((project) => (
          <Project key={project.slug} primary={false} project={project} />
        ))}
      </div>
    </section>
  );
};
