import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import MatchScores from "@/components/match-list/scores";
import MatchTeams from "@/components/match-list/teams";
import MatchTime from "@/components/match-list/time";

interface MatchListProps {
  matches: any[];
  type?: "column" | "responsive";
  align?: "start" | "center";
  selectedTeamKey?: string;
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  align = "center",
  type = "responsive",
  selectedTeamKey,
}) => {
  const sortedMatches = useMemo(
    () =>
      matches.sort((a, b) => {
        const matchNumber1 = parseInt(a.matchName.split(" ")[2]);
        const matchNumber2 = parseInt(b.matchName.split(" ")[2]);
        return (
          b.tournamentLevel * 1000 - a.tournamentLevel * 1000 ||
          matchNumber1 - matchNumber2
        );
      }),
    [matches]
  );

  const groupByTournamentLevel = useMemo(() => {
    const groups: any = {};
    sortedMatches.forEach((match) => {
      if (!groups[match.tournamentLevel]) {
        groups[match.tournamentLevel] = [];
      }
      groups[match.tournamentLevel].push(match);
    });
    return Object.entries<any[]>(groups);
  }, [sortedMatches]);

  return (
    <Stack
      direction="column"
      spacing={0.25}
      alignItems={align === "center" ? "center" : "flex-start"}
    >
      {groupByTournamentLevel.map(([tournamentLevel, matches], index) => (
        <Stack
          direction="column"
          spacing={0.25}
          alignItems="stretch"
          mb={2}
          key={tournamentLevel}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            py={0.75}
            bgcolor="rgba(0, 0, 0, 0.02)"
          >
            <Box
              bgcolor="white"
              border={1}
              borderColor="divider"
              py={0.675}
              px={1.75}
              borderRadius={4}
              fontSize="0.875rem"
              fontWeight={500}
            >
              {matches[0].matchName.match(/(.*) Match .*/)[1]} Matches
            </Box>
          </Stack>
          {matches.map((match, index) => (
            <Stack
              key={match.matchKey}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              bgcolor={index % 2 === 0 ? "white" : "rgba(0, 0, 0, 0.02)"}
              sx={
                match.participants.length > 4
                  ? {
                      fontSize: "1rem",
                      "@media (max-width: 500px)": {
                        fontSize: "0.875rem",
                      },
                      "@media (max-width: 400px)": {
                        fontSize: "0.75rem",
                      },
                    }
                  : undefined
              }
            >
              <Typography
                fontSize="0.75em"
                px="1em"
                textAlign="center"
                fontWeight={match.played ? 500 : undefined}
                color={
                  match.played
                    ? match.redScore > match.blueScore
                      ? "var(--red)"
                      : match.blueScore > match.redScore
                      ? "var(--blue)"
                      : "var(--green)"
                    : "text.secondary"
                }
              >
                {match.matchName}
              </Typography>
              <Stack direction="row">
                <Stack
                  direction={{
                    xs: "column",
                    md: type === "column" ? "column" : "row",
                  }}
                >
                  <MatchTeams
                    alliance="red"
                    isWinner={match.redScore > match.blueScore}
                    selectedTeamKey={selectedTeamKey}
                    participants={match.participants.filter(
                      (p) => p.station < 20
                    )}
                  />
                  <MatchTeams
                    alliance="blue"
                    isWinner={match.blueScore > match.redScore}
                    selectedTeamKey={selectedTeamKey}
                    participants={match.participants.filter(
                      (p) => p.station > 20
                    )}
                  />
                </Stack>
              </Stack>
              {match.played ? (
                <MatchScores
                  red={match.redScore}
                  blue={match.blueScore}
                  direction={{
                    xs: "column",
                    md: type === "column" ? "column" : "row",
                  }}
                />
              ) : (
                <MatchTime
                  match={match}
                  width={{
                    xs: "4rem",
                    md: type === "column" ? "4rem" : "8rem",
                  }}
                />
              )}
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default MatchList;
