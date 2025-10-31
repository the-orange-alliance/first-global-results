export const watchLinks = {
  all: "https://first.global/live",
  main: "https://first.global/live",
  field1: "https://www.youtube.com/watch?v=MRKgTGhcV0M",
  field2: "https://www.youtube.com/watch?v=HdW0y-2kwD0",
  field3: "https://first.global/live",
  field4: "https://www.youtube.com/watch?v=ZRFGlhftoQE",
  field5: "https://www.youtube.com/watch?v=TOi5-RFpaGY",
};

export type YearData = {
  year: string;
  date: string;
  customRankingName: string;
  customRankingKey: string;
  watchLinks: typeof watchLinks;
};

export const yearData: { [key: number]: YearData } = {
  2025: {
    year: "2025",
    date: "29 October-1 November 2025 in Panamá City",
    customRankingName: "Protection Points",
    customRankingKey: "protectionPoints",
    watchLinks: {
      all: "https://first.global/live",
      main: "https://first.global/live",
      field1: "https://youtu.be/IMzAHjn2oqA",
      field2: "https://youtu.be/DzvYXbAkqIc",
      field3: "https://youtu.be/19KenSMx4QI",
      field4: "https://youtu.be/jo-dh0LGt-I",
      field5: "https://first.global/live",
    },
  },
  2024: {
    year: "2024",
    date: "26-29 September 2024 in Athens",
    customRankingName: "Total Food Secured Points",
    customRankingKey: "foodSecuredPoints",
    watchLinks: {
      all: "https://first.global/live",
      main: "https://first.global/live",
      field1: "https://www.youtube.com/watch?v=MRKgTGhcV0M",
      field2: "https://www.youtube.com/watch?v=HdW0y-2kwD0",
      field3: "https://first.global/live",
      field4: "https://www.youtube.com/watch?v=ZRFGlhftoQE",
      field5: "https://www.youtube.com/watch?v=TOi5-RFpaGY",
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

export const pastYears = [2022, 2023, 2024];