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
  stack: string[];
  links: string[];
  slug: string;
  featured: boolean;
}

export interface ProjectProp extends ProjectProps {
  primary: boolean;
}

export interface ProjectsProps {
  projects: ProjectProps[];
}
