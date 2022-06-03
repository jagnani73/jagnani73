import { Player } from "@lottiefiles/react-lottie-player";

const ServerError = () => {
  return (
    <Player
      background="transparent"
      speed={1}
      className="w-full md:w-1/3"
      loop
      autoplay
      src="/lottie/500.json"
    />
  );
};

export default ServerError;
