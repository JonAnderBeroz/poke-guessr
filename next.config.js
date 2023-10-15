/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  generateEtags: false,
};

module.exports = nextConfig;
