import { useState } from "react";

import { ResumesProps } from "../../utils/interfaces/home-interfaces";

const Resumes: React.FC<ResumesProps> = ({ resumes }) => {
  const [activeResume, setActiveResume] = useState<number>(0);

  return (
    <section className="section-container">
      <h1>Resumes</h1>
      <h3>Speak for themselves</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Click on the preview image to check it out!
      </p>

      <header className="bg-jet flex items-center gap-x-16 justify-between p-4 my-8 overflow-auto">
        {resumes.map(({ date }, i) => (
          <button
            key={date}
            onClick={() => setActiveResume(i)}
            className={`whitespace-nowrap ${
              activeResume === i ? " font-bold" : ""
            }`}
          >
            {date}
          </button>
        ))}
      </header>

      <a
        href={resumes[activeResume].resume}
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-5xl mx-auto aspect-video bg-yellow-50"
        style={{
          background: `linear-gradient(180deg, #232323a0 0%, #232323 95%), url(${resumes[activeResume].preview}) center / cover no-repeat`,
        }}
      />
    </section>
  );
};

export default Resumes;
