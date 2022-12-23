import Link from "next/link";

import type { ProjectsProps } from "../../utils/interfaces/shared-interfaces";
import { Project } from "../shared";
import { ROUTES } from "../../utils/constants/shared-constants";

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section-container mt-28 lg:mt-48">
      <h1>Projects</h1>
      <h3>A showcase for ideas</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        A journey of all his creations. He has mentored and guided many projects
        during his term in the communities he has been a part of. Yashvardhan
        has laid the foundational code in many internships, including standard
        boilerplate and the developer contribution guide. He has been an avid
        contributor to the Open Source Community, participated in numerous
        hackathons and continues to do so. This page is a representation of his
        works. Every Line of Code of his is typed with passion regardless of the
        semicolon pain, following the best conventional practices he knew at the
        moment.
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
