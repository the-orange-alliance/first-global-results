import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StreamIcon from "@mui/icons-material/PlayCircleOutlined";
import RankingTable from "@/components/ranking-table";
import Navigation from "@/components/navigation";
import MatchList from "@/components/match-list";
import TeamModel from "@/components/team-model";
import { getApiBase } from "@/lib";

export default function Home({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("rankings");
  const [teamModal, setTeamModal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Auto refresh data every 1 minute
    const interval = setInterval(async () => {
      const res = await fetch(getApiBase() + "/v1");
      const data = await res.json();
      setData(data);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof router.query.country === "string") {
      setTeamModal(router.query.country);
    } else {
      setTeamModal(null);
    }
  }, [router.query.country]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleModalClose = () => {
    router.push("/", undefined, { shallow: true });
    setTeamModal(null);
  };

  return (
    <div>
      <Head>
        <title>2022 FIRST Global Challenge Event Results</title>
      </Head>
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
              2022 <em>FIRST</em> Global Challenge Event Results
            </Typography>
            <Typography variant="subtitle1">
              13-16 October 2022 in Geneva, Switzerland
            </Typography>
          </Stack>

          <Button
            variant="contained"
            startIcon={<StreamIcon />}
            href="https://www.youtube.com/playlist?list=PL-RL-gR4GAffgbkM4fIChO3EpT2hrixXl"
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
                aria-label="lab API tabs example"
              >
                <Tab label="Rankings" value="rankings" />
                <Tab label="Matches Results" value="matches" />
                <Tab label="Awards" value="awards" />
              </TabList>
            </Box>
            <TabPanel value="rankings" sx={{ p: { xs: 0, md: 2 } }}>
              {data.rankings.length > 0 ? (
                <RankingTable rankings={data.rankings} />
              ) : (
                <Stack
                  direction="column"
                  alignItems="center"
                  py={8}
                  spacing={0.5}
                >
                  <Typography
                    component="h2"
                    fontSize="1.5rem"
                    fontWeight={700}
                    align="center"
                  >
                    No rankings available yet
                  </Typography>
                  <Typography
                    fontSize="1.125rem"
                    fontWeight={500}
                    align="center"
                    color="text.secondary"
                    px={1}
                  >
                    Hold tight, ranking matches haven’t begun yet.
                  </Typography>
                  <Box pt={1.5}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => setTab("matches")}
                    >
                      View Schedule
                    </Button>
                  </Box>
                </Stack>
              )}
            </TabPanel>
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
}

export async function getStaticProps() {
  const res = await fetch(getApiBase() + "/v1");
  const data = await res.json();

  return {
    props: { data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
