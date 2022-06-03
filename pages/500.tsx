import { NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

import { ROUTES } from "../utils/constants/shared-constants";

const ServerError: NextPage = () => {
  return (
    <section className="section-container">
      <Player
        background="transparent"
        speed={1}
        className="w-full md:w-1/4"
        loop
        autoplay
        src="/lottie/500.json"
      />

      <p className="text-center text-2xl">Uh oh! Somethings wrong.</p>

      <Link href={ROUTES.HOME}>
        <a className="justify-center flex mt-4 underline text-lg">
          Lets take you back home
        </a>
      </Link>
    </section>
  );
};

export default ServerError;
