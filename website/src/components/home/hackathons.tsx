import type { HackathonsProps } from "@/utils/types/home.types";
import Link from "next/link";
import { ROUTES } from "@/utils/constants/shared-constants";

export const Hackathons: React.FC<HackathonsProps> = ({ hackathons }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Hackathons</h1>
      <h3>Pursuit of perfection</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Yashvardhan believes hackathons provide an ideal ground for learning as
        well as development. Hackathons are a place where you can learn more
        about the technology while implementing it for a problem statement, as
        well as contribute to Open Source Software. One logically competes in a
        competition that has nothing but benefits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-16 mt-8 lg:mt-20">
        {hackathons.map((hackathon) => (
          <article key={hackathon.name}>
            <h6 className="flex flex-wrap items-center">
              <span className="lg:text-xl mr-2">{hackathon.name}</span>
              <span className="text-xs font-bold bg-steel-blue w-fit px-2 py-1 rounded-sm text-center whitespace-nowrap">
                {hackathon.location}
              </span>
            </h6>

            <p>
              <span className="">{hackathon.organizer}</span>{" "}
              <span className="text-sm">({hackathon.duration})</span>
            </p>

            <h4 className="mt-2 font-semibold">{hackathon.award}</h4>

            {hackathon.award !== "Mentor" && hackathon.project && (
              <p className="text-sm md:text-base">
                hacking{" "}
                <Link
                  href={`${ROUTES.PROJECTS}/${hackathon.project.slug}`}
                  className="font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hackathon.project.name}
                </Link>
                .
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
