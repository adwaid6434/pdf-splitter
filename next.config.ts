import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["pdfjs-dist", "pdf-lib"],
  },

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
