import { toTitleCase } from "../../utils/functions";
import { ProjectProp } from "../../utils/interfaces/shared-interfaces";
import { StackIcon, LinkIcon } from "./";

const Project: React.FC<ProjectProp> = ({ primary, ...project }) => {
  return (
    <article>
      <img src={project.preview} alt={project.name} className="w-full" />

      <div className="flex items-center justify-between mt-4 w-full">
        <h3 className="flex items-center gap-x-4 font-bold w-full">
          {project.name}
          <span className="tag">{project.tag}</span>
        </h3>

        <div>
          {project.links?.map(({ name, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={toTitleCase(name)}
              className="w-6 md:w-8 lg:w-10 flex"
            >
              <LinkIcon name={name} />
            </a>
          ))}
        </div>
      </div>

      {!primary && (
        <>
          <p className="mt-8 text-justify">{project.description}</p>

          <div className="flex mt-8 items-center gap-x-6 text-xl">
            Built using:{" "}
            <div className="flex items-center gap-x-6">
              {project.stack?.map((tech) => (
                <span key={tech} className="w-12" title={toTitleCase(tech)}>
                  <StackIcon name={tech} />
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default Project;
