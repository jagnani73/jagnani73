import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
