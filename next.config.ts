import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   serverActions: true,
  // },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

