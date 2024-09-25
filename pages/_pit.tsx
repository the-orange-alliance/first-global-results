import { useEffect, useState } from "react";
import PitDisplay from "@/components/pit-display";
import { getApiBase } from "@/lib";
import { useRouter } from "next/router";

export default function Pit({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const { year } = router.query;

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
      <PitDisplay data={data} year={Array.isArray(year) ? year.toString() : year} />
      {isError && <div className="error">Disconnected</div>}
      <style jsx>{`
        .error {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.9);
          color: #dc2626;
          font-weight: 900;
          font-size: 5rem;
          text-transform: uppercase;
        }
      `}</style>
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
