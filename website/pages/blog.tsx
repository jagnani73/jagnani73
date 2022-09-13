import { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import { Blog } from "../components/blog";
import { getBlogs } from "../utils/services/rest";
import { BlogPageProps } from "../utils/interfaces/blog-interfaces";

const BlogPage: NextPage<BlogPageProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Blog | Yashvardhan Jagnani</title>
      </Head>

      <Blog articles={articles} />
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  try {
    const articles = await getBlogs();
    if (articles) {
      return {
        revalidate: 1 * 60 * 60 * 24 * 7 * 4,
        props: {
          articles,
        },
      };
    } else {
      return {
        revalidate: 1 * 60 * 60 * 24,
        notFound: true,
      };
    }
  } catch (error) {
    return {
      redirect: {
        revalidate: 1 * 60 * 60 * 24,
        permanent: false,
        destination: "/500",
      },
    };
  }
};
