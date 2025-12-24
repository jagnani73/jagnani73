"use client";

import { cloneElement } from "react";
import { Tooltip } from "react-tooltip";
import GitHubCalendar from "react-github-calendar";
import Image from "next/image";

export const Hero: React.FC = () => {
  return (
    <section className="lg:h-screen flex flex-wrap text-center">
      <div className="w-full lg:w-1/2 flex justify-center items-center flex-col">
        <div className="lg:w-6/12 mt-28">
          <Image
            className="w-80 mx-auto rounded-full"
            src="https://github.com/jagnani73.png"
            alt="Yashvardhan Jagnani @ jagnani73.com"
            width={320}
            height={320}
            priority
          />

          <div className="my-8">
            <h2>My name is</h2>
            <h1>Yashvardhan Jagnani</h1>
          </div>

          <h6>Blockchain | Full Stack | Software</h6>

          <p className="my-10 lg:mb-0">Building systems that actually work.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:bg-steel-blue flex justify-center items-center flex-col lg:pt-20">
        <p className="w-10/12 lg:w-9/12 mx-auto">
          Computer Science graduate from SRMIST, Chennai (class of 2023), with a
          specialization in Cybersecurity. Started coding in college and
          haven&apos;t stopped since. I work across the stack, but these days
          I&apos;m focused on blockchain infrastructure and decentralized
          applications, smart contracts, and building tools that make web3
          development less painful. The tools change, but the goal stays the
          same: build things that solve real problems.
        </p>

        <div className="mx-auto mt-8 overflow-x-auto">
          <Tooltip id="react-tooltip" />

          <GitHubCalendar
            username="jagnani73"
            theme={{
              dark: [
                "#161b22", // Level 0: No contributions (dark background)
                "#1a7f3a", // Level 1: 1-9 contributions (visible green - more visible than default)
                "#2ea043", // Level 2: 10-19 contributions (medium bright green)
                "#26a641", // Level 3: 20-29 contributions (bright green)
                "#39d353", // Level 4: 30+ contributions (very bright green)
              ],
            }}
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
    </section>
  );
};
