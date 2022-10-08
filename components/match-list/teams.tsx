import { Box, Stack } from "@mui/material";

type Alliance = "red" | "blue";

interface MatchTeamsProps {
  alliance: Alliance;
  participants: any[];
  isWinner: boolean;
}

const MatchTeams: React.FC<MatchTeamsProps> = ({
  alliance,
  participants,
  isWinner,
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      bgcolor={alliance === "red" ? "#FFEEEE" : "#EEEEFF"}
    >
      {participants.map((participant) => (
        <Stack
          key={participant.match_participant_key}
          direction="row"
          justifyContent="center"
          px={1.5}
          py={0.5}
          fontSize="0.875rem"
          width="4.5rem"
          textAlign="center"
          spacing={0.75}
          fontWeight={isWinner ? 700 : undefined}
        >
          <Box>
            <img
              src={`/static/flags/4x3/${participant.team.country_code}.svg`}
              style={{ height: "0.75rem" }}
              alt=""
            />
          </Box>
          <span>{participant.team.country}</span>
        </Stack>
      ))}
    </Stack>
  );
};

export default MatchTeams;
