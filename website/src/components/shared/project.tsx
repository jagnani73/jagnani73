"use client";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import type { ProjectProps } from "@/utils/types/projects.types";
import { toTitleCase } from "@/utils/functions";
import { StackIcon, LinkIcon } from ".";
import Link from "next/link";

export const Project: React.FC<ProjectProps> = ({ primary, project }) => {
  const images = [project.preview, ...(project.images || [])];

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
            <Image
              key={image}
              src={image}
              alt={project.name}
              width={800}
              height={600}
              className="w-full"
            />
          ))}
        </Carousel>
      ) : (
        <Image
          src={project.preview}
          alt={project.name}
          width={800}
          height={600}
          className="w-full"
        />
      )}

      <div className="flex flex-wrap items-center justify-between mt-4 w-full">
        <h3 className="flex flex-wrap items-center gap-x-4 font-bold mb-2">
          {project.name}
          <span className="text-xs font-bold bg-steel-blue w-fit px-2 py-1 rounded-sm text-center">
            {project.tag}
          </span>
        </h3>

        <div className="flex gap-x-4">
          {project.links?.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={toTitleCase(name)}
              className="w-6 md:w-8 lg:w-10 flex"
            >
              <LinkIcon name={name} />
            </Link>
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
