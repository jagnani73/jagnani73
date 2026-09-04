import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Dev only. Without the origin listed here Next blocks `/_next/webpack-hmr`
  // from it, and Turbopack's dev chunk registration stalls behind that — a
  // dynamically imported module (the PDF viewer) then hangs on its loading
  // state forever rather than erroring. Add the machine's LAN IP to open a
  // document page on a phone; it changes with DHCP, so expect to edit it.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.app", "10.91.48.69"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/jagnani73/**",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/projects",
      destination: "/record",
      permanent: true,
    },
    {
      source: "/projects/:slug",
      destination: "/record/:slug",
      permanent: true,
    },
    {
      source: "/experiences",
      destination: "/record",
      permanent: true,
    },
  ],
};

export default nextConfig;
