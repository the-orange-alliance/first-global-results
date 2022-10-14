/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 24 * 60,
  },
  headers: async () => [
    {
      source: "/static/flags/:all*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000",
        },
      ],
    },
  ],
  rewrites: async () => [
    {
      source: "/team/:country",
      destination: "/",
    },
  ],
};

module.exports = nextConfig;
