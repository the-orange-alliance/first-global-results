export const PUBLIC_API_BASE = "https://api.first.global";
export const LOCAL_API_BASE = "http://localhost:3005";

export const getApiBase = (forceClient = false) => {
  const env = process.env.NEXT_PUBLIC_API_ENV;
  const isSsr = !forceClient && typeof window === "undefined";

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
