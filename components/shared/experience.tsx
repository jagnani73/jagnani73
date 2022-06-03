import { ExperienceProp } from "../../utils/interfaces/shared-interfaces";

const Experience: React.FC<ExperienceProp> = ({ primary, ...experience }) => {
  return (
    <article>
      <img src={experience.logo} alt={experience.org} className="w-24" />

      <h5 className="mt-2 flex justify-between items-center">
        {experience.url ? (
          <a href={experience.url} target="_blank" rel="noopener noreferrer">
            {experience.org}
          </a>
        ) : (
          experience.org
        )}

        {!primary && <span className="tag">{experience.tag}</span>}
      </h5>

      <h6 className="font-bold flex justify-between mt-1">
        {experience.designation}
        {!primary && (
          <span className="text-base font-normal">{experience.duration}</span>
        )}
      </h6>

      {!primary && <p className="mt-2">{experience.description}</p>}
    </article>
  );
};

export default Experience;
