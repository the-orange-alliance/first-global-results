import { useMemo } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Recipient from "./recipient";
import type { Award, AwardRecipient } from "./types";

/** Medal slots in ceremony order. `silver` is the theme's grey[400]. */
const MEDALS = [
  { key: "gold", label: "Gold", color: "#D4AF37" },
  { key: "silver", label: "Silver", color: "#B2BAC2" },
  { key: "bronze", label: "Bronze", color: "#CD7F32" },
] as const;

/** Width of the medal label column, so recipients line up down the card. */
const LABEL_WIDTH = { xs: "5.5rem", md: "7rem" };

const Medal: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <Box
    sx={{
      flex: "0 0 auto",
      width: LABEL_WIDTH,
      display: "flex",
      alignItems: "center",
      gap: 0.75,
      pt: "0.125rem",
    }}
  >
    <Box
      sx={{
        flex: "0 0 auto",
        width: "0.625rem",
        height: "0.625rem",
        borderRadius: "50%",
        bgcolor: color,
      }}
    />
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
  </Box>
);

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
      <Typography variant="h6">{award.name}</Typography>

      {award.description && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 0.25 }}
        >
          {award.description}
        </Typography>
      )}

      <Stack spacing={1} sx={{ mt: 1.5 }}>
        {medals.map((medal) => (
          <Box
            key={medal.key}
            sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
          >
            <Medal label={medal.label} color={medal.color} />
            <Recipient
              recipient={medal.recipient as AwardRecipient}
              teamCountries={teamCountries}
            />
          </Box>
        ))}

        {other.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Medal label="Honorable Mention" color="#CDD2D7" />
            <Stack spacing={0.5}>
              {other.map((recipient, index) => (
                <Recipient
                  key={`${recipient.country}-${index}`}
                  recipient={recipient}
                  teamCountries={teamCountries}
                />
              ))}
            </Stack>
          </Box>
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
