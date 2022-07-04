import { STACK_NAMES } from "../constants/shared-constants";
import { ExperienceType, ProjectType } from "./shared-interfaces";

export interface StackType {
  name: STACK_NAMES;
  logo: JSX.Element;
}

export interface HomePageProps {
  experiences: ExperienceType[];
  projects: ProjectType[];
}
