import {
  Hero,
  About,
  Stack,
  Experiences,
  Projects,
  Hackathons,
  Certifications,
  Resumes,
} from "../components/home";
import { Contact } from "../components/shared";
import { experiences, projects, hackathons, certifications, resumes } from "../../data";

export default function HomePage() {
  // Filter featured items
  const featuredExperiences = experiences.filter(exp => exp.featured).reverse().slice(0, 3);
  const featuredProjects = projects.filter(proj => proj.featured).reverse().slice(0, 4);

  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experiences experiences={featuredExperiences} />
      <Hackathons hackathons={hackathons.reverse()} />
      <Projects projects={featuredProjects} />
      <Certifications certifications={certifications.reverse()} />
      <Resumes resumes={resumes.reverse()} />
      <Contact />
    </>
  );
}
