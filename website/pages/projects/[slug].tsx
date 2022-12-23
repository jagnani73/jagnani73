import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";

import type { ProjectPageProps } from "../../utils/interfaces/projects-interface";
import type { ProjectType } from "../../api/projects/projects.schema";
import { Project } from "../../components/projects/project";
import { getDb } from "../../api/services/mongodb.service";

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  return (
    <>
      <Project {...project} />
    </>
  );
};

export default ProjectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: { slug: string }[] = JSON.parse(
    JSON.stringify(
      (
        await (await getDb())
          .collection("projects")
          .find<ProjectType>({}, {})
          .project({ slug: 1, _id: 0 })
          .toArray()
      ).reverse()
    )
  );

  const paths: { params: ParsedUrlQuery }[] = [];
  slugs.forEach((slug) => paths.push({ params: slug }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({
  params: { slug },
}) => {
  try {
    const project = JSON.parse(
      JSON.stringify(
        await (await getDb())
          .collection("projects")
          .findOne<ProjectType>({ slug })
      )
    );

    if (project) {
      return {
        props: {
          project,
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
