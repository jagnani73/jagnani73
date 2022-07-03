import Link from "next/link";

import { ProjectsProps } from "../../utils/interfaces/shared-interfaces";
import { Project } from "../shared";
import { ROUTES } from "../../utils/constants/shared-constants";

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section-container mt-48">
      <h1>My Projects</h1>
      <h3>Some random line for spacing</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
        {projects.map((project) => (
          <Link key={project._id} href={`${ROUTES.PROJECTS}/${project.slug}`}>
            <a className="md:w-10/12 mx-auto mt-10 md:mt-20">
              <Project primary {...project} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
