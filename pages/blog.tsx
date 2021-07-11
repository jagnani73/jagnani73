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

      {/* //* INFO: classes for purge-prevention */}
      <span className="hidden medium-widget medium-widget-article__row medium-widget-article__item medium-widget-article__column medium-widget-article__image medium-widget-article__content medium-widget-article__title medium-widget-article__info medium-widget-article__date" />
      <BlogComponents.Blog />
    </>
  );
};

export default BlogPage;
