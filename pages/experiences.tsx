import { NextPage, GetServerSideProps } from "next";

import { ExperiencesPageProps } from "../utils/interfaces/experiences-interface";
import { getExperiences } from "../utils/services/rest";
import { Experiences } from "../components/experiences";

const ExperiencesPage: NextPage<ExperiencesPageProps> = ({ experiences }) => {
  return (
    <>
      <Experiences experiences={experiences} />
    </>
  );
};

export default ExperiencesPage;

export const getServerSideProps: GetServerSideProps<
  ExperiencesPageProps
> = async () => {
  try {
    const experiences = await getExperiences();
    if (experiences) {
      return {
        props: {
          experiences,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.dir(error);

    return {
      notFound: true,
    };
  }
};
