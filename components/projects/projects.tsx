import { SearchIcon } from "../../utils/icons";
import { Project } from "../shared";
import { projects } from "../../utils/constants";

const Projects = () => {
  return (
    <section>
      <h1>My Projects</h1>
      <h3>Some random line for spacing</h3>

      <p className="w-11/12 mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative text-lg mt-20 w-4/12"
      >
        <input
          type="text"
          placeholder="Filter here related text"
          className="w-full pl-12 pr-4 py-4 bg-transparent border-b-2"
        />
        <span className="absolute top-0 bottom-0 left-0 w-8 z-10">
          <SearchIcon />
        </span>
      </form>

      <div className="grid grid-cols-2">
        {projects.map((experience) => (
          <div className="w-10/12 mx-auto mt-20">
            <Project primary {...experience} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
