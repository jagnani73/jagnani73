import type { ProjectType } from "@/utils/types/projects.types";
import { Project as ProjectComponent } from "../shared";

export const Project: React.FC<ProjectType> = ({ ...project }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-48">
      <ProjectComponent primary={false} {...project} />
    </section>
  );
};
