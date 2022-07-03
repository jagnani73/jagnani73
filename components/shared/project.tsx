import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { toTitleCase } from "../../utils/functions";
import { ProjectProps } from "../../utils/interfaces/shared-interfaces";
import { StackIcon, LinkIcon } from "./";

const Project: React.FC<ProjectProps> = ({ primary, ...project }) => {
  const images = [project.preview, ...(project.images ? project.images : [])];

  return (
    <article>
      {images.length > 1 && !primary ? (
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showStatus={false}
          showArrows={false}
          swipeable
          emulateTouch
        >
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt={project.name}
              className="w-full"
            />
          ))}
        </Carousel>
      ) : (
        <img src={project.preview} alt={project.name} className="w-full" />
      )}

      <div className="flex flex-wrap items-center justify-between mt-4 w-full">
        <h3 className="flex items-center gap-x-4 font-bold mb-2">
          {project.name}
          <span className="tag">{project.tag}</span>
        </h3>

        <div className="flex gap-x-4">
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
            Built using:
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
