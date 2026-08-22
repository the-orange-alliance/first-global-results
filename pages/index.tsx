import { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { getResultsUrl } from "@/lib";
import YearPage, { getDefaultTab } from "@/components/year-page";
import { TeamLinkProvider } from "@/components/team-link";
import { pastYears, yearData } from "@/lib/data";

// The live season is always the one after the most recently archived year.
const currentYear = pastYears[pastYears.length - 1] + 1;

export default function Home({ data: initialData }) {
  const router = useRouter();

  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState(() =>
    getDefaultTab(initialData, currentYear)
  );
  const [teamModal, setTeamModal] = useState<string | null>(null);

  useEffect(() => {
    // Auto refresh data every 1 minute
    const interval = setInterval(async () => {
      const res = await fetch(getResultsUrl());
      const data = await res.json();
      setData(data);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof router.query.country === "string") {
      setTeamModal(router.query.country);
    } else {
      setTeamModal(null);
    }
  }, [router.query.country]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setTab(newValue);
    },
    []
  );

  // Navigates through the router singleton rather than the hook's instance:
  // useRouter() hands back a fresh object every render, so depending on it
  // would recreate this handler each time.  That churn re-ran TeamModel's
  // effect — which filters every match — on every render, and defeated the
  // memoisation in MatchList.
  const handleModalClose = useCallback(() => {
    Router.push("/", undefined, { shallow: true });
    setTeamModal(null);
  }, []);

  return (
    <TeamLinkProvider basePath="">
      <YearPage
        data={data}
        teamModal={teamModal}
        handleModalClose={handleModalClose}
        tab={tab}
        handleTabChange={handleTabChange}
        yearData={yearData[currentYear]}
      />
    </TeamLinkProvider>
  );
}

export async function getStaticProps() {
  const res = await fetch(getResultsUrl());
  const data = await res.json();

  return {
    props: { data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
