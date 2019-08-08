import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import AppTheme from "../../AppTheme";

const styles = {
  header: {
    backgroundColor: '#e9ecef',
  },
  headerCell: {
    color: '#495057'
  }
};

class OceanOpportunitiesRankingTable extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Table>
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Team Africa</TableCell>
            <TableCell>12</TableCell>
            <TableCell>0-1-2</TableCell>
            <TableCell>200</TableCell>
            <TableCell>2</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Team Africa</TableCell>
            <TableCell>12</TableCell>
            <TableCell>0-1-2</TableCell>
            <TableCell>200</TableCell>
            <TableCell>2</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default OceanOpportunitiesRankingTable;