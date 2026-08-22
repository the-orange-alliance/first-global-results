import { createContext, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import type { UrlObject } from "url";

interface TeamLinkTarget {
  href: UrlObject | string;
  as?: string;
}

type TeamLinkBuilder = (country: string) => TeamLinkTarget;

const TeamLinkContext = createContext<TeamLinkBuilder | null>(null);

interface TeamLinkProviderProps {
  /**
   * Path segment the modal URL hangs off: "" on the live page, `/history/2023`
   * on an archived one.
   */
  basePath: string;
  children: React.ReactNode;
}

/**
 * Supplies the href/as pair that opens the team modal without leaving the page
 * you're on.
 *
 * `href` deliberately points at the *current* page, because Next only honours
 * `shallow` for URL changes within the same page — a link straight to the
 * pretty path would resolve to a different page and re-run data fetching (on
 * the history pages, that also meant landing on the live season instead).
 * `as` carries the pretty URL for the address bar, and the rewrites in
 * next.config.js map it back to the right page on a cold load.
 */
export const TeamLinkProvider: React.FC<TeamLinkProviderProps> = ({
  basePath,
  children,
}) => {
  const router = useRouter();
  const { pathname } = router;
  // Depend on the one param that matters rather than the whole query object,
  // which Next hands back with a new identity on every route event.  That
  // churn used to give `build` a new identity too, re-rendering every row that
  // consumes this context.  `year` fills the [year] segment of the history
  // route; the only other key ever present is `country`, which the builder
  // overwrites anyway.
  const year = router.query.year;

  const build = useCallback<TeamLinkBuilder>(
    (country) => ({
      href: {
        pathname,
        query: year === undefined ? { country } : { year, country },
      },
      as: `${basePath}/team/${country}`,
    }),
    [pathname, year, basePath]
  );

  return (
    <TeamLinkContext.Provider value={build}>{children}</TeamLinkContext.Provider>
  );
};

/**
 * Falls back to the plain live-season path when there's no provider, so the
 * link components stay usable outside a YearPage.
 */
export const useTeamLink = (): TeamLinkBuilder => {
  const build = useContext(TeamLinkContext);
  return build ?? ((country) => ({ href: `/team/${country}` }));
};
