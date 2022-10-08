import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import NextLink from "next/link";
import { Link } from "@mui/material";

type Order = "asc" | "desc";

interface Rank {
  rankKey: string;
  teamKey: number;
  rank: number;
  rankChange: number;
  played: number;
  wins: number;
  losses: number;
  ties: number;
  rankingScore: number;
  highestScore: number;
  carbonPoints: number;
  allianceKey: string;
  team: any;
}
type ColumnKey = keyof Rank | string;

const columns: {
  key: ColumnKey;
  label: string;
  isSortable?: boolean;
}[] = [
  { key: "rank", label: "Rank", isSortable: true },
  { key: "team", label: "Team" },
  { key: "rankingScore", label: "Ranking Score", isSortable: true },
  { key: "record", label: "Record (W-L-T)", isSortable: true },
  { key: "highestScore", label: "Highest Points", isSortable: true },
  {
    key: "carbonPoints",
    label: "Carbon Points",
    isSortable: true,
  },
  { key: "played", label: "Played", isSortable: true },
];

const RankingTable = ({ rankings }: { rankings: Rank[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<ColumnKey>("rank");

  const handleRequestSort = (key: ColumnKey) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };
  const createSortHandler =
    (key: ColumnKey) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(key);
    };

  const sortedRankings = React.useMemo(() => {
    const sorted = [...rankings];
    sorted.sort((rank1, rank2) => {
      let a = rank1[orderBy];
      let b = rank2[orderBy];

      if (orderBy === "record") {
        a = rank1.wins + 0.5 * rank1.ties;
        b = rank2.wins + 0.5 * rank2.ties;
      }

      if (a < b) {
        return order === "desc" ? 1 : -1;
      } else if (a > b) {
        return order === "desc" ? -1 : 1;
      } else {
        return 0;
      }
    });
    return sorted;
  }, [order, orderBy, rankings]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell
                  key={col.key}
                  sortDirection={orderBy === col.key ? order : false}
                  sx={{ p: 1, fontSize: "0.75rem" }}
                >
                  {col.isSortable ? (
                    <Tooltip
                      title="Sort"
                      placement="bottom-end"
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === col.key}
                        direction={order}
                        onClick={createSortHandler(col.key)}
                        sx={{
                          "& .MuiTableSortLabel-icon": {
                            height: "1rem",
                            width: "1rem",
                          },
                        }}
                      >
                        {col.label}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    col.label
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRankings.map((ranking) => {
            return (
              <TableRow key={ranking.rankKey}>
                <TableCell>#{ranking.rank}</TableCell>
                <TableCell>
                  <NextLink href={`/team/${ranking.teamKey}`}>
                    <Link underline="hover">
                      {ranking.team.shortName ||
                        ranking.team.name ||
                        ranking.teamKey}
                    </Link>
                  </NextLink>
                </TableCell>
                <TableCell>{ranking.rankingScore}</TableCell>
                <TableCell>
                  {ranking.wins}-{ranking.losses}-{ranking.ties}
                </TableCell>
                <TableCell>{ranking.highestScore}</TableCell>
                <TableCell>{ranking.carbonPoints}</TableCell>
                <TableCell>{ranking.played}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
