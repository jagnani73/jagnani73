"use client";

import { useState } from "react";

import type { ResumesProps } from "@/utils/types/home.types";

export const Resumes: React.FC<ResumesProps> = ({ resumes }) => {
  const [activeResume, setActiveResume] = useState<number>(0);

  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>Resumes</h1>
      <h3>Speak for themselves</h3>

      <p className="lg:w-11/12 mt-10">
        Resume versions over the years. Each one marks a shift in focus or a new
        thing I learned. Click on the preview to view each version.
      </p>

      <header className="flex items-center gap-4 justify-between p-4 my-8 overflow-auto">
        {resumes.map(({ date }, i) => (
          <button
            key={date}
            onClick={() => setActiveResume(i)}
            className={`whitespace-nowrap cursor-pointer link-hover ${
              activeResume === i ? " font-bold text-steel-blue" : ""
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
