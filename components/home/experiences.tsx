import Link from "next/link";

import { ROUTES } from "../../utils/constants/shared-constants";
import { ExperiencesProps } from "../../utils/interfaces/shared-interfaces";
import { Experience } from "../shared";

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section className="section-container">
      <h1>Work Experience</h1>
      <h3>Some random line for spacing</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-10/12 mx-auto mt-20">
        {experiences?.map((experience) => (
          <div key={experience._id} className="w-full lg:w-10/12 mb-12 mx-auto">
            <Experience primary {...experience} />
          </div>
        ))}
      </div>

      <p className="text-right lg:mt-8 lg:text-2xl">
        A line here for{" "}
        <Link href={ROUTES.EXPERIENCES}>
          <a className="font-bold">all work ex</a>
        </Link>{" "}
        redirect
      </p>
    </section>
  );
};

export default Experiences;
