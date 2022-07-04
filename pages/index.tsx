import { NextPage, GetServerSideProps } from "next";

import { HomePageProps } from "../utils/interfaces/home-interfaces";
import { getHome } from "../utils/services/rest";
import {
  Home,
  About,
  Stack,
  Experiences,
  Projects,
  Hackathons,
} from "../components/home";
import { Contact } from "../components/shared";

const HomePage: NextPage<HomePageProps> = ({
  experiences,
  projects,
  hackathons,
}) => {
  return (
    <>
      <Home />
      <About />
      <Stack />
      <Experiences experiences={experiences} />
      <Hackathons hackathons={hackathons} />
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
    const data = await getHome();

    return {
      props: { ...data },
    };
  } catch (error) {
    console.dir(error);

    return {
      notFound: true,
    };
  }
};
