import { NextPage, GetStaticPropsResult } from "next";
import Script from "next/script";

import { IndexPageProps } from "../utils/interfaces/home-interfaces";
import { getExperiences, getProjects } from "../utils/services/rest";
import { Home, About, Stack, Experiences, Projects } from "../components/home";

const HomePage: NextPage<IndexPageProps> = ({ experiences, projects }) => {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />

      <Home />
      <About />
      <Stack />
      <Experiences experiences={experiences} />
      <Projects projects={projects} />
    </>
  );
};

export default HomePage;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IndexPageProps>
> => {
  try {
    const experiences = await getExperiences(3, true);
    const projects = await getProjects(4, true);
    if (experiences && projects)
      return {
        props: {
          experiences: experiences,
          projects: projects,
        },
      };
    else {
      return {
        redirect: {
          permanent: false,
          destination: "/500",
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
};
