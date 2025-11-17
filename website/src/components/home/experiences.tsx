import Link from "next/link";
import { ROUTES } from "@/utils/constants/shared-constants";
import { Experience } from "@/components/shared";
import type { ExperiencesProps } from "@/utils/types/experiences.types";

export const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Experiences</h1>
      <h3>His source of knowledge, besides the internet</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Some people learn by doing, and some understand and then do. Finding
        himself being the amalgamation of the two, Yashvardhan believes in
        knowing just enough so that it is practicable. Besides, nothing can be
        perfect in the computing world for long. A problem-based implementation
        is a masterclass for learning by doing; his experiences were his
        greatest mentors. Since gaining knowledge about software development, He
        always tries his best to be a part of a new experience.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 mt-8 lg:mt-20">
        {experiences?.map((experience) => (
          <div key={experience.org} className="w-full mb-12 last:mb-0">
            <Experience primary={true} experience={experience} />
          </div>
        ))}
      </div>

      <Link
        href={ROUTES.EXPERIENCES}
        className="mt-8 text-xl lg:text-2xl block w-fit lg:ml-auto"
      >
        See all of his <span className="font-bold">experiences</span>
      </Link>
    </section>
  );
};
