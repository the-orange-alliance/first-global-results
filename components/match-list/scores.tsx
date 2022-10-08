import { Box, Stack } from "@mui/material";

interface MatchScoresProps {
  red: number;
  blue: number;
}

const MatchScores: React.FC<MatchScoresProps> = ({ red, blue }) => {
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
    >
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
