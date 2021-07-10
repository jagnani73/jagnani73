import Head from "next/head";
import { AppProps } from "next/app";

import "../styles/tailwind.styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
