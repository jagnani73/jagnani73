import { NextPage, GetStaticPropsResult } from "next";

import { IndexPageProps } from "../utils/interfaces/home-interfaces";
import { getExperiences, getProjects } from "../utils/services/rest";
import { Home, About, Stack, Experiences, Projects } from "../components/home";
import { Contact } from "../components/shared";

const HomePage: NextPage<IndexPageProps> = ({ experiences, projects }) => {
  return (
    <>
      <Home />
      <About />
      <Stack />
      <Experiences experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
    </>
  );
};

export default HomePage;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IndexPageProps>
> => {
  try {
    const experiences = await getExperiences(4, true);
    const projects = await getProjects(4, true);
    if (experiences && projects)
      return {
        props: {
          experiences,
          projects,
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
