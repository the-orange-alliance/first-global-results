import { Stack, Typography } from "@mui/material";
import MatchScores from "@/components/match-list/scores";
import MatchTeams from "@/components/match-list/teams";

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
  return (
    <Stack
      direction="column"
      spacing={0.25}
      alignItems={align === "center" ? "center" : "flex-start"}
    >
      <Stack direction="column" spacing={0.25} alignItems="flex-end">
        {matches.map((match) => (
          <Stack
            direction="row"
            key={match.matchKey}
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
            <MatchScores
              red={match.redScore}
              blue={match.blueScore}
              direction={{
                xs: "column",
                md: type === "column" ? "column" : "row",
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default MatchList;
