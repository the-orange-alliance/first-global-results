import { ReactNode } from "react";

/**
 * The pit display and ticker are venue screens that are dark by design, in
 * their own hand-written CSS, and have no theme selector, so the site-wide
 * dark mode must not reach them.
 *
 * The attribute re-applies the light scheme to the subtree: MUI emits its
 * light `--mui-palette-*` variables and `color-scheme` for
 * `[data-mui-color-scheme="light"]`, and pages/_app.tsx does the same for the
 * alliance colours.  `color` has to be reset by hand because the body's dark
 * text colour is inherited as a computed value, not a variable — without it
 * the unstyled text on the light cards turns near-white.
 *
 * `display: contents` keeps the wrapper out of the layout.
 */
const LightScheme = ({ children }: { children: ReactNode }) => (
  <div
    data-mui-color-scheme="light"
    style={{ display: "contents", color: "var(--mui-palette-text-primary)" }}
  >
    {children}
  </div>
);

export default LightScheme;
