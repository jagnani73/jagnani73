import { NextPage } from "next";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

import { ROUTES } from "../utils/constants/shared-constants";

const NotFound: NextPage = () => {
  return (
    <section className="section-container">
      <Player
        background="transparent"
        speed={1}
        className="w-full md:w-1/2"
        loop
        autoplay
        src="/lottie/404.json"
      />

      <Link href={ROUTES.HOME}>
        <a className="justify-center flex underline text-2xl">
          Lets take you back home
        </a>
      </Link>
    </section>
  );
};

export default NotFound;
