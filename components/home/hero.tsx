import { tags } from "../../utils/constants/home-constants";

const Hero: React.FC = () => {
  return (
    <section className="lg:h-screen flex flex-wrap text-center">
      <div className="w-full lg:w-1/2 flex-center flex-col">
        <div className="lg:w-6/12 mt-48">
          <h2>My name is</h2>
          <h1>Yashvardhan Jagnani</h1>

          <h6 className="capitalize mt-4">{tags.join(" | ")}</h6>

          <p className="my-10 lg:mb-0 lg:mt-40">
            I like to refer to myself in the third person.
            <br />
            It makes him feel adherent.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:bg-steel-blue flex-center flex-col">
        <div className="w-10/12 lg:w-6/12">
          <figure>
            {/* // TODO: replace with image */}
            <div className="bg-cultured h-60 w-60 mx-auto"></div>
          </figure>

          <p className="mt-16">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
