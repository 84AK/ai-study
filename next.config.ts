import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'out',
  basePath: isProd ? '/ai-study' : '',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
