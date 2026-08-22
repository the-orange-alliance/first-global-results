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
  const { pathname, query } = router;

  const build = useCallback<TeamLinkBuilder>(
    (country) => ({
      // Spreading the existing query preserves the `year` param that fills the
      // [year] segment of the history route.
      href: { pathname, query: { ...query, country } },
      as: `${basePath}/team/${country}`,
    }),
    [pathname, query, basePath]
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
