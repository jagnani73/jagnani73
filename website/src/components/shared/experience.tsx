import Image from "next/image";
import type { ExperienceProps } from "@/utils/types/experiences.types";

export const Experience: React.FC<ExperienceProps> = ({
  primary,
  experience,
}) => {
  return (
    <article>
      <Image
        src={experience.logo}
        alt={experience.org}
        width={96}
        height={96}
        className="w-16 lg:w-24"
      />

      <h5 className="mt-2 flex justify-between flex-wrap items-center">
        {experience.url ? (
          <a href={experience.url} target="_blank" rel="noopener noreferrer">
            {experience.org}
          </a>
        ) : (
          <span>{experience.org}</span>
        )}

        {!primary && (
          <span className="text-xs font-bold bg-steel-blue w-fit px-2 py-1 rounded-sm text-center whitespace-nowrap">
            {experience.tag}
          </span>
        )}
      </h5>

      <h6 className="font-bold flex flex-col lg:flex-row flex-wrap gap-x-1 items-start justify-between mt-1">
        <span className="whitespace-nowrap">{experience.designation}</span>
        {!primary && (
          <span className="text-base font-normal whitespace-nowrap">
            {experience.duration}
          </span>
        )}
      </h6>

      {!primary && <p className="mt-2">{experience.description}</p>}
    </article>
  );
};
