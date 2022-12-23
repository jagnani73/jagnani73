import type { CertificationProps } from "../../../utils/interfaces/home-interfaces";

const Certification: React.FC<CertificationProps> = (certification) => {
  return (
    <article>
      <h4 className="font-semibold">{certification.name}</h4>

      <h6 className="mt-2">{certification.organization}</h6>

      <p className="text-sm">({certification.validity})</p>
    </article>
  );
};

export default Certification;
