import Link from "next/link";

import { ROUTES } from "../../utils/constants/shared-constants";
import { ExperiencesProps } from "../../utils/interfaces/shared-interfaces";
import { Experience } from "../shared";

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section className="section-container">
      <h1>Experiences</h1>
      <h3>His source of knowledge, besides the internet</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Some people learn by doing, and some who understand and then do. He
        finds myself being the amalgamation of the two. Hes in knowing just
        enough so that he can do it. The journey of building (under great
        mentors) is the hitpoint for learning by doing. Since gaining knowledge
        about software development, He always tries his best to be a part of a
        new experience.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 mt-20">
        {experiences?.map((experience) => (
          <div key={experience._id} className="w-full mb-12">
            <Experience primary {...experience} />
          </div>
        ))}
      </div>

      <Link href={ROUTES.EXPERIENCES}>
        <a className="text-right lg:mt-8 lg:text-2xl block w-fit ml-auto">
          See all of his <span className="font-bold">experiences</span>
        </a>
      </Link>
    </section>
  );
};

export default Experiences;
