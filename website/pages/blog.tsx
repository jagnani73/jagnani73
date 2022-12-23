import { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import type { BlogPageProps } from "../utils/interfaces/blog-interfaces";
import { Blog } from "../components/blog";

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
    const { items: articles } = await (
      await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jagnani73"
      )
    ).json();

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
