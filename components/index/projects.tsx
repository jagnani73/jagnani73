import Link from "next/link";

import { Project } from "../shared";
import { projects } from "../../utils/constants";

const Projects = () => {
  return (
    <section>
      <h1>Projects</h1>
      <h3>Some random line for spacing</h3>

      <div className="grid grid-cols-2 mt-20">
        <div className="mx-auto grid grid-rows-2 h-fit-content">
          {projects.slice(0, 2).map((experience) => (
            <div className="w-10/12 mx-auto mt-20">
              <Project primary {...experience} />
            </div>
          ))}
        </div>

        <div className="mx-auto grid grid-rows-2 h-fit-content -mt-52">
          {projects.slice(2, 4).map((experience) => (
            <div className="w-10/12 mx-auto mt-20">
              <Project primary {...experience} />
            </div>
          ))}
          <p className="w-10/12 mx-auto text-2xl text-right mt-32">
            A line here for{" "}
            <Link href="/work-experience">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold"
              >
                all projects
              </a>
            </Link>{" "}
            redirect
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
