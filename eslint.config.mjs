import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Flat config replacement for the previous .eslintrc.json ({ "extends": "next/core-web-vitals" }).
// ESLint 10 dropped eslintrc support entirely, and `next lint` was removed in Next.js 16.
export default [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // New in eslint-plugin-react-hooks v7, which ships with eslint-config-next 16.
      // It flags six pre-existing router.query -> setState effects in pages/index.tsx,
      // pages/history/[year].tsx and components/. Kept visible as warnings rather than
      // refactored here, so the dependency upgrade doesn't change runtime behaviour.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];
