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

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="content-language" content="en" />
          <meta name="language" content="English" />

          <meta name="author" content="Yashvardhan Jagnani" />
          <meta
            name="description"
            content=" He is a Computer Science Engineering student graduating from the class of 2023 from SRMIST, Chennai, India. Doing a specialization in Cybersecurity, his interest peeked in software development back in his fresher year of college. Ever since, he has been passionate about ideating solutions using software development. He inclines towards Frontend Development, especially ReactJS. Yashvardhan has laid the foundation for many communities and projects. He strives for a pursuit that reciprocates in-depth knowledge for his diligent work towards adding value to his professional as well as personal aspects—an amalgamation of interpersonal and technical skill sets with a belief in continuous learning."
          />
          <meta name="image" content="/site/og-image.png" />

          <meta itemProp="name" content="Yashvardhan Jagnani" />
          <meta
            itemProp="description"
            content=" He is a Computer Science Engineering student graduating from the class of 2023 from SRMIST, Chennai, India. Doing a specialization in Cybersecurity, his interest peeked in software development back in his fresher year of college. Ever since, he has been passionate about ideating solutions using software development. He inclines towards Frontend Development, especially ReactJS. Yashvardhan has laid the foundation for many communities and projects. He strives for a pursuit that reciprocates in-depth knowledge for his diligent work towards adding value to his professional as well as personal aspects—an amalgamation of interpersonal and technical skill sets with a belief in continuous learning."
          />
          <meta itemProp="image" content="/site/og-image.png" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Yashvardhan Jagnani" />
          <meta
            name="twitter:description"
            content=" He is a Computer Science Engineering student graduating from the class of 2023 from SRMIST, Chennai, India. Doing a specialization in Cybersecurity, his interest peeked in software development back in his fresher year of college. Ever since, he has been passionate about ideating solutions using software development. He inclines towards Frontend Development, especially ReactJS. Yashvardhan has laid the foundation for many communities and projects. He strives for a pursuit that reciprocates in-depth knowledge for his diligent work towards adding value to his professional as well as personal aspects—an amalgamation of interpersonal and technical skill sets with a belief in continuous learning."
          />
          <meta name="twitter:site" content="@jagnani73" />
          <meta name="twitter:creator" content="@jagnani73" />
          <meta name="twitter:image:src" content="/site/og-image.png" />

          <meta name="og:title" content="Yashvardhan Jagnani" />
          <meta
            name="og:description"
            content=" He is a Computer Science Engineering student graduating from the class of 2023 from SRMIST, Chennai, India. Doing a specialization in Cybersecurity, his interest peeked in software development back in his fresher year of college. Ever since, he has been passionate about ideating solutions using software development. He inclines towards Frontend Development, especially ReactJS. Yashvardhan has laid the foundation for many communities and projects. He strives for a pursuit that reciprocates in-depth knowledge for his diligent work towards adding value to his professional as well as personal aspects—an amalgamation of interpersonal and technical skill sets with a belief in continuous learning."
          />
          <meta name="og:image" content="/site/og-image.png" />
          <meta name="og:url" content="https://jagnani73.com" />
          <meta name="og:site_name" content="Yashvardhan Jagnani" />
          <meta name="og:type" content="website" />
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
