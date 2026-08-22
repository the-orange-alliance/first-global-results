import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";
import { getFlagUrl } from "@/lib";
import { useTeamLink } from "@/components/team-link";
import { normalizeCode, type AwardRecipient, type TeamsByCode } from "./types";

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
   * Competing teams keyed by IAC code, mapped to the `country` value the modal
   * URL uses. Only teams with a ranking row link out — team-model.tsx closes
   * itself when it can't find a matching ranking, so a link for a
   * non-competitor would just flicker.
   */
  teamsByCode: TeamsByCode;
}

const Recipient: React.FC<RecipientProps> = ({ recipient, teamsByCode }) => {
  const { country, countryCode, recipientName } = recipient;
  const teamLink = useTeamLink();

  // Join on the code, never on `country`: the awards collection stores a
  // display name ("Poland") while the teams collection stores whatever that
  // season used — for 2017 that's "POL", so matching on the name finds nothing.
  // The link then has to use the *team's* country value, because that is what
  // the modal resolves `?country=` against.
  const linkCountry = teamsByCode.get(normalizeCode(countryCode));

  // The team name always carries the link, wherever it lands: the modal is
  // about the team, not about the individual or sponsor being honoured.
  const teamName = linkCountry ? (
    <NextLink
      {...teamLink(linkCountry)}
      prefetch={false}
      shallow
      passHref
      legacyBehavior
    >
      <Link underline="hover">{country}</Link>
    </NextLink>
  ) : (
    country
  );

  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, minWidth: 0 }}>
      <Box sx={{ alignSelf: "center", display: "flex" }}>
        <Flag countryCode={countryCode} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        {/* The person or organization is the headline when there is one, and
            the team they represent drops to a subtitle underneath. */}
        <Typography component="div" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
          {recipientName || teamName}
        </Typography>

        {recipientName && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "text.secondary", lineHeight: 1.3 }}
          >
            {teamName}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Recipient;
