import type { ExperiencesProps } from "@/utils/types/experiences.types";
import { Experience } from "@/components/shared";

export const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-28 lg:mt-48">
      <h1>Experiences</h1>
      <h3>Where the real learning happens</h3>

      <p className="w-full lg:w-11/12 mt-10">
        I learn by doing. Understanding the theory helps, but nothing beats
        shipping code and dealing with the consequences. Each role taught me
        something different, whether it was building infrastructure, managing
        open-source projects, or figuring out how to debug production issues at
        2 AM. The best lessons came from working with people who knew more than
        I did.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8">
        {experiences?.map((experience) => (
          <div key={experience.org} className="mx-auto mt-10">
            <Experience primary={false} experience={experience} />
          </div>
        ))}
      </div>
    </section>
  );
};
