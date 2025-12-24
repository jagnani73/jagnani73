"use client";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import type { ProjectProps } from "@/utils/types/projects.types";
import { toTitleCase } from "@/utils/functions";
import { StackIcon, LinkIcon } from ".";

export const Project: React.FC<ProjectProps> = ({ primary, project }) => {
  const images = [project.preview, ...(project.images || [])];

  return (
    <article className="flex flex-col h-full">
      <div className="w-full aspect-video relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {images.length > 1 && !primary ? (
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            swipeable
            emulateTouch
            className="h-full"
          >
            {images.map((image) => (
              <div key={image} className="h-full">
                <Image
                  src={image}
                  alt={project.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-contain object-center"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Image
            src={project.preview}
            alt={project.name}
            width={800}
            height={600}
            className="w-full h-full object-contain object-center"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between mt-4 w-full">
        <h3 className="flex flex-wrap items-center gap-x-4 font-bold mb-2">
          {project.name}
          <span className="text-xs font-bold bg-steel-blue w-fit px-2 py-1 rounded-sm text-center">
            {project.tag}
          </span>
        </h3>

        <div className="flex gap-x-4">
          {project.links?.map(({ name, url }) => (
            <div
              key={url}
              role="link"
              tabIndex={0}
              title={toTitleCase(name)}
              className="w-6 md:w-8 lg:w-10 flex cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(url, "_blank", "noopener,noreferrer");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <LinkIcon name={name} />
            </div>
          ))}
        </div>
      </div>

      {!primary && (
        <div className="flex flex-col grow">
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
        </div>
      )}
    </article>
  );
};

export default Project;
