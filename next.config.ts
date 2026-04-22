import type { NextConfig } from "next";

const LISTMONK_API_URL = process.env.LISTMONK_API_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img2.gimm.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    if (!LISTMONK_API_URL) {
      console.warn("LISTMONK_API_URL not set, skipping subscription rewrites");
      return [];
    }
    return [
      {
        source: "/subscription/:path*",
        destination: `${LISTMONK_API_URL}/subscription/:path*`,
      },
    ];
  },
};

export default nextConfig;
