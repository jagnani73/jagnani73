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
} from "@/components/home";
import {
  experiences,
  projects,
  hackathons,
  certifications,
  resumes,
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
      <Resumes resumes={resumes} />
    </>
  );
};

export default HomePage;
