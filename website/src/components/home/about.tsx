import { HamburgerIcon } from "@/utils/icons";

export const About: React.FC = () => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>About</h1>
      <h3>Beyond the code</h3>

      <p className="lg:w-11/12 mt-10 lg:mt-20">
        I&apos;m a collaborative team member who values clear communication and
        constructive feedback. Outside of coding, I enjoy music, space, and good
        conversations. I maintain an active listening history on Spotify and
        follow developments in astronomy and cosmology. I also appreciate
        well-written shows and thoughtful discussions about psychology and
        philosophy.
      </p>

      <div className="flex flex-col md:flex-row mt-12 gap-x-4 overflow-hidden">
        <iframe
          className="min-h-xs md:min-h-0 w-full mx-auto md:w-4/12"
          src="https://spotify-recently-played-readme.vercel.app/api?user=6o2i4ysx7nesg69llfcreqqt5&unique=true"
        />

        <iframe
          className="mt-10 md:mt-0 md:w-8/12 h-96"
          src="https://stellarium-web.org/"
        />
      </div>

      <div className="md:text-right mt-2">
        <p className="flex md:justify-end items-center">
          Use the{" "}
          <span className="w-4 mx-1 text-red-50">
            <HamburgerIcon />
          </span>{" "}
          menu to navigate the star map.
        </p>
        Best viewed on larger screens.
      </div>
    </section>
  );
};
