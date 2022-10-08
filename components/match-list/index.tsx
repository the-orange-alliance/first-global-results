import { Stack, Typography } from "@mui/material";
import MatchScores from "@/components/match-list/scores";
import MatchTeams from "@/components/match-list/teams";

const MatchList = ({ matches }: { matches: any[] }) => {
  return (
    <Stack direction="column" spacing={0.25}>
      {matches.map((match) => (
        <Stack
          direction="row"
          key={match.match_key}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography fontSize="0.75rem" px={1.5} textAlign="center">
            {match.match_name}
          </Typography>
          <Stack direction="row">
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
            >
              <MatchTeams
                alliance="red"
                isWinner={match.red_score > match.blue_score}
                participants={match.participants.filter((p) => p.station < 20)}
              />
              <MatchTeams
                alliance="blue"
                isWinner={match.blue_score > match.red_score}
                participants={match.participants.filter((p) => p.station > 20)}
              />
            </Stack>
          </Stack>
          <MatchScores red={match.red_score} blue={match.blue_score} />
        </Stack>
      ))}
    </Stack>
  );
};

export default MatchList;
