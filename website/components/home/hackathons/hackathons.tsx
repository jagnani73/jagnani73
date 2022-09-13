import { HackathonsProps } from "../../../utils/interfaces/home-interfaces";
import { Hackathon } from "./";

const Hackathons: React.FC<HackathonsProps> = ({ hackathons }) => {
  return (
    <section className="section-container">
      <h1>Hackathons</h1>
      <h3>Pursuit of perfection</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Yashvardhan believes hackathons provide an ideal ground for learning as
        well as development. Hackathons are a place where you can learn more
        about the technology while implementing it for a problem statement, as
        well as contribute to Open Source Software. One logically competes in a
        competition that has nothing but benefits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-16 mt-8 lg:mt-20">
        {hackathons.map((hackathon) => (
          <Hackathon key={hackathon._id} {...hackathon} />
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
