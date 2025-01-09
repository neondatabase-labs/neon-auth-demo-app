/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("bun:sqlite");
    return config;
  },
};

module.exports = nextConfig;
