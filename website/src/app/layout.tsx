import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/shared";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const metadataTtile = "Yashvardhan Jagnani";
const metadataDescription =
  "Blockchain engineer and full-stack developer building decentralized applications and infrastructure. Computer Science graduate from SRMIST, Chennai, specializing in Cybersecurity.";

export const metadata: Metadata = {
  title: metadataTtile,
  description: metadataDescription,
  authors: [{ name: metadataTtile }],
  keywords: [
    metadataTtile,
    "jagnani73",
    "software developer",
    "blockchain engineer",
    "full-stack developer",
    "web3 developer",
    "smart contracts",
    "decentralized applications",
    "react",
    "nextjs",
  ],
  metadataBase: new URL("https://jagnani73.com"),
  openGraph: {
    title: metadataTtile,
    description: metadataDescription,
    url: "https://jagnani73.com",
    siteName: metadataTtile,
    images: [
      {
        url: "/site/og-image.png",
        width: 1200,
        height: 630,
        alt: metadataTtile,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: metadataTtile,
    description: metadataDescription,
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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <head>
        <meta name="theme-color" content="#232323" />
      </head>
      <body className={nunitoSans.className}>
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-CY9KEWMBRR" />
    </html>
  );
};

export default RootLayout;
