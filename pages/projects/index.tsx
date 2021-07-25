import { GetStaticPropsResult } from "next";

import { ProjectProps } from "../../utils/interfaces";
import { getProjects } from "../../services/rest";
import * as ProjectsComponents from "../../components/projects";

interface ProjectsPageProps {
  projects: ProjectProps[];
}

const ProjectsPage = ({ projects }: ProjectsPageProps) => {
  return (
    <>
      <ProjectsComponents.Projects projects={projects} />
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
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
};
