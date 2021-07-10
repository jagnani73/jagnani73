import { ExperienceProps } from "../../utils/interfaces";

interface ExperienceProp extends ExperienceProps {
  primary: boolean;
}

const Experience = ({ primary, ...experience }: ExperienceProp) => {
  return (
    <article>
      <img src={experience.logo} alt={experience.org} className="w-24" />

      <h5 className="mt-2">{experience.org}</h5>
      {!primary && <span>{experience.tag}</span>}

      <h6 className="font-bold">
        {experience.designation}
        {!primary && <span>{experience.duration}</span>}
      </h6>

      {!primary && <p>{experience.description}</p>}
    </article>
  );
};

export default Experience;
