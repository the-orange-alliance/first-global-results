import { useState } from "react";
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
import data from "../data.json";

export default function Home() {
  const [tab, setTab] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  console.log(data);
  return (
    <div>
      <Head>
        <title>2022 FIRST Global Challenge Event Results</title>
      </Head>
      <Navigation />
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
            <TabPanel value="1">
              <RankingTable rankings={data.rankings} />
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MatchList
                  matches={data.matches.filter((m) => m.tournament_level === 1)}
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
