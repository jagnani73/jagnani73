import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/tailwind.styles.css";
import { Navbar, Footer } from "../components/shared";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Yashvardhan Jagnani</title>
      </Head>

      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
