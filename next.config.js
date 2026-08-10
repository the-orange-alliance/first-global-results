/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @mui/lab 9.0.0-beta.8 otherwise resolves @mui/material through its CJS
  // build while the app resolves the ESM one. That yields two instances of
  // MUI's RovingTabIndexContext, so <Tab> inside lab's <TabList> renders
  // outside the provider that <Tabs> creates and throws
  // "MUI: RovingTabIndexContext is missing" during SSR. Transpiling the lab
  // package keeps everything on a single module instance.
  transpilePackages: ["@mui/lab"],
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
