export interface ExperienceType {
  logo: string;
  org: string;
  url?: string;
  designation: string;
  tag: string;
  description: string;
  duration: string;
  slug: string;
}

export interface ExperienceProps {
  primary: boolean;
  experience: ExperienceType;
}

export interface ExperiencesProps {
  experiences: ExperienceType[];
}

export interface ExperiencesPageProps {
  experiences: ExperienceType[];
}
