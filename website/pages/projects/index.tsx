import { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import type { ProjectsPageProps } from "../../utils/interfaces/projects-interface";
import type { ProjectType } from "../../utils/interfaces/shared-interfaces";
import { Projects } from "../../components/projects";
import { getDb } from "../../api/services/mongodb.service";

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Projects | Yashvardhan Jagnani</title>
      </Head>

      <Projects projects={projects} />
    </>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  try {
    const projects = JSON.parse(
      JSON.stringify(
        (
          await (await getDb())
            .collection("projects")
            .find<ProjectType>({}, {})
            .toArray()
        ).reverse()
      )
    );

    if (projects) {
      return {
        props: {
          projects,
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
