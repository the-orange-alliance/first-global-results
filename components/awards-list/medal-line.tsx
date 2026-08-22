import { Box, Stack, Typography } from "@mui/material";
import Recipient from "./recipient";
import type { AwardRecipient, TeamsByCode } from "./types";

/** Medal slots in ceremony order. `silver` is the theme's grey[400]. */
export const MEDALS = [
  { key: "gold", label: "Gold", color: "#D4AF37" },
  { key: "silver", label: "Silver", color: "#B2BAC2" },
  { key: "bronze", label: "Bronze", color: "#CD7F32" },
] as const;

export type MedalKey = (typeof MEDALS)[number]["key"];

/** Non-medal recipients share one line, labelled and coloured as grey[300]. */
export const HONORABLE_MENTION = {
  key: "other",
  label: "Honorable Mention",
  color: "#CDD2D7",
} as const;

/** Width of the label column, so recipients line up down the card. */
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

interface MedalLineProps {
  label: string;
  color: string;
  /** One entry for a medal, possibly several for honorable mentions. */
  recipients: AwardRecipient[];
  teamsByCode: TeamsByCode;
}

/**
 * One labelled row of an award: the medal marker and who received it.
 *
 * Shared by the awards tab and the team modal so a team's award reads the same
 * in both places.
 */
const MedalLine: React.FC<MedalLineProps> = ({
  label,
  color,
  recipients,
  teamsByCode,
}) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
    <Medal label={label} color={color} />
    <Stack spacing={0.5}>
      {recipients.map((recipient, index) => (
        <Recipient
          key={`${recipient.country}-${index}`}
          recipient={recipient}
          teamsByCode={teamsByCode}
        />
      ))}
    </Stack>
  </Box>
);

export default MedalLine;
