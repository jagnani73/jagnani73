const About: React.FC = () => {
  return (
    <section className="section-container" id="about">
      <h1>About Me</h1>
      <h3>Some random line for spacing</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <iframe
        src="https://spotify-recently-played-readme.vercel.app/api?user=6o2i4ysx7nesg69llfcreqqt5&unique=true"
        className="transform scale-150 mx-auto my-20"
      />
    </section>
  );
};

export default About;
