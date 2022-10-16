import { Box, Stack, StackTypeMap } from "@mui/material";

interface MatchScoresProps {
  direction: StackTypeMap["props"]["direction"];
  red: number;
  blue: number;
}

const MatchScores: React.FC<MatchScoresProps> = ({ red, blue, direction }) => {
  return (
    <Stack direction={direction}>
      <Box
        bgcolor="var(--light-red)"
        px="1em"
        py="0.375em"
        fontSize="0.875em"
        fontWeight={red > blue ? 700 : undefined}
        width="4.25em"
        textAlign="center"
      >
        {red}
      </Box>
      <Box
        bgcolor="var(--light-blue)"
        px="1em"
        py="0.375em"
        fontSize="0.875em"
        fontWeight={blue > red ? 700 : undefined}
        width="4.25em"
        textAlign="center"
      >
        {blue}
      </Box>
    </Stack>
  );
};

export default MatchScores;
