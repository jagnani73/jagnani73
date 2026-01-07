"use client";

import Marquee from "react-easy-marquee";

import { STACK } from "@/utils/constants/home-constants";
import Link from "next/link";

export const Stack: React.FC = () => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Stack</h1>
      <h3>Tools of the trade</h3>
      <Marquee
        duration={50 * 500}
        height="150px"
        pauseOnHover
        className="mt-10 transform-gpu"
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

      <Link
        href="https://www.npmjs.com/package/react-easy-marquee"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 lg:text-2xl block w-fit lg:ml-auto link-hover"
      >
        The <span className="font-bold">marquee</span> above is something I
        built
      </Link>

      <p className="lg:w-11/12 mt-10">
        Tools I use regularly. Some I know well, others I&apos;m still figuring
        out. I work with both traditional web stacks and blockchain tooling, the
        space moves fast, so I pick up new things as projects demand them. Most
        of what I know came from needing to solve a specific problem, not from
        tutorials.
      </p>
    </section>
  );
};
