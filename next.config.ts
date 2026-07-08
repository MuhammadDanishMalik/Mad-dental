import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images from /public without restrictions
    unoptimized: false,
  },
};

export default nextConfig;
