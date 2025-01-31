import path from "path";
import { Configuration } from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config: Configuration) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.join(__dirname, "src"),
      };
    }
    return config;
  },
  images: {
    domains: ["zen.wego.com"],
  },
};

export default nextConfig;
