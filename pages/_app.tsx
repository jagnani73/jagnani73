import { AppProps } from "next/app";

import "../styles/tailwind.styles.css";
import { Navbar } from "../components/shared";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
