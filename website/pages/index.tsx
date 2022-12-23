import { NextPage, GetStaticProps } from "next";

import type { HomePageProps } from "../utils/interfaces/home-interfaces";
import type { HackathonType } from "../api/hackathons/hackathons.schema";
import type { CertificationType } from "../api/certifications/certifications.schema";
import type { ResumeType } from "../api/resumes/resumes.schema";
import type { ProjectType } from "../api/projects/projects.schema";
import type { ExperienceType } from "../api/experiences/experiences.schema";
import {
  Home,
  About,
  Stack,
  Experiences,
  Projects,
  Hackathons,
  Certifications,
  Resumes,
} from "../components/home";
import { Contact } from "../components/shared";
import { getDb } from "../api/services/mongodb.service";

const HomePage: NextPage<HomePageProps> = ({
  experiences,
  projects,
  hackathons,
  certifications,
  resumes,
}) => {
  return (
    <>
      <Home />
      <About />
      <Stack />
      <Experiences experiences={experiences} />
      <Hackathons hackathons={hackathons} />
      <Projects projects={projects} />
      <Certifications certifications={certifications} />
      <Resumes resumes={resumes} />
      <Contact />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const experiences = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("experiences")
            .find<ExperienceType>({ featured: true }, { limit: 3 })
            .toArray()
        ).reverse()
      )
    );

    const projects = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("projects")
            .find<ProjectType>({ featured: true }, { limit: 4 })
            .toArray()
        ).reverse()
      )
    );

    const hackathons = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("hackathons")
            .find<HackathonType>({}, {})
            .toArray()
        ).reverse()
      )
    );

    const certifications = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("certifications")
            .find<CertificationType>({}, {})
            .toArray()
        ).reverse()
      )
    );

    const resumes = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("resumes")
            .find<ResumeType>({}, {})
            .toArray()
        ).reverse()
      )
    );

    return {
      props: {
        experiences,
        projects,
        hackathons,
        certifications,
        resumes,
      },
      revalidate: 1 * 60 * 60 * 24 * 7,
    };
  } catch (error) {
    console.dir(error);

    return {
      notFound: true,
    };
  }
};
