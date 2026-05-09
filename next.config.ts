import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 // swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
 /*  eslint: {
    ignoreDuringBuilds: false,
  }, */
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
};

export default nextConfig;
