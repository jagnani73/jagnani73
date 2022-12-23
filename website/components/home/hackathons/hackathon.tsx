import Link from "next/link";

import type { HackathonProps } from "../../../utils/interfaces/home-interfaces";
import { ROUTES } from "../../../utils/constants/shared-constants";

const Hackathon: React.FC<HackathonProps> = (hackathon) => {
  return (
    <article>
      <h6 className="flex flex-wrap items-center">
        <span className="lg:text-xl mr-2">{hackathon.name}</span>
        <span className="tag whitespace-nowrap">{hackathon.location}</span>
      </h6>

      <p>
        <span className="">{hackathon.organizer}</span>{" "}
        <span className="text-sm">({hackathon.duration})</span>
      </p>

      <h4 className="mt-2 font-semibold">{hackathon.award}</h4>

      {hackathon.award !== "Mentor" && hackathon.project && (
        <p className="text-sm md:text-base">
          hacking{" "}
          <Link href={`${ROUTES.PROJECTS}/${hackathon.project.slug}`}>
            <a
              className="font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {hackathon.project.name}
            </a>
          </Link>
          .
        </p>
      )}
    </article>
  );
};

export default Hackathon;
