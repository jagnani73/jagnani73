import { STACK_NAMES } from "../constants/shared-constants";
import { ExperienceType } from "./experiences.types";
import { ProjectType } from "./projects.types";

export interface StackType {
  name: STACK_NAMES;
  logo: React.ReactNode;
}

export interface HackathonType {
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
  hackathons: HackathonType[];
}

export interface CertificationType {
  name: string;
  organization: string;
  validity: string;
}

export interface CertificationsProps {
  certifications: CertificationType[];
}

export interface ResumeType {
  preview: string;
  resume: string;
  date: string;
}

export interface ResumesProps {
  resumes: ResumeType[];
}

export interface ResearchPaperType {
  title: string;
  date: string;
  url: string;
  felicitation: string | null;
  tags: string[];
}

export interface ResearchPapersProps {
  researchPapers: ResearchPaperType[];
}

export interface HomePageProps {
  experiences: ExperienceType[];
  projects: ProjectType[];
  hackathons: HackathonType[];
  certifications: CertificationType[];
  resumes: ResumeType[];
  researchPapers: ResearchPaperType[];
}
