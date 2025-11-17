import type { CertificationsProps } from "../../../utils/interfaces/home-interfaces";
import Certification from "./certification";

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Certifications</h1>
      <h3>Measure of calibre</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-16 mt-8 lg:mt-20">
        {certifications.map((certification) => (
          <Certification key={certification._id} {...certification} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;

