import { GetStaticPropsResult } from "next";
import Head from "next/head";

import { ExperienceProps, ProjectProps } from "../utils/interfaces";
import { getExperiences, getProjects } from "../services/rest";
import * as IndexComponents from "../components/index";

interface IndexPageProps {
  experiences: ExperienceProps[];
  projects: ProjectProps[];
}

const IndexPage = ({ experiences, projects }: IndexPageProps) => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </Head>

      <IndexComponents.Home />
      <IndexComponents.About />
      <IndexComponents.Stack />
      <IndexComponents.Experiences experiences={experiences} />
      <IndexComponents.Projects projects={projects} />
      {/* <IndexComponents.Contact /> */}
    </>
  );
};

export default IndexPage;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IndexPageProps>
> => {
  try {
    const experiences = await getExperiences(3, true);
    const projects = await getProjects(4, true);
    return {
      props: {
        experiences: experiences as ExperienceProps[],
        projects: projects as ProjectProps[],
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
};
