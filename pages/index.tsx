import { useEffect, useState } from "react";
import Head from "next/head";
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
import { useRouter } from "next/router";
import TeamModel from "@/components/team-model";

export default function Home({ data }) {
  const router = useRouter();
  const [tab, setTab] = useState("1");
  const [teamModal, setTeamModal] = useState<string | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleModalClose = () => {
    router.push("/", undefined, { shallow: true });
    setTeamModal(null);
  };

  useEffect(() => {
    if (typeof router.query.country === "string") {
      setTeamModal(router.query.country);
    } else {
      setTeamModal(null);
    }
  }, [router.query.country]);

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

          <Button variant="contained" startIcon={<StreamIcon />}>
            Watch Live
          </Button>
        </Stack>

        <Paper sx={{ p: 1 }} variant="outlined">
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Rankings" value="1" />
                <Tab label="Matches Results" value="2" />
                <Tab label="Awards" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: { xs: 0, md: 2 } }}>
              <RankingTable rankings={data.rankings} />
            </TabPanel>
            <TabPanel value="2" sx={{ p: { xs: 0, md: 2 } }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MatchList
                  matches={data.matches.filter((m) => m.tournamentLevel === 0)}
                />
              </Box>
            </TabPanel>
            <TabPanel value="3">TBD</TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3005/v1");
  const data = await res.json();

  return {
    props: { data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
