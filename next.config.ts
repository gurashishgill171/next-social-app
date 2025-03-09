import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
		serverComponentsExternalPackages: ["@node-rs/argon2"]
};

export default nextConfig;
