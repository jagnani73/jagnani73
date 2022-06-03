import { STACK_ICONS } from "../constants/shared-constants";
import { ProjectProps } from "./shared-interfaces";

export interface ProjectsPageProps {
  projects: ProjectProps[];
}

export interface ProjectPageProps {
  project: ProjectProps;
}

export interface StackIconProps {
  name: STACK_ICONS;
}
