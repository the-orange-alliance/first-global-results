import { useEffect, useState } from "react";
import PitDisplay from "@/components/pit-display";
import { getApiBase } from "@/lib";
import { useRouter } from "next/router";
import TickerComponent from "@/components/pit-display/ticker";

export default function Pit({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const { year, multiplier } = router.query;

  const multParsed = multiplier ? parseFloat(`${multiplier}`) : 3;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(getApiBase() + `/v1${year ? `?year=${year}` : ""}`);
        const data = await res.json();
        setData(data);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      }
    }, 20 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TickerComponent rankings={data.rankings} multiplier={multParsed} />
    </>
  );
}

export async function getServerSideProps({ query, res }) {
  const { year } = query;
  const req = await fetch(getApiBase() + `/v1${year ? `?year=${year}` : ""}`);
  const data = await req.json();

  // tell browser to cache this page for 60 seconds
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59'
  )

  return { props: { data } };
}

// export async function getStaticProps() {
//   const res = await fetch(getApiBase() + "/v1");
//   const data = await res.json();

//   return { props: { data } };
// }
