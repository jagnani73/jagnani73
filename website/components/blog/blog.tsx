import type { BlogProps } from "../../utils/interfaces/blog-interfaces";
import { Article } from ".";

const Blog: React.FC<BlogProps> = ({ articles }) => {
  return (
    <section className="section-container mt-28 lg:mt-48">
      <h1>Blog</h1>
      <h3>Quality over quantity</h3>

      <p className="lg:w-11/12 mt-10 md:mt-20">
        I have always tried to contribute to the community that has helped me so
        much. Writing blogs has always been about giving back, and helping
        others.
      </p>

      <div className="grid grid-cols-1 max-w-7xl mx-auto mt-16">
        {articles.map((article) => (
          <Article key={article.pubDate} {...article} />
        ))}
      </div>
    </section>
  );
};

export default Blog;
