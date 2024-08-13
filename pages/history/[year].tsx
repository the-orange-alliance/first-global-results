import { useEffect, useState } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getApiBase } from "@/lib";
import { yearData } from "@/lib/data";
import YearPage from "@/components/year-page";

type Props = {
  data: any;
};

export default function PastYear({
  data: initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data] = useState(initialData);
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
      yearData={yearData[parseInt(year as string)]}
    />
  );
}

export const getServerSideProps = (async (context) => {
  const year = context.params?.year;
  if (typeof year !== "string" || !yearData[year]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res = await fetch(getApiBase() + "/v1?year=" + year, {
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
}) satisfies GetServerSideProps<Props>;
