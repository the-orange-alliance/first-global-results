/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  headers: async () => [
    {
      source: "/static/flags/:all*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, stale-while-revalidate",
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
