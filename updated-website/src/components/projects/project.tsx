import type { ProjectType } from "../../utils/interfaces/shared-interfaces";
import { Project } from "../shared";

const ProjectComponent: React.FC<ProjectType> = ({ ...project }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-48">
      <Project primary={false} {...project} />
    </section>
  );
};

export default ProjectComponent;

