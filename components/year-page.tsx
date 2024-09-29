import { YearData } from "@/lib/data";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  Box,
  Tab,
} from "@mui/material";
import NextHeadSeo from "next-head-seo";
import MatchList from "./match-list";
import Navigation from "./navigation";
import RankingTable from "./ranking-table";
import TeamModel from "./team-model";
import StreamIcon from "@mui/icons-material/PlayCircleOutlined";
import AllianceTable from "./alliance-table";

interface IProps {
  data: any;
  teamModal: string | null;
  handleModalClose: () => void;
  tab: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  yearData: YearData;
}

const YearPage = ({
  data,
  teamModal,
  handleModalClose,
  tab,
  handleTabChange,
  yearData,
}: IProps) => {
  const yearI = parseInt(yearData.year);

  const showFinalsAlliances = Array.isArray(data.alliances_finals) && data.alliances_finals.length > 0;
  const showRoundRobinAlliances = Array.isArray(data.alliances_round_robin) && data.alliances_round_robin.length > 0;

  return (
    <div>
      <NextHeadSeo
        title={`${yearData.year} FIRST Global Challenge Event Results`}
      />
      <Navigation />
      <TeamModel country={teamModal} data={data} onClose={handleModalClose} />

      <Container sx={{ pb: 4 }}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          justifyContent="space-between"
          py={5}
          gap={1.5}
        >
          <Stack>
            <Typography variant="h1">
              {yearData.year} <em>FIRST</em> Global Challenge Event Results
            </Typography>
            <Typography variant="subtitle1">{yearData.date}</Typography>
          </Stack>

          <Button
            variant="contained"
            startIcon={<StreamIcon />}
            href={yearData.watchLinks.main}
            target="_blank"
          >
            Watch Live
          </Button>
        </Stack>

        <Paper sx={{ p: 1 }} variant="outlined">
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
              >

                {showFinalsAlliances && (
                  <Tab label="Finals" value="alliance_finals" />
                )}

                {showRoundRobinAlliances && (
                  <Tab label="Tournament" value="tournament" />
                )}

                {data.finals?.length > 0 && yearI < 2024 && (
                  <Tab label="Finals" value="finals" />
                )}

                {data.round_robin?.length > 0 && yearI < 2024 && (
                  <Tab label="Round Robin" value="round_robin" />
                )}

                <Tab label="Rankings" value="rankings" />
                <Tab label="Matches Results" value="matches" />
                <Tab label="Awards" value="awards" />
              </TabList>
            </Box>

            {/* Alliance Finals */}
            {showFinalsAlliances && (
              <TabPanel value="alliance_finals" sx={{ p: { xs: 0, md: 2 } }}>
                <AllianceTable alliances={data.alliances_finals} />
              </TabPanel>
            )}

            {/* Alliance Round Robin aka "Tournament" */}
            {showRoundRobinAlliances && (
              <TabPanel value="tournament" sx={{ p: { xs: 0, md: 2 } }}>
                <AllianceTable alliances={data.alliances_round_robin} />
              </TabPanel>
            )}

            {/* Old Finals Page pre-2024 */}
            {data.finals?.length > 0 && yearI < 2024 && (
              <TabPanel value="finals" sx={{ p: { xs: 0, md: 2 } }}>
                <RankingTable
                  rankings={data.finals}
                  type="PLAYOFF"
                  extraRankingItemKey={yearData.customRankingKey}
                  extraRankingItemTitle={yearData.customRankingName}
                />
              </TabPanel>
            )}

            {/* Old RR Page pre-2024 */}
            {data.round_robin?.length > 0 && yearI < 2024 && (
              <TabPanel value="round_robin" sx={{ p: { xs: 0, md: 2 } }}>
                <RankingTable
                  rankings={data.round_robin}
                  type="PLAYOFF"
                  extraRankingItemKey={yearData.customRankingKey}
                  extraRankingItemTitle={yearData.customRankingName}
                />
              </TabPanel>
            )}

            {/* Standard Rankings Table */}
            <TabPanel value="rankings" sx={{ p: { xs: 0, md: 2 } }}>
              <RankingTable
                rankings={data.rankings}
                type="RANKING"
                extraRankingItemKey={yearData.customRankingKey}
                extraRankingItemTitle={yearData.customRankingName}
              />
            </TabPanel>

            {/* Matches */}
            <TabPanel value="matches" sx={{ py: 1, px: { xs: 0, md: 2 } }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MatchList matches={data.matches} />
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                All times are displayed in your local timezone.
              </Typography>
            </TabPanel>
            <TabPanel value="awards">TBD</TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </div>
  );
};

export default YearPage;
