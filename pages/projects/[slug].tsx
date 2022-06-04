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
    // const slugs = await getProjectsSlugs();
    const slugs = ["gcsrm"];

    if (slugs) {
      const paths = slugs.map((slug) => ({
        params: { slug },
      }));
      console.log(paths);

      return { paths, fallback: false };
    } else {
      return { paths: [], fallback: false };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({
  params: { slug },
}: GetStaticPropsContext): Promise<GetStaticPropsResult<ProjectPageProps>> => {
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
    return {
      notFound: true,
    };
  }
};
