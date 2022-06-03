import { NextPage, GetStaticPropsResult } from "next";

import { Blog } from "../components/blog";
import { getBlogs } from "../utils/services/rest";
import { BlogPageProps } from "../utils/interfaces/blog-interfaces";

const BlogPage: NextPage<BlogPageProps> = ({ articles }) => {
  return (
    <>
      <Blog articles={articles} />
    </>
  );
};

export default BlogPage;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogPageProps>
> => {
  try {
    const articles = await getBlogs();
    if (articles) {
      return {
        props: {
          articles,
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
