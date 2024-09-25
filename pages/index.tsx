import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApiBase } from "@/lib";
import YearPage from "@/components/year-page";
import { yearData } from "@/lib/data";

export default function Home({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState(
    initialData.finals?.length > 0
      ? "finals"
      : initialData.round_robin?.length > 0
        ? "round_robin"
        : "rankings"
  );
  const [teamModal, setTeamModal] = useState<string | null>(null);
  const router = useRouter();
  const { year } = router.query;

  useEffect(() => {
    // Auto refresh data every 1 minute
    const interval = setInterval(async () => {
      const res = await fetch(getApiBase());
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
      yearData={yearData[2024]}
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
