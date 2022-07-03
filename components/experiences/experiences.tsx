import { ExperiencesProps } from "../../utils/interfaces/shared-interfaces";
import { Experience } from "../shared";

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section className="section-container mt-48">
      <h1>Experiences</h1>
      <h3>His source of knowledge, besides the internet</h3>

      <p className="w-full lg:w-11/12 mt-10 lg:mt-20">
        Some people learn by doing, and some who understand and then do. He
        finds myself being the amalgamation of the two. Hes in knowing just
        enough so that he can do it. The journey of building (under great
        mentors) is the hitpoint for learning by doing. Since gaining knowledge
        about software development, He always tries his best to be a part of a
        new experience.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8">
        {experiences?.map((experience) => (
          <div key={experience._id} className="mx-auto mt-10 lg:mt-20">
            <Experience primary={false} {...experience} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
