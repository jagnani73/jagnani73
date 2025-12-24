import { HamburgerIcon } from "@/utils/icons";

export const About: React.FC = () => {
  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto mt-20 lg:mt-40">
      <h1>About</h1>
      <h3>Beyond the code</h3>

      <p className="lg:w-11/12 mt-10">
        When I&apos;m not debugging code or wrestling with RPC endpoints, I
        listen to music, read about space, and occasionally have decent
        conversations. I keep a Spotify history because it&apos;s interesting to
        see what stuck, and I follow astronomy news because the universe is
        absurdly large and we&apos;re absurdly small. Sometimes I watch shows
        that make me think, but mostly I just code.
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
        <p className="flex md:justify-end items-center whitespace-nowrap">
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
