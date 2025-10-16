import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApiBase } from "@/lib";
import YearPage from "@/components/year-page";
import { pastYears, yearData } from "@/lib/data";

export default function Home({ data: initialData }) {
  const router = useRouter();
  const { year } = router.query;
  const yearI = parseInt(year as string);
  const finalsTab = yearI < 2024 ? "finals" : 'alliance_finals';
  const roundRobinTab = yearI < 2024 ? "round_robin" : 'tournament';

  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState(
    initialData.finals?.length > 0
      ? finalsTab
      : initialData.round_robin?.length > 0
        ? roundRobinTab
        : "rankings"
  );
  const [teamModal, setTeamModal] = useState<string | null>(null);

  useEffect(() => {
    // Auto refresh data every 1 minute
    const interval = setInterval(async () => {
      const res = await fetch(getApiBase() + "/v1");
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleModalClose = () => {
    router.push("/", undefined, { shallow: true });
    setTeamModal(null);
  };

  return (
    <YearPage
      data={data}
      teamModal={teamModal}
      handleModalClose={handleModalClose}
      tab={tab}
      handleTabChange={handleTabChange}
      yearData={yearData[pastYears[pastYears.length - 1] + 1]}
    />
  );
}

export async function getStaticProps() {
  const res = await fetch(getApiBase() + "/v1");
  const data = await res.json();

  return {
    props: { data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
