import { STACK_NAMES } from "../constants/shared-constants";
import {
  ExperienceType,
  MongoDBDefaults,
  ProjectType,
} from "./shared-interfaces";

export interface StackType {
  name: STACK_NAMES;
  logo: JSX.Element;
}

export interface HackathonProps extends MongoDBDefaults {
  name: string;
  organizer: string;
  award: string;
  location: string;
  duration: string;
  project?: {
    name: string;
    slug: string;
  };
}

export interface HackathonsProps {
  hackathons: HackathonProps[];
}

export interface CertificationProps extends MongoDBDefaults {
  name: string;
  organization: string;
  validity: string;
}

export interface CertificationsProps {
  certifications: CertificationProps[];
}

export interface ResumeProps extends MongoDBDefaults {
  preview: string;
  resume: string;
  date: string;
}

export interface ResumesProps {
  resumes: ResumeProps[];
}

export interface HomePageProps {
  experiences: ExperienceType[];
  projects: ProjectType[];
  hackathons: HackathonProps[];
  certifications: CertificationProps[];
  resumes: ResumeProps[];
}
