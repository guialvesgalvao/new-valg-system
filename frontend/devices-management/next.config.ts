import type { NextConfig } from "next";
require("dotenv").config();

const nextConfig: NextConfig = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
