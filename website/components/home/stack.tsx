import Marquee from "react-easy-marquee";

import { STACK } from "../../utils/constants/home-constants";

const Stack: React.FC = () => {
  return (
    <section className="section-container">
      <h1>Stack</h1>
      <h3>Social skills separate</h3>
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

      <a
        href="https://www.npmjs.com/package/react-easy-marquee"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 lg:text-2xl block w-fit lg:ml-auto"
      >
        Checkout this <span className="font-bold">marquee</span> built by him!
      </a>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        These are the technologies with which he has an expertise that ranges
        from intermediate to advanced. He consistently tries to understand new
        technologies and aims at mastering them.
      </p>
    </section>
  );
};

export default Stack;
