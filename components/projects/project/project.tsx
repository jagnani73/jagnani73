import { ProjectProps } from "../../../utils/interfaces/shared-interfaces";
import { Project } from "../../shared";

const ProjectComponent: React.FC<ProjectProps> = ({ ...project }) => {
  return (
    <section className="my-28 px-72">
      <Project primary={false} {...project} />
    </section>
  );
};

export default ProjectComponent;
