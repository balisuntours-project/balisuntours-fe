import type { NextConfig } from "next";
import { config } from 'dotenv';

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
  output: 'standalone',
  images: {
    domains: ['booking.balisuntours.com', 'source.unsplash.com', 'localhost', 'images.unsplash.com', 'ui-avatars.com'],
  }
};

export default nextConfig;
