import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppTheme from "../AppTheme";

const styles = {
  headerItem: {
    backgroundColor: '#e6e6e6',
    padding: AppTheme.spacing(1)
  },
  redItem: {
    backgroundColor: '#ffdddd',
    padding: AppTheme.spacing(1)
  },
  blueItem: {
    backgroundColor: '#ddddff',
    padding: AppTheme.spacing(1)
  }
};

class MatchTable extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Grid container={true} spacing={0}>
        {/* Headers */}
        <Grid item={true} xs={9}>
          <Paper square={true} style={styles.headerItem}>
            <Typography align={"center"} variant={"body1"}><b>Teams</b></Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.headerItem}>
            <Typography align={"center"} variant={"body1"}><b>Scores</b></Typography>
          </Paper>
        </Grid>
        {/* Red Alliance */}
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.redItem}>
            <Typography align={"center"} variant={"body1"}>AZO</Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.redItem}>
            <Typography align={"center"} variant={"body1"}>USA</Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.redItem}>
            <Typography align={"center"} variant={"body1"}>AFG</Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.redItem}>
            <Typography align={"center"} variant={"body1"}>100</Typography>
          </Paper>
        </Grid>
        {/* Blue Alliance */}
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.blueItem}>
            <Typography align={"center"} variant={"body1"}>CAN</Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.blueItem}>
            <Typography align={"center"} variant={"body1"}>JPN</Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.blueItem}>
            <Typography align={"center"} variant={"body1"}>DUB</Typography>
          </Paper>
        </Grid>
        <Grid item={true} xs={3}>
          <Paper square={true} style={styles.blueItem}>
            <Typography align={"center"} variant={"body1"}>2</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default MatchTable;