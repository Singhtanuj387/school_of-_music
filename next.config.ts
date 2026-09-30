import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare Tunnel domains for Dev HMR and asset serving
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.cloudflare.com",
    "localhost:3000",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.trycloudflare.com",
        "*.cloudflare.com",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
