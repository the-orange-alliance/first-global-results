import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import {Ranking, OceanOpportunitiesRank} from "@the-orange-alliance/lib-ems";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import {Link} from "react-router-dom";

const styles = {
  header: {
    backgroundColor: '#e9ecef',
  },
  headerCell: {
    color: '#495057'
  },
  buttonLink: {
    justifyContent: 'flex-start'
  }
};

interface IProps {
  rankings: Ranking[];
}

class OceanOpportunitiesRankingTable extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {rankings} = this.props;
    const rankingsView = rankings.map((ranking: Ranking) => {
      const name = typeof ranking.team !== "undefined" ? ranking.team.teamNameShort : ranking.teamKey;
      const rank: OceanOpportunitiesRank = ranking as OceanOpportunitiesRank;
      return (
        <TableRow key={rank.rankKey}>
          <TableCell>#{rank.rank}</TableCell>
          <TableCell>
            <Link to={`/team/${ranking.teamKey}`}>
              <ButtonBase focusRipple={true} style={styles.buttonLink}>
                {name}
              </ButtonBase>
            </Link>
            </TableCell>
          <TableCell>{rank.rankingPoints}</TableCell>
          <TableCell>{rank.wins}-{rank.losses}-{rank.ties}</TableCell>
          <TableCell>{rank.totalPoints}</TableCell>
          <TableCell>{rank.coopertitionPoints}</TableCell>
          <TableCell>{rank.played}</TableCell>
        </TableRow>
      );
    });
    return (
      <Table size={'small'}>
        <TableHead style={styles.header}>
          <TableRow>
            <TableCell style={styles.headerCell}>Rank</TableCell>
            <TableCell style={styles.headerCell}>Team</TableCell>
            <TableCell style={styles.headerCell}>Ranking Points</TableCell>
            <TableCell style={styles.headerCell}>Record (W-L-T)</TableCell>
            <TableCell style={styles.headerCell}>Total Points</TableCell>
            <TableCell style={styles.headerCell}>Coopertition Bonuses</TableCell>
            <TableCell style={styles.headerCell}>Matches Played</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingsView}
        </TableBody>
      </Table>
    );
  }
}

export default OceanOpportunitiesRankingTable;