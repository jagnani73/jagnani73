import Marquee from "react-easy-marquee";

import { STACK } from "../../utils/constants/home-constants";

const Stack: React.FC = () => {
  return (
    <section className="section-container" id="stack">
      <h1>Stack</h1>
      <h3>Some random line for spacing</h3>

      <Marquee
        duration={50 * 500}
        height="150px"
        pauseOnHover
        className="mt-10 lg:mt-20 transform-gpu"
        reverse
      >
        <div className="flex transform-gpu">
          {STACK.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-stretch text-center mx-10"
            >
              <figure className="w-16 lg:w-24 mt-auto mx-auto">
                {tech.logo}
              </figure>

              <p className="uppercase font-extrabold text-xs mt-auto pt-4">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </Marquee>

      <p className="text-right mt-8">
        A line here for{" "}
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          marquee
        </a>{" "}
        redirect
      </p>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
    </section>
  );
};

export default Stack;
