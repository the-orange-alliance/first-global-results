import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";
import { getFlagUrl } from "@/lib";
import { useTeamLink } from "@/components/team-link";
import type { AwardRecipient } from "./types";

/**
 * Flag for an award recipient, falling back to a blank swatch.
 *
 * Unlike the rankings and matches tabs, awards go to entities that never
 * competed — the African Union ("16"), sponsors, individuals — and those IAC
 * codes have no SVG under `public/static/flags`. A missing file would otherwise
 * render as a broken image, so a failed load degrades to an empty box instead.
 */
const Flag: React.FC<{ countryCode: string }> = ({ countryCode }) => {
  const [failed, setFailed] = useState(false);

  const sx = {
    flex: "0 0 auto",
    width: "1.25em",
    height: "0.9375em",
    borderRadius: "1px",
  };

  if (!countryCode || failed) {
    return (
      <Box
        sx={{
          ...sx,
          bgcolor: (theme) => theme.palette.grey[100],
          border: "1px solid",
          borderColor: (theme) => theme.palette.grey[200],
        }}
      />
    );
  }

  return (
    <Box sx={sx}>
      <Image
        src={getFlagUrl(countryCode.toLowerCase())}
        width={16}
        height={12}
        onError={() => setFailed(true)}
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: "100%",
        }}
        alt={`${countryCode} flag`}
      />
    </Box>
  );
};

interface RecipientProps {
  recipient: AwardRecipient;
  /**
   * Countries that have a ranking row this season. Only those open the team
   * modal — team-model.tsx closes itself immediately when it can't find a
   * matching ranking, so a link for a non-competitor would just flicker.
   */
  teamCountries: Set<string>;
}

const Recipient: React.FC<RecipientProps> = ({ recipient, teamCountries }) => {
  const { country, countryCode, recipientName } = recipient;
  const teamLink = useTeamLink();

  // The person or organization is the headline when there is one; the country
  // they came from drops to a subtitle underneath.
  const primary = recipientName || country;
  const isTeam = teamCountries.has(country);

  const name = isTeam ? (
    <NextLink
      {...teamLink(country)}
      prefetch={false}
      shallow
      passHref
      legacyBehavior
    >
      <Link underline="hover">{primary}</Link>
    </NextLink>
  ) : (
    primary
  );

  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, minWidth: 0 }}>
      <Box sx={{ alignSelf: "center", display: "flex" }}>
        <Flag countryCode={countryCode} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography component="div" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
          {name}
        </Typography>

        {recipientName && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "text.secondary", lineHeight: 1.3 }}
          >
            {country}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Recipient;
