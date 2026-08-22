import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Paper,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/CloseRounded";
import RankIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import HighestScoreIcon from "@mui/icons-material/Insights";
import MatchesPlayedIcon from "@mui/icons-material/VerifiedOutlined";
import NextMatchIcon from "@mui/icons-material/ScheduleRounded";
import moment from "moment";
import DetailsList from "@/components/details-list";
import MatchList from "@/components/match-list";
import BrandedText from "@/components/awards-list/branded-text";
import MedalLine from "@/components/awards-list/medal-line";
import { teamAwards } from "@/components/awards-list/team-awards";
import { pastYears, watchLinks, yearData } from "@/lib/data";
import { AddOutlined } from "@mui/icons-material";

/** Stable empty set: award lines in here never link back to this same modal. */
const EMPTY_COUNTRIES = new Set<string>();

interface TeamModelProps {
  country: string;
  data: any;
  year?: number;
  onClose?: () => void;
}

const MobileTransition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TeamModel: React.FC<TeamModelProps> = ({ country, data, onClose, year }) => {
  const [countryData, setCountryData] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width: 899px)");

  if (!year) {
    year = pastYears[pastYears.length - 1] + 1;
  }

  const yearDataInfo = yearData[year];

  useEffect(() => {
    if (country) {
      const ranking = data.rankings.find(
        (rank) => rank.team.country === country
      );
      if (!ranking) return onClose?.();

      const { team, ...rank } = ranking;
      const matches = data.matches.filter((match) =>
        match.participants.some((p) => p.teamKey === rank.teamKey)
      );
      setCountryData({ team, rank, matches });
    }
  }, [country, data, onClose]);

  // Hooks cannot sit behind the countryData guard below, so this runs on every
  // render and simply yields nothing until a country is selected.
  const awards = useMemo(
    () => teamAwards(data?.awards, countryData?.team?.country),
    [data?.awards, countryData?.team?.country]
  );

  if (!countryData) return;

  const { team, rank, matches } = countryData;

  const nextMatch = matches.find((match) => !match.played);

  return (
    <Dialog
      open={!!country}
      slots={{ transition: isMobile ? MobileTransition : undefined }}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          position: {
            xs: "absolute",
            md: "relative",
          },
          left: { xs: 0, md: "unset" },
          bottom: { xs: 0, md: "unset" },
          maxWidth: { xs: "unset", md: 600 },
          width: { xs: "100%", md: "unset" },
          m: { xs: 0, md: "2rem" },
          borderRadius: {
            xs: "1.5rem 1.5rem 0rem 0rem",
            md: "1.5rem",
          },
          pt: 1.5,
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: "1.75rem",
          fontWeight: 700,
          display: "flex",
        }}
      >
        {team.name} ({team.country})
        <Button
          onClick={onClose}
          sx={{
            ml: "auto",
            minWidth: "unset",
            alignSelf: "center",
            p: 0.75,
            borderRadius: "50%",
            color: "text.primary",
            bgcolor: (theme) => theme.palette.grey[50],
            "&:hover": {
              bgcolor: (theme) => theme.palette.grey[100],
            },
          }}
        >
          <CloseIcon
            sx={{
              height: "1.675rem",
              width: "1.675rem",
            }}
          />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "inline-block",
            border: "1px solid",
            color: (theme) => theme.palette.primary[600],
            borderColor: (theme) => theme.palette.primary[300],
            bgcolor: (theme) => theme.palette.primary[50],
            fontWeight: 500,
            borderRadius: "0.75rem",
            py: 0.5,
            px: 2
          }}>
          Rank #{rank.rank}
        </Box>

        <DetailsList>
          <DetailsList.Item
            icon={<RankIcon />}
            title={yearDataInfo?.rankingScoreName ?? "Ranking Score"}
          >
            {rank.rankingScore}
          </DetailsList.Item>
          <DetailsList.Item icon={<HighestScoreIcon />} title="Highest Score">
            {rank.highestScore}
          </DetailsList.Item>
          {/* <DetailsList.Item
            icon={<AddOutlined />}
            title={yearDataInfo.customRankingName}
          >
            {rank[yearDataInfo.customRankingKey]}
          </DetailsList.Item> */}
          <DetailsList.Item icon={<MatchesPlayedIcon />} title="Matches Played">
            {rank.played}
          </DetailsList.Item>
          {nextMatch?.scheduledTime && (
            <DetailsList.Item
              icon={<NextMatchIcon />}
              title="Next Match"
              font="normal"
            >
              {moment(nextMatch.scheduledTime).format("HH:mm")}{" "}
              <Typography
                component="span"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  display: {
                    xs: "block",
                    md: "inline-block",
                  },
                  fontSize: {
                    xs: "0.875rem",
                    md: "1rem",
                  },
                  fontWeight: "normal",
                  lineHeight: 1.2,
                  "&:before": {
                    md: { content: '"("' },
                  },
                  "&:after": {
                    md: { content: '")"' },
                  },
                }}
              >
                {nextMatch.name},{" "}
                <Link
                  href={
                    watchLinks["field" + nextMatch.field] || watchLinks.main
                  }
                  target="_blank"
                >
                  Field {nextMatch.field}
                </Link>
              </Typography>
            </DetailsList.Item>
          )}
        </DetailsList>

        {awards.length > 0 && (
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {awards.map(({ award, lines }) => (
              <Paper
                key={award.name}
                variant="outlined"
                sx={{ p: { xs: 1.5, md: 2 } }}
              >
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
                      // Every recipient here is the team whose modal this is,
                      // so a link would just point back at the open dialog.
                      teamCountries={EMPTY_COUNTRIES}
                    />
                  ))}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        <MatchList
          matches={matches}
          type="column"
          selectedTeamKey={team.teamKey}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TeamModel;
