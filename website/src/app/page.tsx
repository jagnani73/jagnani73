import { NextPage } from "next";
import {
  Hero,
  About,
  Stack,
  Experiences,
  Projects,
  Hackathons,
  Certifications,
  Resumes,
  ResearchPapers,
} from "@/components/home";
import {
  experiences,
  projects,
  hackathons,
  certifications,
  resumes,
  researchPapers,
} from "@/utils/constants/data";

const HomePage: NextPage = () => {
  const featuredExperiences = experiences.slice(0, 3);
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experiences experiences={featuredExperiences} />
      <Hackathons hackathons={hackathons} />
      <Projects projects={featuredProjects} />
      <Certifications certifications={certifications} />
      <ResearchPapers researchPapers={researchPapers} />
      <Resumes resumes={resumes} />
    </>
  );
};

export default HomePage;
