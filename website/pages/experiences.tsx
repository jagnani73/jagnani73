import { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import type { ExperiencesPageProps } from "../utils/interfaces/experiences-interface";
import type { ExperienceType } from "../utils/interfaces/shared-interfaces";
import { Experiences } from "../components/experiences";
import { getDb } from "../api/services/mongodb.service";

const ExperiencesPage: NextPage<ExperiencesPageProps> = ({ experiences }) => {
  return (
    <>
      <Head>
        <title>Experiences | Yashvardhan Jagnani</title>
      </Head>

      <Experiences experiences={experiences} />
    </>
  );
};

export default ExperiencesPage;

export const getStaticProps: GetStaticProps<
  ExperiencesPageProps
> = async () => {
  try {
    const experiences = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("experiences")
            .find<ExperienceType>({}, {})
            .toArray()
        ).reverse()
      )
    );

    if (experiences) {
      return {
        props: {
          experiences,
        },
        revalidate: 1 * 60 * 60 * 24 * 7,
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
