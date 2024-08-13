export const watchLinks = {
  all: "https://first.global/live",
  main: "https://first.global/live",
  field1: "https://www.youtube.com/watch?v=hQeEWxXgboc",
  field2: "https://www.youtube.com/watch?v=96H0_qOIa84",
  field3: "https://www.youtube.com/watch?v=jT_fh7fiG0c",
  field4: "https://www.youtube.com/watch?v=1W5KtABbbGw",
  field5: "https://first.global/live",
};

export type YearData = {
  year: string;
  date: string;
  customRankingName: string;
  customRankingKey: string;
  watchLinks: typeof watchLinks;
};

export const yearData: { [key: number]: YearData } = {
  2024: {
    year: "2024",
    date: "26-29 September 2024 in Athens",
    customRankingName: "2024 Extra Ranking Item",
    customRankingKey: "placeholderKey",
    watchLinks: {
      all: "https://first.global/live",
      main: "https://first.global/live",
      field1: "https://www.youtube.com/watch?v=hQeEWxXgboc",
      field2: "https://www.youtube.com/watch?v=96H0_qOIa84",
      field3: "https://www.youtube.com/watch?v=jT_fh7fiG0c",
      field4: "https://www.youtube.com/watch?v=1W5KtABbbGw",
      field5: "https://first.global/live",
    },
  },
  2023: {
    year: "2023",
    date: "7-10 October 2023 in Singapore",
    customRankingName: "Total Hydrogen + Oxygen Points",
    customRankingKey: "oxyHydroPoints",
    watchLinks: {
      all: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
      main: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
      field1: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
      field2: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
      field3: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
      field4: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
      field5: "https://www.youtube.com/watch?v=6-H_Z8Zq7is",
    },
  },
  2022: {
    year: "2022",
    date: "13-16 October 2022 in Geneva",
    customRankingName: "Carbon Points",
    customRankingKey: "carbonPoints",
    watchLinks: {
      all: "https://www.youtube.com/watch?v=tvajnIBsM9s",
      main: "https://www.youtube.com/watch?v=tvajnIBsM9s",
      field1: "https://www.youtube.com/watch?v=tvajnIBsM9s",
      field2: "https://www.youtube.com/watch?v=tvajnIBsM9s",
      field3: "https://www.youtube.com/watch?v=tvajnIBsM9s",
      field4: "https://www.youtube.com/watch?v=tvajnIBsM9s",
      field5: "https://www.youtube.com/watch?v=tvajnIBsM9s",
    },
  },
};

export const pastYears = [2022, 2023];
