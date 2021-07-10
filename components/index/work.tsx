import Link from "next/link";

import { Experience } from "../shared";
import { experiences } from "../../utils/constants";

const Work = () => {
  return (
    <section>
      <h1>Work Experience</h1>
      <h3>Some random line for spacing</h3>

      <p className="w-11/12 mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <div className="grid grid-cols-3 mt-20">
        {experiences.slice(0, 3).map((experience) => (
          <div className="w-10/12 mx-auto">
            <Experience primary {...experience} />
          </div>
        ))}
      </div>

      <p className="text-right mt-8 text-2xl">
        A line here for{" "}
        <Link href="/work-experience">
          <a target="_blank" rel="noopener noreferrer" className="font-bold">
            all work ex
          </a>
        </Link>{" "}
        redirect
      </p>
    </section>
  );
};

export default Work;
