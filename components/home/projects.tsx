import Link from "next/link";

import { ROUTES } from "../../utils/constants/shared-constants";
import { ProjectsProps } from "../../utils/interfaces/shared-interfaces";
import { Project } from "../shared";

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section-container">
      <h1>Projects</h1>
      <h3>A showcase for ideas</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-20">
        <div className="mx-auto grid grid-rows-2 h-fit-content">
          {projects?.slice(0, 2).map((project) => (
            <Link key={project._id} href={`${ROUTES.PROJECTS}/${project.slug}`}>
              <a className="w-10/12 mx-auto mt-10 lg:mt-20">
                <Project primary {...project} />
              </a>
            </Link>
          ))}
        </div>

        <div className="mx-auto grid grid-rows-2 h-fit-content lg:-mt-52">
          {projects?.slice(2, 4).map((project) => (
            <Link key={project._id} href={`${ROUTES.PROJECTS}/${project.slug}`}>
              <a className="w-10/12 mx-auto mt-20">
                <Project primary {...project} />
              </a>
            </Link>
          ))}
        </div>
      </div>

      <Link href={ROUTES.PROJECTS}>
        <a className="mt-8 text-xl lg:text-2xl block w-fit lg:ml-auto">
          See all of his <span className="font-bold">projects</span>
        </a>
      </Link>
    </section>
  );
};

export default Projects;
