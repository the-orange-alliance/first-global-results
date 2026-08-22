import { Fragment } from "react";

/**
 * Italicizes every "FIRST" in a string, the way the brand is set everywhere
 * else on the site (see the page heading in year-page.tsx).
 *
 * Only the all-caps brand matches: a lowercase "first" in an award description
 * is the ordinal, and a recipient such as "the First Skills Club" is a
 * different name that should be left alone.
 */
const BrandedText: React.FC<{ children: string }> = ({ children }) => {
  // A capturing split keeps the delimiters, so the parts alternate between
  // ordinary text and the brand.
  const parts = children.split(/\b(FIRST)\b/g);

  return (
    <>
      {parts.map((part, index) =>
        part === "FIRST" ? (
          <em key={index}>{part}</em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
};

export default BrandedText;
