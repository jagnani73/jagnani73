import { GetServerSideProps } from "next";
import Head from "next/head";

import { ProjectsPageProps } from "../../utils/interfaces/projects-interface";
import { getProjects } from "../../utils/services/rest";
import { Projects } from "../../components/projects";

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
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

export const getServerSideProps: GetServerSideProps<
  ProjectsPageProps
> = async () => {
  try {
    const projects = await getProjects();
    if (projects) {
      return {
        props: {
          projects,
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
