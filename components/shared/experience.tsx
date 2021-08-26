import { ExperienceProps } from "../../utils/interfaces";

interface ExperienceProp extends ExperienceProps {
  primary: boolean;
}

const Experience = ({ primary, ...experience }: ExperienceProp) => {
  return (
    <article>
      <img src={experience.logo} alt={experience.org} className="w-24" />

      <h5 className="mt-2 flex items-center">
        {experience.url ? (
          <a href={experience.url} target="_blank" rel="noopener noreferrer">
            {experience.org}
          </a>
        ) : (
          experience.org
        )}

        {!primary && <span className="tag ml-4">{experience.tag}</span>}
      </h5>

      <h6 className="font-bold flex justify-between">
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
