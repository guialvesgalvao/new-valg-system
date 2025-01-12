import type { NextConfig } from "next";
require("dotenv").config();

const nextConfig: NextConfig = {
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  output: "standalone",
};

export default nextConfig;
