import type { NextConfig } from "next";

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
};

export default nextConfig;
