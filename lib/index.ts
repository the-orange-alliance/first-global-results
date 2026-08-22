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
    // Codes 10-14 are the IAC codes for Team HOPE and the continental teams;
    // their files carry a name suffix, so a bare "12.svg" would 404.
    10: "10_hope",
    11: "11_south-america",
    12: "12_oceania",
    13: "13_north-america",
    14: "14_europe",
    "sy": "sy_new",
    "cr": "cr_new",
  }

  // Normalize before the lookup, not after: the keys are lowercase, so an
  // uppercase code like "SY" would otherwise miss and resolve to the stale file.
  const code = countryCode.toLowerCase();

  return `/static/flags/4x3/${cacheBusterMap[code] ?? code}.svg`;
}