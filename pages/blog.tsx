import Head from "next/head";

import * as BlogComponents from "../components/blog";

const BlogPage = () => {
  return (
    <>
      <Head>
        <script src="https://medium-widget.pixelpoint.io/widget.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `function getBlog() {
                      MediumWidget.Init({
                        renderTo: '#medium-widget', params: {
                          "resource":"https://medium.com/@jagnani73", "postsPerLine":5, "limit":10, "picture":"big", "fields":["description","publishAt"], "ratio":"landscape"
                        }
                      });
                    }`,
          }}
        />
      </Head>
      <BlogComponents.Blog />
    </>
  );
};

export default BlogPage;
