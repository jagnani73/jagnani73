import { ProjectProps } from "../../utils/interfaces";

interface ProjectProp extends ProjectProps {
  primary: boolean;
}

const Project = ({ primary, ...project }: ProjectProp) => {
  return (
    <article>
      <img src={project.preview} alt={project.name} className="w-full" />

      <div className="flex justify-between">
        <h4 className="font-bold mt-2">
          {project.name}
          {<span className="text-xs font-bold">{project.tag}</span>}
        </h4>

        <div>
          {primary
            ? project.stack.map((tech) => <span>{tech}</span>)
            : project.links.map((link) => (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              ))}
        </div>
      </div>

      {!primary && (
        <>
          <p>{project.description}</p>

          <div>
            Built using:{" "}
            {project.stack.map((tech) => (
              <span>{tech}</span>
            ))}
          </div>
        </>
      )}
    </article>
  );
};

export default Project;
