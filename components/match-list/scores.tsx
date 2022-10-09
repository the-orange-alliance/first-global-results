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
        bgcolor="#FFDDDD"
        px={1.5}
        py={0.5}
        fontSize="0.875rem"
        fontWeight={red > blue ? 700 : undefined}
        width="4rem"
        textAlign="center"
      >
        {red}
      </Box>
      <Box
        bgcolor="#DDDDFF"
        px={1.5}
        py={0.5}
        fontSize="0.875rem"
        fontWeight={blue > red ? 700 : undefined}
        width="4rem"
        textAlign="center"
      >
        {blue}
      </Box>
    </Stack>
  );
};

export default MatchScores;
