import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lazada-recruitment.s3.us-east-1.amazonaws.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextVideo(nextConfig);
