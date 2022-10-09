/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/team/:country",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
