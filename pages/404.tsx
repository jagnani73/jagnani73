import { NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";

const NotFound: NextPage = () => {
  return (
    <Player
      background="transparent"
      speed={1}
      className="w-full md:w-1/3"
      loop
      autoplay
      src="/lottie/404.json"
    />
  );
};

export default NotFound;
