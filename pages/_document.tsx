import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/site/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/site/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/site/favicon-16x16.png"
          />
          <link rel="manifest" href="/site/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/site/safari-pinned-tab.svg"
            color="#232323"
          />
          <meta name="msapplication-TileColor" content="#232323" />
          <meta name="theme-color" content="#232323" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
