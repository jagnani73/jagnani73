import type { Metadata } from "next";
import { Anton, Instrument_Serif, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const metadataTitle = "Yashvardhan Jagnani";
const metadataDescription =
  "Blockchain-first software engineer — AI-native builder, forward-deployed engineer. Covalent · InsidePoly · AI Agent SDK. Incoming MSc, NTU Singapore.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  authors: [{ name: metadataTitle }],
  keywords: [
    metadataTitle,
    "jagnani73",
    "software engineer",
    "blockchain engineer",
    "AI engineer",
    "full-stack developer",
    "web3 developer",
    "smart contracts",
    "react",
    "nextjs",
  ],
  metadataBase: new URL("https://jagnani73.com"),
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: "https://jagnani73.com",
    siteName: metadataTitle,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: metadataDescription,
    creator: "@jagnani73",
  },
  icons: {
    icon: [
      { url: "/site/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/site/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/site/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [{ rel: "mask-icon", url: "/site/safari-pinned-tab.svg" }],
  },
  manifest: "/site/site.webmanifest",
  other: {
    "msapplication-TileColor": "#081012",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} ${dmSans.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-CY9KEWMBRR" />
    </html>
  );
};

export default RootLayout;
