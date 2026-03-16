import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local assets are already compressed and don't benefit from per-request optimization.
    unoptimized: true,
  },
};

export default nextConfig;
