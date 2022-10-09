import { useRouter } from "next/router";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  AlphaCBoxOutline,
  ChevronTripleUp,
  FlagOutline,
} from "mdi-material-ui";
import CloseIcon from "mdi-material-ui/Close";
import HighestScoreIcon from "mdi-material-ui/Shimmer";
import MatchesPlayedIcon from "mdi-material-ui/CheckDecagramOutline";
import MatchList from "@/components/match-list";
import DetailsList from "./details-list";

interface TeamModelProps {
  country: string;
  data: any;
  onClose?: () => void;
}

const TeamModel: React.FC<TeamModelProps> = ({ country, data, onClose }) => {
  const { team, ...rank } = data.rankings.find(
    (rank) => rank.team.country === country
  );

  const matches = data.matches.filter((match) =>
    match.participants.some((p) => p.teamKey === rank.teamKey)
  );

  return (
    <Dialog
      open
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
          display="inline-block"
          border="1px solid"
          color={(theme) => theme.palette.primary[600]}
          borderColor={(theme) => theme.palette.primary[300]}
          bgcolor={(theme) => theme.palette.primary[50]}
          fontWeight={500}
          borderRadius="0.75rem"
          py={0.5}
          px={2}
        >
          Rank #{rank.rank}
        </Box>

        <DetailsList>
          <DetailsList.Item icon={<ChevronTripleUp />} title="Ranking Score">
            {rank.rankingScore}
          </DetailsList.Item>
          <DetailsList.Item icon={<FlagOutline />} title="Win-Lose-Tie">
            {rank.wins}-{rank.losses}-{rank.ties}
          </DetailsList.Item>
          <DetailsList.Item icon={<HighestScoreIcon />} title="Highest Score">
            {rank.highestScore}
          </DetailsList.Item>
          <DetailsList.Item icon={<AlphaCBoxOutline />} title="Carbon Points">
            {rank.carbonPoints}
          </DetailsList.Item>
          <DetailsList.Item icon={<MatchesPlayedIcon />} title="Matches Played">
            {rank.played}
          </DetailsList.Item>
        </DetailsList>

        <MatchList matches={matches} type="column" />
      </DialogContent>
    </Dialog>
  );
};

export default TeamModel;
