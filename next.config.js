/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // if your website has no www, drop it
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};
module.exports = nextConfig;
