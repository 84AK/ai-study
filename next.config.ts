import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/ai-study-hub',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
