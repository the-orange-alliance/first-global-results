import { useMemo, useState } from "react";
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
  useMediaQuery,
} from "@mui/material";
import NextHeadSeo from "next-head-seo";
import MatchList from "./match-list";
import Navigation from "./navigation";
import RankingTable from "./ranking-table";
import TeamModel from "./team-model";
import StreamIcon from "@mui/icons-material/PlayCircleOutlined";
import AllianceTable from "./alliance-table";
import AwardsList from "./awards-list";
import { normalizeCode } from "./awards-list/types";
import {
  NoSearchResults,
  TabSearch,
  TabSearchRow,
  countryMatches,
  normalizeSearch,
} from "./tab-search";

interface IProps {
  data: any;
  teamModal: string | null;
  handleModalClose: () => void;
  tab: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  yearData: YearData;
}

/**
 * Picks the tab to open on first paint.  Mirrors the render conditions in the
 * TabList below, in the same order, so it can never select a tab that isn't
 * rendered — which would leave the panel blank until the user clicked.
 */
export const getDefaultTab = (data: any, year: number): string => {
  if (data.alliances_finals?.length > 0) return "alliance_finals";
  if (data.alliances_round_robin?.length > 0) return "tournament";
  if (data.finals?.length > 0 && year < 2024) return "finals";
  if (data.round_robin?.length > 0 && year < 2024) return "round_robin";
  return "rankings";
};

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

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  // One query filters every tab, so switching tabs keeps the same countries in
  // view. With no query the original arrays pass straight through, keeping
  // MatchList's row cache and the tables' memos untouched.
  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return data;

    // Ranking rows carry the full team record. Matches and awards only carry
    // `country`, which some seasons store as a code ("POL" in 2017), so they
    // are also matched against the team they point at.
    const teams: any[] = (data.rankings ?? []).map((r: any) => r.team).filter(Boolean);
    const byKey = new Map<number, any>(teams.map((t) => [t.teamKey, t]));
    const byCode = new Map<string, any>(teams.map((t) => [normalizeCode(t.countryCode), t]));

    const rankRows = (rows: any[] | undefined) =>
      rows?.filter((row) => countryMatches(q, row.team));
    const alliances = (rows: any[] | undefined) =>
      rows?.filter((a) =>
        [a.captain, a.pick1, a.pick2, a.pick3].some((s) => countryMatches(q, s?.team))
      );
    const participant = (p: any) =>
      countryMatches(q, p) || countryMatches(q, byKey.get(p.teamKey));
    const recipient = (r: any) =>
      !!r && (countryMatches(q, r) || countryMatches(q, byCode.get(normalizeCode(r.countryCode))));

    return {
      ...data,
      rankings: rankRows(data.rankings),
      finals: rankRows(data.finals),
      round_robin: rankRows(data.round_robin),
      alliances_finals: alliances(data.alliances_finals),
      alliances_round_robin: alliances(data.alliances_round_robin),
      matches: data.matches?.filter((m: any) => m.participants?.some(participant)),
      awards: data.awards?.filter((a: any) =>
        [a.gold, a.silver, a.bronze, ...(a.other ?? [])].some(recipient)
      ),
    };
  }, [data, query]);

  const searching = normalizeSearch(query) !== "";
  const noResults = (rows: any[] | undefined) =>
    searching && !rows?.length ? <NoSearchResults query={query} /> : null;

  return (
    <div>
      <NextHeadSeo
        title={`${yearData.year} FIRST Global Challenge Event Results`}
      />
      <Navigation />
      <TeamModel
        country={teamModal}
        data={data}
        year={yearI}
        onClose={handleModalClose}
      />

      <Container sx={{ pb: 4 }}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            alignItems: {
              xs: "flex-start",
              md: "center",
            },

            justifyContent: "space-between",
            py: 5,
            gap: 1.5
          }}>
          <Stack>
            <Typography variant="h1">
              {yearData.year} <em>FIRST</em> Global Challenge Event Results
            </Typography>
            <Typography variant="subtitle1">{yearData.date}</Typography>
          </Stack>

          {yearData.watchLinks ? (
            <Button
              variant="contained"
              startIcon={<StreamIcon />}
              href={yearData.watchLinks.main}
              target="_blank"
            >
              Watch Live
            </Button>
          ) : (
            <Button variant="contained" startIcon={<StreamIcon />} disabled>
              Streams Coming Soon
            </Button>
          )}
        </Stack>

        <Paper sx={{ p: 1 }} variant="outlined">
          <TabContext value={tab}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Up to six tabs don't fit on a phone. Scrollable keeps them on
                  one row and lets that row scroll on its own, rather than the
                  widest tab dragging the whole page sideways. Above ~600px
                  everything fits and this renders identically to a fixed
                  TabList. */}
              <TabList
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{ flex: 1, minWidth: 0 }}
              >

                {showFinalsAlliances && (
                  <Tab label="Finals" value="alliance_finals" />
                )}

                {showRoundRobinAlliances && (
                  <Tab label="Tournament" value="tournament" />
                )}

                {data.finals?.length > 0 && yearI < 2022 && (
                  <Tab label="Finals" value="finals" />
                )}

                {data.round_robin?.length > 0 && yearI < 2022 && (
                  <Tab label="Round Robin" value="round_robin" />
                )}

                <Tab label="Rankings" value="rankings" />
                <Tab label="Matches Results" value="matches" />
                <Tab label="Awards" value="awards" />
              </TabList>

              <TabSearch
                inline={isDesktop}
                open={searchOpen}
                query={query}
                onQueryChange={setQuery}
                onOpen={() => setSearchOpen(true)}
                onClose={closeSearch}
              />
            </Box>

            {!isDesktop && (
              <TabSearchRow
                open={searchOpen}
                query={query}
                onQueryChange={setQuery}
                onClose={closeSearch}
              />
            )}

            {/* Alliance Finals */}
            {showFinalsAlliances && (
              <TabPanel value="alliance_finals" sx={{ p: { xs: 0, md: 2 } }}>
                {noResults(filtered.alliances_finals) ?? (
                  <AllianceTable alliances={filtered.alliances_finals} />
                )}
              </TabPanel>
            )}

            {/* Alliance Round Robin aka "Tournament" */}
            {showRoundRobinAlliances && (
              <TabPanel value="tournament" sx={{ p: { xs: 0, md: 2 } }}>
                {noResults(filtered.alliances_round_robin) ?? (
                  <AllianceTable alliances={filtered.alliances_round_robin} />
                )}
              </TabPanel>
            )}

            {/* Old Finals Page pre-2024 */}
            {data.finals?.length > 0 && yearI < 2024 && (
              <TabPanel value="finals" sx={{ p: { xs: 0, md: 2 } }}>
                {noResults(filtered.finals) ?? (
                  <RankingTable
                    rankings={filtered.finals}
                    type="PLAYOFF"
                    extraRankingItemKey={yearData.customRankingKey}
                    extraRankingItemTitle={yearData.customRankingName}
                    rankingScoreTitle={yearData.rankingScoreName}
                  />
                )}
              </TabPanel>
            )}

            {/* Old RR Page pre-2024 */}
            {data.round_robin?.length > 0 && yearI < 2024 && (
              <TabPanel value="round_robin" sx={{ p: { xs: 0, md: 2 } }}>
                {noResults(filtered.round_robin) ?? (
                  <RankingTable
                    rankings={filtered.round_robin}
                    type="PLAYOFF"
                    extraRankingItemKey={yearData.customRankingKey}
                    extraRankingItemTitle={yearData.customRankingName}
                    rankingScoreTitle={yearData.rankingScoreName}
                  />
                )}
              </TabPanel>
            )}

            {/* Standard Rankings Table */}
            <TabPanel value="rankings" sx={{ p: { xs: 0, md: 2 } }}>
              {noResults(filtered.rankings) ?? (
                <RankingTable
                  rankings={filtered.rankings}
                  type="RANKING"
                  extraRankingItemKey={yearData.customRankingKey}
                  extraRankingItemTitle={yearData.customRankingName}
                  rankingScoreTitle={yearData.rankingScoreName}
                />
              )}
            </TabPanel>

            {/* Matches */}
            <TabPanel value="matches" sx={{ py: 1, px: { xs: 0, md: 2 } }}>
              {noResults(filtered.matches) ?? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <MatchList matches={filtered.matches} />
                </Box>
              )}
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 2
                }}>
                All times are displayed in your local timezone.
              </Typography>
            </TabPanel>
            {/* `?? []` guards the history pages, which serve a force-cached
                /v1 response that may predate the awards key. */}
            <TabPanel value="awards" sx={{ p: { xs: 1, md: 2 } }}>
              {noResults(filtered.awards) ?? (
                <AwardsList
                  awards={filtered.awards ?? []}
                  rankings={data.rankings ?? []}
                />
              )}
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </div>
  );
};

export default YearPage;
