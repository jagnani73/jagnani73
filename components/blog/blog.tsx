import { BlogProps } from "../../utils/interfaces/blog-interfaces";
import { Article } from ".";

const Blog: React.FC<BlogProps> = ({ articles }) => {
  return (
    <section className="section-container">
      <h1>Blog</h1>
      <h3>Some random line for spacing</h3>

      <p className="w-11/12 mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
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
