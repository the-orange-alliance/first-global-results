import { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { getResultsUrl } from "@/lib";
import { yearData } from "@/lib/data";
import YearPage, { getDefaultTab } from "@/components/year-page";
import { TeamLinkProvider } from "@/components/team-link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Props = {
  data: any;
};

async function getServerSideProps(context) {
  const year = context.params?.year;
  if (typeof year !== "string" || !yearData[year]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res = await fetch(getResultsUrl(year), {
    // Force cache because this data never changes.
    cache: "force-cache",
    next: {
      // Cache for a year.  Basically forever.
      revalidate: 365 * 24 * 60 * 60,
    },
  });
  const data = await res.json();

  return {
    props: { data },
  };
}

function PastYear({
  data: initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { year } = router.query;

  const [data] = useState(initialData);
  const [tab, setTab] = useState(() =>
    getDefaultTab(initialData, parseInt(year as string))
  );
  const [teamModal, setTeamModal] = useState<string | null>(null);

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

  // See the note in pages/index.tsx for why this navigates through the router
  // singleton instead of the hook's instance.
  const handleModalClose = useCallback(() => {
    // Back to this year's page, not "/". The href/as form keeps the push on the
    // current page so `shallow` is honoured and getServerSideProps doesn't rerun.
    Router.push(
      { pathname: "/history/[year]", query: { year } },
      `/history/${year}`,
      { shallow: true }
    );
    setTeamModal(null);
  }, [year]);

  return (
    <TeamLinkProvider basePath={`/history/${year}`}>
      <YearPage
        data={data}
        teamModal={teamModal}
        handleModalClose={handleModalClose}
        tab={tab}
        handleTabChange={handleTabChange}
        yearData={yearData[parseInt(year as string)]}
      />
    </TeamLinkProvider>
  );
}

export {
  getServerSideProps
}
export default PastYear;