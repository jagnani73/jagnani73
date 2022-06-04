import { NextPage, GetStaticPropsResult } from "next";

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

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<ExperiencesPageProps>
> => {
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
    return {
      notFound: true,
    };
  }
};
