import { GetServerSideProps } from "next";

import { ProjectPageProps } from "../../utils/interfaces/projects-interface";
import { getProject } from "../../utils/services/rest";
import { Project } from "../../components/projects/project";

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  return (
    <>
      <Project {...project} />
    </>
  );
};

export default ProjectPage;

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async ({
  params: { slug },
}) => {
  try {
    console.log(`Building slug: ${slug}`);
    const project = await getProject(slug as string);
    if (project) {
      return {
        props: {
          project,
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
