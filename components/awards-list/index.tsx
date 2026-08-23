import { useMemo } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import BrandedText from "./branded-text";
import { awardLines } from "./lines";
import MedalLine from "./medal-line";
import { teamsByCodeFrom, type Award, type TeamsByCode } from "./types";

const AwardCard: React.FC<{
  award: Award;
  teamsByCode: TeamsByCode;
}> = ({ award, teamsByCode }) => {
  // Not every award hands out every medal, and a medal can be shared, so the
  // rows are derived rather than fixed. Empty ones are already dropped.
  const lines = awardLines(award);

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
        {lines.map((line) => (
          <MedalLine
            key={line.key}
            label={line.label}
            color={line.color}
            recipients={line.recipients}
            teamsByCode={teamsByCode}
          />
        ))}

        {lines.length === 0 && (
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
  const teamsByCode = useMemo(() => teamsByCodeFrom(rankings), [rankings]);

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
          teamsByCode={teamsByCode}
        />
      ))}
    </Stack>
  );
};

export default AwardsList;
