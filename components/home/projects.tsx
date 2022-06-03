import Link from "next/link";

import { ROUTES } from "../../utils/constants/shared-constants";
import { ProjectsProps } from "../../utils/interfaces/shared-interfaces";
import { Project } from "../shared";

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section-container">
      <h1>Projects</h1>
      <h3>Some random line for spacing</h3>

      <div className="grid grid-cols-2 mt-20">
        <div className="mx-auto grid grid-rows-2 h-fit-content">
          {projects?.slice(0, 2).map((project) => (
            <Link key={project._id} href={`${ROUTES.PROJECTS}/${project.slug}`}>
              <a className="w-10/12 mx-auto mt-20">
                <Project primary {...project} />
              </a>
            </Link>
          ))}
        </div>

        <div className="mx-auto grid grid-rows-2 h-fit-content -mt-52">
          {projects?.slice(2, 4).map((project) => (
            <Link key={project._id} href={`${ROUTES.PROJECTS}/${project.slug}`}>
              <a className="w-10/12 mx-auto mt-20">
                <Project primary {...project} />
              </a>
            </Link>
          ))}
          <p className="w-10/12 mx-auto text-2xl text-right mt-32">
            A line here for{" "}
            <Link href={ROUTES.PROJECTS}>
              <a className="font-bold">all projects</a>
            </Link>{" "}
            redirect
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
