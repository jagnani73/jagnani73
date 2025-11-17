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
};

export default nextConfig;
