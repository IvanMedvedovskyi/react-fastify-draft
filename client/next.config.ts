import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],  // Добавьте этот домен
  },
};

export default nextConfig;
