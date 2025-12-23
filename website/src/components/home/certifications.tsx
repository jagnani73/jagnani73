import type { CertificationsProps } from "@/utils/types/home.types";

export const Certifications: React.FC<CertificationsProps> = ({
  certifications,
}) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Certifications</h1>
      <h3>Continuous learning</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-16 mt-8">
        {certifications.map((certification) => (
          <article key={certification.name}>
            <h4 className="font-semibold">{certification.name}</h4>

            <h6 className="mt-2">{certification.organization}</h6>

            <p className="text-sm">{certification.validity}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
