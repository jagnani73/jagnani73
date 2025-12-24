"use client";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import type { ProjectProps } from "@/utils/types/projects.types";
import { toTitleCase } from "@/utils/functions";
import { StackIcon, LinkIcon } from ".";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants/shared-constants";
import Link from "next/link";

export const Project: React.FC<ProjectProps> = ({ primary, project }) => {
  const images = [project.preview, ...(project.images || [])];
  const pathname = usePathname();
  const isProjectPage = pathname.includes(project.slug);

  return (
    <article className="flex flex-col w-full">
      <div className="w-full h-full">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showStatus={false}
          showThumbs={false}
          showArrows={true}
          swipeable
          className="w-full h-full"
        >
          {(primary ? [images[0]] : images).map((image) => (
            <figure
              key={image}
              className={`w-full relative h-40 md:h-96 ${
                !isProjectPage ? "xl:h-md" : "xl:h-2xl"
              }`}
            >
              <Image
                src={image}
                alt={project.name}
                fill
                className="object-contain object-center"
              />
            </figure>
          ))}
        </Carousel>
      </div>

      <div className="flex flex-wrap items-center justify-between mt-4 w-full">
        <Link key={project.slug} href={`${ROUTES.PROJECTS}/${project.slug}`}>
          <h3 className="flex flex-wrap items-center gap-x-4 font-bold mb-2">
            <span className="link-hover">{project.name}</span>
            <span className="text-xs font-bold bg-steel-blue w-fit px-2 py-1 rounded-sm text-center">
              {project.tag}
            </span>
          </h3>
        </Link>

        <div className="flex gap-x-4">
          {project.links?.map(({ name, url }) => (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              key={url}
              tabIndex={0}
              title={toTitleCase(name)}
              className="w-6 md:w-8 lg:w-10 flex cursor-pointer"
            >
              <LinkIcon name={name} />
            </Link>
          ))}
        </div>
      </div>

      {!primary && (
        <div className="flex flex-col grow">
          <p
            className={`mt-8 text-justify ${
              !isProjectPage ? "line-clamp-3" : ""
            }`}
          >
            {project.description}
          </p>

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
