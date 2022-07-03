import { useEffect } from "react";
import GitHubCalendar from "github-calendar";
import "github-calendar/dist/github-calendar-responsive.css";

const Hero: React.FC = () => {
  useEffect(() => {
    (async () => {
      await GitHubCalendar("#github_contributions_graph", "jagnani73", {
        global_stats: false,
        summary_text: "",
        tooltips: true,
      });
      var cssVariables = document.querySelector(":root");

      (cssVariables as HTMLElement).style.setProperty(
        "--color-calendar-graph-day-bg",
        "#323232"
      );
      (cssVariables as HTMLElement).style.setProperty(
        "--color-calendar-graph-day-L1-bg",
        "#2d925c"
      );
      (cssVariables as HTMLElement).style.setProperty(
        "--color-calendar-graph-day-L2-bg",
        "#1b6b2c"
      );
      (cssVariables as HTMLElement).style.setProperty(
        "--color-calendar-graph-day-L3-bg",
        "#3ab34e"
      );
      (cssVariables as HTMLElement).style.setProperty(
        "--color-calendar-graph-day-L4-bg",
        "#2bc945"
      );

      const _ = document.getElementsByClassName(
        "width-full f6 px-0 px-md-5 py-1"
      );
      for (var i = 0; i < _.length; i++) _[i].classList.add("hidden");

      const graphSVG = document.querySelector(
        ".js-calendar-graph"
      ) as HTMLElement;
      graphSVG.style.overflow = "auto";
      graphSVG.style.paddingBottom = "0.5rem";
    })();
  }, []);

  return (
    <section className="lg:h-screen flex flex-wrap text-center">
      <div className="w-full lg:w-1/2 flex-center flex-col">
        <div className="lg:w-6/12 mt-20">
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

      <div className="w-full lg:w-1/2 lg:bg-steel-blue flex-center flex-col lg:pt-40">
        <p className="w-10/12 lg:w-9/12 mx-auto">
          He is a Computer Science Engineering student (class of 2023) from
          SRMIST, Chennai, India. Doing a specialization in Cybersecurity, his
          interest peeked in software development back in his fresher year of
          college. He ever since has been passionate about ideating solutions
          using software development. He has an inclination towards Frontend
          Development, specially ReactJS.
        </p>

        <div className="mx-auto w-11/12 mt-8">
          <div
            id="github_contributions_graph"
            className="mx-auto w-fit max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
