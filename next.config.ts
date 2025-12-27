import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // your Cloudinary images
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com", // ImgBB images
      },
    ],
  },
};

export default nextConfig;
