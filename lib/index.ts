export const PUBLIC_API_BASE = "https://api.first.global";
export const STAGE_API_BASE = "https://api.fgcstage.zaiser.dev";
export const LOCAL_API_BASE = "http://localhost:3005";

export const getApiBase = (forceClient = false) => {
  const env = process.env.NEXT_PUBLIC_PROD_URL;
  const envStage = process.env.NEXT_PUBLIC_STAGE_URL;
  const isSsr = !forceClient && typeof window === "undefined";

  return envStage ? STAGE_API_BASE : env ? PUBLIC_API_BASE : PUBLIC_API_BASE;

  if (env === "production") {
    return isSsr ? LOCAL_API_BASE : PUBLIC_API_BASE;
  } else if (env === "local") {
    return LOCAL_API_BASE;
  } else {
    return PUBLIC_API_BASE;
  }
};

export const marquee = (items: number, speed: number = 50) =>
  `${(items * 48) / speed}s linear 0s infinite normal none running marquee`;



// This serves as a basic lookup for flags, but also a cache-buster in case flags change
export const getFlagUrl = (countryCode: string) => {
  const cacheBusterMap: Record<string, string> = {
    10: "10_hope"
  }

  if (cacheBusterMap[countryCode]) {
    countryCode = cacheBusterMap[countryCode];
  }

  return `/static/flags/4x3/${countryCode.toLowerCase()}.svg`;
}