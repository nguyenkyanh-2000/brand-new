/** @type {import('next').NextConfig} */
const withVideo = require("next-videos");

const nextConfig = {
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
module.exports = withVideo(nextConfig);
