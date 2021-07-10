import { useEffect, useState } from "react";

const Blog = () => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      var widget = document.getElementById("medium-widget");
      if (!!widget) window["getBlog"]();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }, []);

  return (
    <section>
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

      <div id="medium-widget" />

      {error && (
        <div className="mt-40 text-center text-middle-red font-bold">
          <h5>Error fetching blog details!</h5>
        </div>
      )}
    </section>
  );
};

export default Blog;
