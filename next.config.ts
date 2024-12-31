import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // You can add these as well
        port: "",
        // pathname: 'arifscloud/image/upload/**',
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        // You can add these as well
        port: "",
        // pathname: 'arifscloud/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
