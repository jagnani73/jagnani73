import type { Metadata, NextPage } from "next";
import Script from "next/script";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/shared";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yashvardhan Jagnani",
  description:
    "A software developer who is a Computer Science Engineering student with specialization in Cybersecurity, class of 2023.",
  authors: [{ name: "Yashvardhan Jagnani" }],
  keywords: [
    "Yashvardhan Jagnani",
    "jagnani73",
    "software developer",
    "full-stack",
    "react",
    "nextjs",
  ],
  metadataBase: new URL("https://jagnani73.com"),
  openGraph: {
    title: "Yashvardhan Jagnani",
    description:
      "A software developer who is a Computer Science Engineering student with specialization in Cybersecurity, class of 2023.",
    url: "https://jagnani73.com",
    siteName: "Yashvardhan Jagnani",
    images: [
      {
        url: "/site/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yashvardhan Jagnani",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yashvardhan Jagnani",
    description:
      "A software developer who is a Computer Science Engineering student with specialization in Cybersecurity, class of 2023.",
    creator: "@jagnani73",
    images: ["/site/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/site/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/site/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/site/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/site/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site/site.webmanifest",
  other: {
    "msapplication-TileColor": "#232323",
  },
};

const RootLayout: NextPage<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <head>
        <meta name="theme-color" content="#232323" />
      </head>
      <body className={nunitoSans.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CY9KEWMBRR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CY9KEWMBRR');
          `}
        </Script>

        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
