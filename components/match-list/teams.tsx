import NextLink from "next/link";
import Image from "next/image";
import { Box, Link, Stack, Tooltip } from "@mui/material";
import { getFlagUrl } from "@/lib";
import { useTeamLink } from "@/components/team-link";

type Alliance = "red" | "blue";

interface MatchTeamsProps {
  alliance: Alliance;
  participants: any[];
  isWinner: boolean;
  selectedTeamKey?: string;
}

const MatchTeams: React.FC<MatchTeamsProps> = ({
  alliance,
  participants,
  isWinner,
  selectedTeamKey,
}) => {
  const teamLink = useTeamLink();

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        bgcolor: alliance === "red" ? "var(--lighter-red)" : "var(--lighter-blue)",
        height: "100%"
      }}>
      {participants.map((participant) => (
        <Stack
          key={participant.station}
          direction="row"
          spacing="0.5em"
          style={{
            textDecoration:
              participant.tournamentKey !== "1" &&
              participant.station !== 14 &&
              participant.station !== 24
                ? "underline"
                : undefined,
          }}
          sx={{
            justifyContent: "center",
            px: "0.5em",
            py: "0.375em",
            fontSize: "0.875em",
            width: "4.75em",
            textAlign: "center",
            height: "100%",
            fontWeight: isWinner ? 700 : undefined,
            alignItems: "center",
            color: selectedTeamKey === participant.teamKey ? "white" : undefined,

            bgcolor: selectedTeamKey === participant.teamKey
              ? alliance === "red"
                ? "var(--red)"
                : "var(--blue)"
              : undefined
          }}>
          <Box>
            <Image
              src={getFlagUrl(participant.countryCode.toLowerCase())}
              width={16}
              height={12}
              style={{
                backgroundColor: "#ffffff",
                width: "1em",
                height: "0.75em",
              }}
              alt={`${participant.countryCode} flag`}
            />
          </Box>
          <NextLink
            {...teamLink(participant.country)}
            prefetch={false}
            shallow
            passHref
            legacyBehavior
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
              <Tooltip
                title={
                  participant.cardStatus === 2
                    ? "Disqualified (Red Card)"
                    : participant.noShow === 1
                    ? "No Show"
                    : participant.tournamentKey !== "1" &&
                      (participant.station === 14 || participant.station === 24)
                    ? "Did not play this during this match"
                    : ""
                }
                placement="top"
                arrow
              >
                <span
                  style={{
                    textDecoration:
                      participant.cardStatus === 2 ? "line-through" : undefined,
                  }}
                >
                  {participant.country}
                </span>
              </Tooltip>
            </Link>
          </NextLink>
        </Stack>
      ))}
    </Stack>
  );
};

export default MatchTeams;
