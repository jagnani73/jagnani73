import { Experience } from "../shared";
import { experiences } from "../../utils/constants";

const Experiences = () => {
  return (
    <section className="section-container">
      <h1>Work</h1>
      <h3>Some random line for spacing</h3>

      <p className="w-11/12 mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <div className="grid grid-cols-3">
        {experiences.map((experience) => (
          <div className="w-10/12 mx-auto mt-20">
            <Experience primary={false} {...experience} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
