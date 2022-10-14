import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import MatchScores from "@/components/match-list/scores";
import MatchTeams from "@/components/match-list/teams";
import MatchTime from "@/components/match-list/time";

interface MatchListProps {
  matches: any[];
  type?: "column" | "responsive";
  align?: "start" | "center";
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  align = "center",
  type = "responsive",
}) => {
  const sortedMatches = useMemo(
    () =>
      matches.sort((a, b) => {
        const matchNumber1 = parseInt(a.matchName.split(" ")[2]);
        const matchNumber2 = parseInt(b.matchName.split(" ")[2]);
        return (
          a.tournamentLevel * 1000 - b.tournamentLevel * 1000|| matchNumber1 - matchNumber2;
        );
      }),
    [matches]
  );

  return (
    <Stack
      direction="column"
      spacing={0.25}
      alignItems={align === "center" ? "center" : "flex-start"}
    >
      <Stack direction="column" spacing={0.25} alignItems="flex-end">
        {sortedMatches.map((match, index) => (
          <React.Fragment key={match.matchKey}>
            {(index === 0 ||
              sortedMatches[index - 1].tournamentLevel !==
                match.tournamentLevel) && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignSelf="stretch"
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
                  {match.matchName.split(" ")[0]} Matches
                </Box>
              </Stack>
            )}
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography fontSize="0.75rem" px={1.5} textAlign="center">
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
                    participants={match.participants.filter(
                      (p) => p.station < 20
                    )}
                  />
                  <MatchTeams
                    alliance="blue"
                    isWinner={match.blueScore > match.redScore}
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
                  startTime={match.startTime}
                  width={{
                    xs: "4rem",
                    md: type === "column" ? "4rem" : "8rem",
                  }}
                />
              )}
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default MatchList;
