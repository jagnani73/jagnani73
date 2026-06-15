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
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  redirects: async () => [
    { source: "/projects", destination: "/work", permanent: true },
    { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
    { source: "/experiences", destination: "/work", permanent: true },
  ],
};

export default nextConfig;
