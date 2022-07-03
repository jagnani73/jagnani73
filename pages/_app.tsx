import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/tailwind.styles.css";
import { Navbar, Footer } from "../components/shared";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { events } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    events.on("routeChangeStart", () => setLoading(true));
    events.on("routeChangeComplete", () => setLoading(false));
    events.on("routeChangeError", () => setLoading(false));
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Yashvardhan Jagnani</title>
      </Head>

      {loading && (
        <div className="w-full h-screen fixed flex-center top-0 left-0 bg-jet bg-opacity-50">
          <object
            type="image/svg+xml"
            data="/loader.svg"
            className="h-96 m-auto"
          >
            loading...
          </object>
        </div>
      )}

      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
