import { GetStaticPropsResult } from "next";

import { ExperienceProps } from "../utils/interfaces";
import { getExperiences } from "../services/rest";
import * as ExperiencesComponents from "../components/experiences";

interface ExperiencesPageProps {
  experiences: ExperienceProps[];
}

const ExperiencesPage = ({ experiences }: ExperiencesPageProps) => {
  return (
    <>
      <ExperiencesComponents.Experiences experiences={experiences} />
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
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
};
