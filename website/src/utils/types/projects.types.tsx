import {
  LINKS_NAMES,
  SOCIALS_NAMES,
  STACK_NAMES,
} from "../constants/shared-constants";

export interface ProjectType {
  preview: string;
  images?: string[];
  name: string;
  description: string;
  tag: string;
  stack: STACK_NAMES[];
  links: { name: LINKS_NAMES; url: string }[];
  slug: string;
}

export interface ProjectsProps {
  projects: ProjectType[];
}

export interface ProjectsPageProps {
  projects: ProjectType[];
}

export interface ProjectPageProps {
  project: ProjectType;
}

export interface ProjectProps {
  primary: boolean;
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
