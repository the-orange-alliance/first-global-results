/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 12 * 60,
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
