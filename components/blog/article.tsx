import { useEffect } from "react";

import { monthParser } from "../../utils/functions";
import { ArticleProps } from "../../utils/interfaces/blog-interfaces";

const Article: React.FC<ArticleProps> = ({
  title,
  author,
  pubDate,
  content,
  categories,
}) => {
  useEffect(() => {
    const medium_image =
      document.getElementsByClassName("medium-feed-image")[0];
    const medium_snippet = document.getElementsByClassName(
      "medium-feed-snippet"
    )[0];
    const medium_link = document.getElementsByClassName("medium-feed-link")[0];

    medium_image.children[0].children[0].setAttribute(
      "alt",
      `${title} by ${author}`
    );
    medium_image.children[0].children[0].classList.add("mx-auto");
    medium_image.children[0].children[0].classList.add("w-full");
    medium_image.children[0].children[0].classList.add("mb-4");
    medium_snippet.classList.add("text-2xl");
    medium_link.children[0].classList.add("hidden");
  }, []);

  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />

      <div className="flex justify-between capitalize mt-2">
        <p className="">{categories.join(", ")}</p>

        <p className="tag">
          {monthParser(new Date(pubDate).getUTCMonth())},{" "}
          {new Date(pubDate).getFullYear()}
        </p>
      </div>
    </article>
  );
};

export default Article;
