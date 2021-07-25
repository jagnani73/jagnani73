interface MongoDBDefaults {
  _id?: string;
}

export interface ExperienceProps extends MongoDBDefaults {
  logo: string;
  org: string;
  designation: string;
  tag: string;
  description: string;
  duration: string;
  slug: string;
  featured: boolean;
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
