import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true, // optional, but helps with future features
  },
  typescript: {
    ignoreBuildErrors: false, // keep this true for production safety
  },
};

export default nextConfig;

