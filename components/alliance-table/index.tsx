import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { getFlagUrl } from "@/lib";

interface AllianceTableProps {
  alliances: any
}

const AllianceTable: React.FC<AllianceTableProps> = ({
  alliances
}) => {

  const teamWidth = 1.75;

  return (
    // Eight proportional columns can't shrink below the width of their own
    // text, so on a narrow screen this scrolls sideways instead of the columns
    // overlapping each other. Same treatment RankingTable gets from MUI's
    // TableContainer, and the same 750px floor it uses. The width sits on an
    // inner box rather than a `& > *` rule so it doesn't tie on specificity
    // with the `min-width: 0` that Grid sets on itself.
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: 750 }}>
        <Grid container>
          <Grid size={.75}>
            <Typography>
              Rank
            </Typography>
          </Grid>

          <Grid size={1.5}>
            <Typography>
              Alliance
            </Typography>
          </Grid>

          <Grid size={1.5}>
            <Typography>
              Rank Score
            </Typography>
          </Grid>

          <Grid size={1}>
            <Typography>
              Played
            </Typography>
          </Grid>

          <Grid size={teamWidth}>
            <Typography>
              Team 1
            </Typography>
          </Grid>

          <Grid size={teamWidth}>
            <Typography>
              Team 2
            </Typography>
          </Grid>

          <Grid size={teamWidth}>
            <Typography>
              Team 3
            </Typography>
          </Grid>

          <Grid size={teamWidth}>
            <Typography>
              Team 4
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        {alliances.map((alliance) => (
          <Grid container key={alliance.rank} sx={{ alignItems: 'center', my: 2 }}>
            <Grid size={.75}>
              <Typography>
                {alliance.rank}
              </Typography>
            </Grid>
            <Grid size={1.5}>
              <Typography>
                {alliance.name}
              </Typography>
            </Grid>
            <Grid size={1.5}>
              <Typography>
                {alliance.rankingScore ?? 0}
              </Typography>
            </Grid>
            <Grid size={1}>
              <Typography>
                {alliance.played ?? 0}
              </Typography>
            </Grid>

            {/* Captain */}
            <Grid size={teamWidth} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Image
                  src={getFlagUrl(alliance.captain.team?.countryCode.toLowerCase())}
                  width={16}
                  height={12}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "1em",
                    height: "0.75em",
                  }}
                  alt={`${alliance.captain.team?.countryCode} flag`}
                />
              </Box>
              <Typography>
                {alliance.captain.team ? alliance.captain.team.country : alliance.captain.teamKey}
              </Typography>
            </Grid>

            {/* Pick 1 */}
            <Grid size={teamWidth} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Image
                  src={getFlagUrl(alliance.pick1.team?.countryCode.toLowerCase())}
                  width={16}
                  height={12}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "1em",
                    height: "0.75em",
                  }}
                  alt={`${alliance.captain.team?.countryCode} flag`}
                />
              </Box>
              <Typography>
                {alliance.pick1.team ? alliance.pick1.team.country : alliance.pick1.teamKey}
              </Typography>
            </Grid>

            {/* Pick 2 */}
            <Grid size={teamWidth} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Image
                  src={getFlagUrl(alliance.pick2.team?.countryCode.toLowerCase())}
                  width={16}
                  height={12}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "1em",
                    height: "0.75em",
                  }}
                  alt={`${alliance.pick2.team?.countryCode} flag`}
                />
              </Box>
              <Typography>
                {alliance.pick2.team ? alliance.pick2.team.country : alliance.pick2.teamKey}
              </Typography>
            </Grid>

            {/* Pick 3 */}
            <Grid size={teamWidth} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Image
                  src={getFlagUrl(alliance.pick3.team?.countryCode.toLowerCase())}
                  width={16}
                  height={12}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "1em",
                    height: "0.75em",
                  }}
                  alt={`${alliance.pick3.team?.countryCode} flag`}
                />
              </Box>
              <Typography>
                {alliance.pick3.team ? alliance.pick3.team.country : alliance.pick3.teamKey}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  )
};

export default AllianceTable;
