import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetStaticPathsResult,
} from "next";

import { ProjectPageProps } from "../../utils/interfaces/projects-interface";
import { getProjectsSlugs, getProject } from "../../utils/services/rest";
import * as ProjectComponents from "../../components/projects/project";

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  return (
    <>
      <ProjectComponents.Project {...project} />
    </>
  );
};

export default ProjectPage;

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  try {
    const slugs = await getProjectsSlugs();

    if (slugs) {
      const paths = slugs.map((slug) => ({
        params: { slug },
      }));
      return { paths, fallback: "blocking" };
    } else {
      return { paths: [], fallback: "blocking" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async (
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<ProjectPageProps>> => {
  try {
    const { slug } = ctx.params;
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
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
};
