interface MongoDBDefaults {
  _id?: string;
}

  logo: string;
  org: string;
  designation: string;
  tag: string;
  description: string;
  duration: string;
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
