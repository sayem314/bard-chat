import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**", // GitHub avatar URLs
      },
      {
        protocol: "https",
        hostname: "cdn.bsky.app",
        pathname: "/img/**", // Bluesky CDN URLs
      },
    ],
  },
};

export default nextConfig;
