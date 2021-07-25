import { ProjectProps } from "../../../utils/interfaces";
import { Project } from "../../shared";

const ProjectComponent = ({ ...project }: ProjectProps) => {
  return <Project primary={false} {...project} />;
};

export default ProjectComponent;
