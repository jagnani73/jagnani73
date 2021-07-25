import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetStaticPathsResult,
} from "next";

import { ProjectProps } from "../../utils/interfaces";
import { getProjectsSlugs, getProject } from "../../services/rest";
import * as ProjectComponents from "../../components/projects/project";

interface ProjectPageProps {
  project: ProjectProps;
}

const ProjectPage = ({ project }: ProjectPageProps) => {
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
