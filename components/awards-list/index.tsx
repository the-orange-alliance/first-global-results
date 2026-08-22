import { useMemo } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import BrandedText from "./branded-text";
import MedalLine, { HONORABLE_MENTION, MEDALS } from "./medal-line";
import type { Award, AwardRecipient } from "./types";

const AwardCard: React.FC<{
  award: Award;
  teamCountries: Set<string>;
}> = ({ award, teamCountries }) => {
  const medals = MEDALS.map((medal) => ({
    ...medal,
    // A category may go unawarded; those slots are null and render nothing
    // rather than an empty row.
    recipient: award[medal.key] as AwardRecipient | null,
  })).filter((medal) => medal.recipient);

  const other = award.other ?? [];

  return (
    <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 } }}>
      <Typography variant="h6">
        <BrandedText>{award.name}</BrandedText>
      </Typography>

      {award.description && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 0.25 }}
        >
          <BrandedText>{award.description}</BrandedText>
        </Typography>
      )}

      <Stack spacing={1} sx={{ mt: 1.5 }}>
        {medals.map((medal) => (
          <MedalLine
            key={medal.key}
            label={medal.label}
            color={medal.color}
            recipients={[medal.recipient as AwardRecipient]}
            teamCountries={teamCountries}
          />
        ))}

        {other.length > 0 && (
          <MedalLine
            label={HONORABLE_MENTION.label}
            color={HONORABLE_MENTION.color}
            recipients={other}
            teamCountries={teamCountries}
          />
        )}

        {medals.length === 0 && other.length === 0 && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Not yet presented.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

interface AwardsListProps {
  awards: Award[];
  /** Ranking rows for the season, used to decide which recipients link out. */
  rankings: any[];
}

const AwardsList: React.FC<AwardsListProps> = ({ awards, rankings }) => {
  const teamCountries = useMemo(
    () =>
      new Set<string>(
        (rankings || [])
          .map((rank) => rank?.team?.country)
          .filter((country): country is string => typeof country === "string")
      ),
    [rankings]
  );

  // Empty is the normal state mid-event and for most legacy seasons — awards
  // are uploaded after the closing ceremony.
  if (!awards || awards.length === 0) {
    return (
      <Box sx={{ py: 5, px: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Awards are presented at the closing ceremony. They will appear here
          once they have been announced.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.5}>
      {awards.map((award) => (
        <AwardCard
          key={award.name}
          award={award}
          teamCountries={teamCountries}
        />
      ))}
    </Stack>
  );
};

export default AwardsList;
