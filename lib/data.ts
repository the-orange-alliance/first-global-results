export const watchLinks = {
  all: "https://first.global/live",
  main: "https://first.global/live",
  field1: "https://first.global/live",
  field2: "https://first.global/live",
  field3: "https://first.global/live",
  field4: "https://first.global/live",
  field5: "https://first.global/live",
};

export type YearData = {
  year: string;
  date: string;
  // Label for the ranking-score column.  Seasons that scored it under another
  // name override it here; everything else falls back to "Ranking Score".
  rankingScoreName?: string;
  // `null` for seasons without a game-specific ranking stat (e.g. 2019).  Both
  // fields are null together, and the column is hidden from the ranking table.
  customRankingName: string | null;
  customRankingKey: string | null;
  // `null` until the season's streams are published.  While null the "Watch
  // Live" button renders as a disabled "Streams Coming Soon" state.
  watchLinks: typeof watchLinks | null;
};

export const yearData: { [key: number]: YearData } = {
  2026: {
    year: "2026",
    date: "7-10 October 2026 in Incheon",
    customRankingName: "Climb Points",
    customRankingKey: "climbPoints",
    watchLinks: null,
  },
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
  2019: {
    year: "2019",
    date: "24-27 October 2019 in Dubai",
    customRankingName: null,
    customRankingKey: null,
    watchLinks: {
      all: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
      main: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
      field1: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
      field2: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
      field3: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
      field4: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
      field5: "https://www.youtube.com/watch?v=TWMRKjT7VdI",
    },
  },
  2018: {
    year: "2018",
    date: "16-18 August 2018 in Mexico City",
    customRankingName: "Parking Points",
    customRankingKey: "parkingPoints",
    watchLinks: {
      all: "https://www.youtube.com/watch?v=nImLMbcu024",
      main: "https://www.youtube.com/watch?v=nImLMbcu024",
      field1: "https://www.youtube.com/watch?v=nImLMbcu024",
      field2: "https://www.youtube.com/watch?v=nImLMbcu024",
      field3: "https://www.youtube.com/watch?v=nImLMbcu024",
      field4: "https://www.youtube.com/watch?v=nImLMbcu024",
      field5: "https://www.youtube.com/watch?v=nImLMbcu024",
    },
  },
  2017: {
    year: "2017",
    date: "16-18 July 2017 in Washington, D.C.",
    customRankingName: null,
    customRankingKey: null,
    watchLinks: {
      all: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
      main: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
      field1: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
      field2: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
      field3: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
      field4: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
      field5: "https://www.youtube.com/watch?v=Ddh0kF-DbSk",
    },
  },
};

export const pastYears = [2017, 2018, 2019, 2022, 2023, 2024, 2025];