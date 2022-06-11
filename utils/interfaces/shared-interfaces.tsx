import {
  ROUTES,
  LINKS_NAMES,
  STACK_NAMES,
  SOCIALS_NAMES,
} from "../constants/shared-constants";

export interface NavbarRoutes {
  href: ROUTES;
  name: string;
  external: boolean;
}

export interface FooterRoutes {
  title: string;
  routes: NavbarRoutes[];
}

export interface SocialsRoutes {
  href: string;
  icon: SOCIALS_NAMES;
  external: boolean;
}

export interface MongoDBDefaults {
  _id?: string;
}

export interface ExperienceProps extends MongoDBDefaults {
  logo: string;
  org: string;
  url?: string;
  designation: string;
  tag: string;
  description: string;
  duration: string;
  slug: string;
  featured: boolean;
}

export interface ExperienceProp extends ExperienceProps {
  primary: boolean;
}

export interface ExperiencesProps {
  experiences: ExperienceProps[];
}

export interface ProjectProps extends MongoDBDefaults {
  preview: string;
  name: string;
  description: string;
  tag: string;
  stack: STACK_NAMES[];
  links: { name: LINKS_NAMES; url: string }[];
  slug: string;
  featured: boolean;
}

export interface ProjectProp extends ProjectProps {
  primary: boolean;
}

export interface ProjectsProps {
  projects: ProjectProps[];
}
