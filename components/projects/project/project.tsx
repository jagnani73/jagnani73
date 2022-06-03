import { ProjectProps } from "../../../utils/interfaces/shared-interfaces";
import { Project } from "../../shared";

const ProjectComponent: React.FC<ProjectProps> = ({ ...project }) => {
  return <Project primary={false} {...project} />;
};

export default ProjectComponent;
