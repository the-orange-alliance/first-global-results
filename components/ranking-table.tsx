import { useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";

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

const makeColumns = (
  customItemTitle: string,
  customItemKey: string
): {
  key: ColumnKey;
  label: string;
  isSortable?: boolean;
  hideOnPlayoffs?: boolean;
}[] => {
  return [
    { key: "rank", label: "Rank", isSortable: true },
    { key: "team", label: "Team", isSortable: true },
    { key: "rankingScore", label: "Ranking Score", isSortable: true },
    {
      key: "highestScore",
      label: "Highest Points",
      isSortable: true,
      hideOnPlayoffs: true,
    },
    {
      key: customItemKey,
      label: customItemTitle,
      isSortable: true,
      hideOnPlayoffs: true,
    },
    { key: "played", label: "Played", isSortable: true, hideOnPlayoffs: true },
  ];
};

const RankingTable = ({
  rankings,
  type,
  extraRankingItemTitle,
  extraRankingItemKey,
}: {
  rankings: Rank[];
  type: "RANKING" | "PLAYOFF";
  extraRankingItemTitle: string;
  extraRankingItemKey: string;
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<ColumnKey>("rank");

  const handleRequestSort = (key: ColumnKey) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };
  const createSortHandler =
    (key: ColumnKey) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(key);
    };

  const sortedRankings = useMemo(() => {
    const sorted = [...(rankings || [])];
    sorted.sort((rank1, rank2) => {
      let a = rank1[orderBy];
      let b = rank2[orderBy];

      if (orderBy === "record") {
        a = rank1.wins + 0.5 * rank1.ties;
        b = rank2.wins + 0.5 * rank2.ties;
      } else if (orderBy === "team") {
        a = rank1.team.shortName || rank1.team.name || rank1.teamKey;
        b = rank2.team.shortName || rank2.team.name || rank2.teamKey;
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

  const columns = makeColumns(extraRankingItemTitle, extraRankingItemKey);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
        <TableHead key="tablehead">
          <TableRow key="tableheadrow">
            {columns
              .filter((col) => type !== "PLAYOFF" || !col.hideOnPlayoffs)
              .map((col) => {
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
          {sortedRankings.map((ranking) => (
            <TableRow key={ranking.rank}>
              {columns
                .filter((col) => type !== "PLAYOFF" || !col.hideOnPlayoffs)
                .map((col) => (
                  <TableCell
                    key={col.key}
                    sx={
                      col.key === "team"
                        ? {
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: {
                            xs: "10.5rem",
                            md: "unset",
                          },
                        }
                        : {}
                    }
                  >
                    {col.key === "rank" ? (
                      ranking.rank
                    ) : col.key === "team" ? (
                      <NextLink
                        href={`/team/${ranking.team?.country}`}
                        prefetch={false}
                        shallow
                        passHref
                        legacyBehavior
                      >
                        <Link underline="hover">
                          {ranking.team?.shortName ||
                            ranking.team?.name ||
                            ranking.teamKey}
                        </Link>
                      </NextLink>
                    ) : (
                      ranking[col.key]
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
