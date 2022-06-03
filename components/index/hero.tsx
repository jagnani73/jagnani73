import { tags } from "../../utils/constants";

const Hero: React.FC = () => {
  return (
    <section className="h-screen flex text-center">
      <div className="w-1/2 flex-center flex-col">
        <div className="w-6/12 mt-48">
          <h2>My name is</h2>
          <h1>Yashvardhan Jagnani</h1>

          <h6 className="capitalize mt-4">{tags.join(" | ")}</h6>

          <p className="mt-40">
            I like to refer to myself in the third person.
            <br />
            It makes him feel adherent.
          </p>
        </div>
      </div>

      <div className="w-1/2 bg-steel-blue flex-center flex-col">
        <div className="w-6/12">
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
