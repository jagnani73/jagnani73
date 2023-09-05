/* eslint-disable @next/next/no-img-element */

import { cloneElement } from "react";
import { Tooltip } from "react-tooltip";
import GitHubCalendar from "react-github-calendar";

const Hero: React.FC = () => {
  return (
    <section className="lg:h-screen flex flex-wrap text-center">
      <div className="w-full lg:w-1/2 flex-center flex-col">
        <div className="lg:w-6/12 mt-28 lg:mt-20">
          <img
            className="w-80 mx-auto"
            src="https://github.com/jagnani73.png"
            alt="Yashvardhan Jagnani @ jagnani73.com"
          />

          <div className="my-8">
            <h2>My name is</h2>
            <h1>Yashvardhan Jagnani</h1>
          </div>

          <h6>Full-stack | Cloud | DevOps</h6>

          <p className="my-10 lg:mb-0">
            I like to refer to myself in the third person.
            <br />
            It makes him feel extramundane.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:bg-steel-blue flex-center flex-col lg:pt-20">
        <p className="w-10/12 lg:w-9/12 mx-auto">
          He is a Computer Science Engineering student who graduated from the
          class of 2023 from SRMIST, Chennai, India. Doing a specialization in
          Cybersecurity, his interest peeked in software development back in his
          fresher year of college. Ever since, he has been passionate about
          ideating solutions using software development. He inclines towards
          Frontend Development, especially ReactJS. Yashvardhan has laid the
          foundation for many communities and projects. He strives for a pursuit
          that reciprocates in-depth knowledge for his diligent work towards
          adding value to his professional as well as personal aspects—an
          amalgamation of interpersonal and technical skill sets with a belief
          in continuous learning.
        </p>

        <div className="mx-auto w-11/12 mt-8 overflow-x-auto">
          <div className="mx-auto min-w-[844px]">
            <Tooltip id="react-tooltip" />
            <GitHubCalendar
              username="jagnani73"
              colorScheme="dark"
              fontSize={12}
              renderBlock={(block, activity) =>
                cloneElement(block, {
                  "data-tooltip-id": "react-tooltip",
                  "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
                })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
