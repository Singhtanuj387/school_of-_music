import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare Tunnel domains for Dev HMR and asset serving
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.cloudflare.com",
    "localhost:3000",
  ],
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "date-fns-tz",
    ],
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
