import { NextPage, GetServerSideProps } from "next";

import { HomePageProps } from "../utils/interfaces/home-interfaces";
import { getHome } from "../utils/services/rest";
import { Home, About, Stack, Experiences, Projects } from "../components/home";
import { Contact } from "../components/shared";

const HomePage: NextPage<HomePageProps> = ({ experiences, projects }) => {
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

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const { experiences, projects } = await getHome();

    return {
      props: {
        experiences,
        projects,
      },
    };
  } catch (error) {
    console.dir(error);

    return {
      notFound: true,
    };
  }
};
