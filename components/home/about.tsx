const About: React.FC = () => {
  return (
    <section className="section-container">
      <h1>About</h1>
      <h3>A sarcastic insult is not insulting</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        A good listener who is confident in his decisions, open to constructive
        criticism and tries to include people as much as possible. He loves
        listening to songs; you can find him vibing almost anytime. He has
        attached his recently played as proof. He loves astrology and cosmology.
        One can have an excellent time discussing conspiracy theories with him.
        Yashvardhan is a part of many fandoms like Marvel or Brooklyn Nine-Nine.
        He is very sarcastic and often confuses people with it. He also
        appreciates psychology and loves philosophizing.
      </p>

      <div className="flex flex-col md:flex-row mt-12 gap-x-4 overflow-hidden">
        <iframe
          className="min-h-xs md:min-h-0 w-full mx-auto md:w-4/12"
          src="https://spotify-recently-played-readme.vercel.app/api?user=6o2i4ysx7nesg69llfcreqqt5&unique=true"
        />

        {/* <iframe
          className="mt-10 md:mt-0 md:w-8/12 h-96"
          src="https://stellarium-web.org/"
        /> */}
      </div>
    </section>
  );
};

export default About;
