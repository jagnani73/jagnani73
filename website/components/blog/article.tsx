import { useEffect } from "react";

import type { ArticleProps } from "../../utils/interfaces/blog-interfaces";
import { monthParser } from "../../utils/functions";

const Article: React.FC<ArticleProps> = ({
  title,
  author,
  pubDate,
  content,
  categories,
}) => {
  useEffect(() => {
    const medium_image = document.getElementsByClassName("medium-feed-image");
    const medium_snippet = document.getElementsByClassName(
      "medium-feed-snippet"
    );
    const medium_link = document.getElementsByClassName("medium-feed-link");

    for (var i = 0; i < medium_image.length; i++) {
      medium_image[i].children[0].children[0].classList.add("mx-auto");
      medium_image[i].children[0].children[0].classList.add("w-full");
      medium_image[i].children[0].children[0].classList.add("mb-4");
      medium_image[i].children[0].children[0].setAttribute(
        "alt",
        `${title} by ${author}`
      );

      medium_snippet[i].classList.add("text-xl");
      medium_snippet[i].classList.add("font-semibold");
      medium_snippet[i].classList.add("lg:text-2xl");

      medium_link[i].children[0].classList.add("hidden");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="mb-12">
      <div dangerouslySetInnerHTML={{ __html: content }} />

      <div className="flex flex-col lg:flex-row justify-between capitalize mt-2">
        <p>{categories.join(", ")}</p>

        <p className="tag mt-2">
          {monthParser(new Date(pubDate).getUTCMonth())},{" "}
          {new Date(pubDate).getFullYear()}
        </p>
      </div>
    </article>
  );
};

export default Article;
