import Link from "next/link";
import { ROUTES } from "@/utils/constants/shared-constants";
import { Experience } from "@/components/shared";
import type { ExperiencesProps } from "@/utils/types/experiences.types";

export const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Experiences</h1>
      <h3>Where the real learning happens</h3>

      <p className="lg:w-11/12 mt-10">
        I believe in balancing theory with practice, understanding enough to
        make things work, then learning by doing. Real-world problems are the
        best teachers, and each project has taught me something new. Software
        development is constantly evolving, so I focus on practical knowledge
        that I can apply immediately. These experiences have shaped my approach
        to building solutions.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 mt-8">
        {experiences?.map((experience) => (
          <div key={experience.org} className="w-full mb-12 last:mb-0">
            <Experience primary={true} experience={experience} />
          </div>
        ))}
      </div>

      <Link
        href={ROUTES.EXPERIENCES}
        className="mt-8 text-xl lg:text-2xl block w-fit lg:ml-auto link-hover"
      >
        See all my <span className="font-bold">experiences</span>
      </Link>
    </section>
  );
};
