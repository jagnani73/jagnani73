import { NextPage } from "next";
import Script from "next/script";

import { Blog } from "../components/blog";

const BlogPage: NextPage = () => {
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

      <Blog />
    </>
  );
};

export default BlogPage;
