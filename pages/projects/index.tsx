import { GetStaticPropsResult } from "next";

import { ProjectsPageProps } from "../../utils/interfaces/projects-interface";
import { getProjects } from "../../utils/services/rest";
import { Projects } from "../../components/projects";

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  return (
    <>
      <Projects projects={projects} />
    </>
  );
};

export default ProjectsPage;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<ProjectsPageProps>
> => {
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
    return {
      notFound: true,
    };
  }
};
