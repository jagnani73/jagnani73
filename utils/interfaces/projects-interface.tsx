import {
  LINKS_NAMES,
  SOCIALS_NAMES,
  STACK_NAMES,
} from "../constants/shared-constants";
import { ProjectType } from "./shared-interfaces";

export interface ProjectsPageProps {
  projects: ProjectType[];
}

export interface ProjectPageProps {
  project: ProjectType;
}

export interface StackIconProps {
  name: STACK_NAMES;
}

export interface LinkIconProps {
  name: LINKS_NAMES;
}

export interface SocialIconProps {
  name: SOCIALS_NAMES;
}
