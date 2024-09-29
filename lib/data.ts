export const watchLinks = {
  all: "https://first.global/live",
  main: "https://first.global/live",
  field1: "https://www.youtube.com/watch?v=OtddDnLgWgw",
  field2: "https://www.youtube.com/watch?v=53eYbymnZd4",
  field3: "https://first.global/live",
  field4: "https://www.youtube.com/watch?v=FXqQIcgrWIY",
  field5: "https://www.youtube.com/watch?v=V9FKjsyXfr0",
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
    customRankingName: "Total Food Secured Points",
    customRankingKey: "foodSecuredPoints",
    watchLinks: {
      all: "https://first.global/live",
      main: "https://first.global/live",
      field1: "https://www.youtube.com/watch?v=OtddDnLgWgw",
      field2: "https://www.youtube.com/watch?v=53eYbymnZd4",
      field3: "https://first.global/live",
      field4: "https://www.youtube.com/watch?v=FXqQIcgrWIY",
      field5: "https://www.youtube.com/watch?v=V9FKjsyXfr0",
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


const demoAlliances = [
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 9,
    "allianceRank": 5,
    "allianceNameShort": "#5",
    "allianceNameLong": "Alliance 5",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 16,
    "allianceRank": 6,
    "allianceNameShort": "#6",
    "allianceNameLong": "Alliance 6",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 20,
    "allianceRank": 5,
    "allianceNameShort": "#5",
    "allianceNameLong": "Alliance 5",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 23,
    "allianceRank": 7,
    "allianceNameShort": "#7",
    "allianceNameLong": "Alliance 7",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 32,
    "allianceRank": 7,
    "allianceNameShort": "#7",
    "allianceNameLong": "Alliance 7",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 40,
    "allianceRank": 3,
    "allianceNameShort": "#3",
    "allianceNameLong": "Alliance 3",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 51,
    "allianceRank": 4,
    "allianceNameShort": "#4",
    "allianceNameLong": "Alliance 4",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 54,
    "allianceRank": 3,
    "allianceNameShort": "#3",
    "allianceNameLong": "Alliance 3",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 56,
    "allianceRank": 1,
    "allianceNameShort": "#1",
    "allianceNameLong": "Alliance 1",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 60,
    "allianceRank": 6,
    "allianceNameShort": "#6",
    "allianceNameLong": "Alliance 6",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 62,
    "allianceRank": 2,
    "allianceNameShort": "#2",
    "allianceNameLong": "Alliance 2",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 67,
    "allianceRank": 2,
    "allianceNameShort": "#2",
    "allianceNameLong": "Alliance 2",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 69,
    "allianceRank": 4,
    "allianceNameShort": "#4",
    "allianceNameLong": "Alliance 4",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 71,
    "allianceRank": 7,
    "allianceNameShort": "#7",
    "allianceNameLong": "Alliance 7",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 76,
    "allianceRank": 8,
    "allianceNameShort": "#8",
    "allianceNameLong": "Alliance 8",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 78,
    "allianceRank": 6,
    "allianceNameShort": "#6",
    "allianceNameLong": "Alliance 6",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 81,
    "allianceRank": 2,
    "allianceNameShort": "#2",
    "allianceNameLong": "Alliance 2",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 94,
    "allianceRank": 5,
    "allianceNameShort": "#5",
    "allianceNameLong": "Alliance 5",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 113,
    "allianceRank": 1,
    "allianceNameShort": "#1",
    "allianceNameLong": "Alliance 1",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 116,
    "allianceRank": 8,
    "allianceNameShort": "#8",
    "allianceNameLong": "Alliance 8",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 126,
    "allianceRank": 1,
    "allianceNameShort": "#1",
    "allianceNameLong": "Alliance 1",
    "isCaptain": 0,
    "pickOrder": 3
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 133,
    "allianceRank": 8,
    "allianceNameShort": "#8",
    "allianceNameLong": "Alliance 8",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 134,
    "allianceRank": 7,
    "allianceNameShort": "#7",
    "allianceNameLong": "Alliance 7",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 138,
    "allianceRank": 2,
    "allianceNameShort": "#2",
    "allianceNameLong": "Alliance 2",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 140,
    "allianceRank": 6,
    "allianceNameShort": "#6",
    "allianceNameLong": "Alliance 6",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 141,
    "allianceRank": 1,
    "allianceNameShort": "#1",
    "allianceNameLong": "Alliance 1",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 154,
    "allianceRank": 3,
    "allianceNameShort": "#3",
    "allianceNameLong": "Alliance 3",
    "isCaptain": 1,
    "pickOrder": 1
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 155,
    "allianceRank": 5,
    "allianceNameShort": "#5",
    "allianceNameLong": "Alliance 5",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 162,
    "allianceRank": 8,
    "allianceNameShort": "#8",
    "allianceNameLong": "Alliance 8",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 167,
    "allianceRank": 3,
    "allianceNameShort": "#3",
    "allianceNameLong": "Alliance 3",
    "isCaptain": 0,
    "pickOrder": 4
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 178,
    "allianceRank": 4,
    "allianceNameShort": "#4",
    "allianceNameLong": "Alliance 4",
    "isCaptain": 0,
    "pickOrder": 2
  },
  {
    "eventKey": "FGC_2024-FGC-CMP",
    "tournamentKey": "t2",
    "teamKey": 180,
    "allianceRank": 4,
    "allianceNameShort": "#4",
    "allianceNameLong": "Alliance 4",
    "isCaptain": 0,
    "pickOrder": 3
  }
]

const aliancesGrouped: any = {};

demoAlliances.forEach((alliance) => {
  if (!aliancesGrouped[alliance.allianceNameLong]) {
    aliancesGrouped[alliance.allianceNameLong] = [];
  }
  aliancesGrouped[alliance.allianceNameLong].push(alliance);
});

const alliancesSorted = Object.keys(aliancesGrouped).map((key) => {
  const alliance = {
    captain: null as any,
    pick1: null as any,
    pick2: null as any,
    pick3: null as any,
    name: key,
    rank: aliancesGrouped[key][0].allianceRank,
  }

  aliancesGrouped[key].forEach((team: any) => {
    switch (team.pickOrder) {
      case 1:
        alliance.captain = team;
        break;
      case 2:
        alliance.pick1 = team;
        break;
      case 3:
        alliance.pick2 = team;
        break;
      case 4:
        alliance.pick3 = team;
        break;
    }
  });
  return alliance;
}).sort((a: any, b: any) => a.rank - b.rank);

export const allianceData = alliancesSorted;