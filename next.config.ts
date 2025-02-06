import type { NextConfig } from "next";
import { config } from "dotenv";

// Memuat variabel lingkungan dari file .env
const { parsed } = config();

const nextConfig: NextConfig = {
  env: {
    ...parsed,
    // Tambahkan variabel lingkungan tambahan di sini jika diperlukan
  },

  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    domains: (process.env.NEXT_PUBLIC_IMAGE_DOMAINS || "").split(","),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be.balisuntours.com",
        port: "",
        pathname: "/storage/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "static.tacdn.com",
        port: "",
        pathname: "/img2/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
