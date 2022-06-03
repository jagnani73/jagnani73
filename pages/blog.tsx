import Script from "next/script";

import * as BlogComponents from "../components/blog";

const BlogPage = () => {
  return (
    <>
      <Script src="https://medium-widget.pixelpoint.io/widget.js" />
      <Script
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

      <BlogComponents.Blog />
    </>
  );
};

export default BlogPage;
