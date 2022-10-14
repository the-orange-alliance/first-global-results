import NextLink from "next/link";
import Image from "next/future/image";
import { Box, Link, Stack } from "@mui/material";

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
      spacing={{
        xs: 0.25,
        md: 1,
      }}
      bgcolor={alliance === "red" ? "#FFEEEE" : "#EEEEFF"}
    >
      {participants.map((participant) => (
        <Stack
          key={participant.station}
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
            <Image
              src={`/static/flags/4x3/${participant.countryCode.toLowerCase()}.svg`}
              width={16}
              height={12}
              style={{ backgroundColor: "#ffffff" }}
              alt={`${participant.countryCode} flag`}
            />
          </Box>
          <NextLink
            href={`/team/${participant.country}`}
            shallow
            prefetch={false}
          >
            <Link
              underline="hover"
              sx={{
                color: "inherit",
                "&:hover": {
                  color: "inherit",
                },
              }}
            >
              {participant.country}
            </Link>
          </NextLink>
        </Stack>
      ))}
    </Stack>
  );
};

export default MatchTeams;
