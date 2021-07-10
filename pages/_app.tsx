import { AppProps } from "next/app";

import "../styles/tailwind.styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
