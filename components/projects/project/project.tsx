import { ProjectProps } from "../../../utils/interfaces/shared-interfaces";
import { Project } from "../../shared";

const ProjectComponent: React.FC<ProjectProps> = ({ ...project }) => {
  return (
    <section className="section-container mt-48">
      <Project primary={false} {...project} />
    </section>
  );
};

export default ProjectComponent;
