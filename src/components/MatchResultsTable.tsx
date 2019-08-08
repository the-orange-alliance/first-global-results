import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PlayCircleIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import AppTheme from "../AppTheme";
import Divider from "@material-ui/core/Divider";

const styles = {
  headerItem: {
    backgroundColor: '#e9ecef',
    padding: AppTheme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdddd',
    padding: AppTheme.spacing(1)
  },
  blueItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddddff',
    padding: AppTheme.spacing(1)
  },
  noVideo: {
    color: '#e6e6e6'
  }
};

class MatchResultsTable extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Grid container={true} spacing={0}>
          {/* Match Info Header */}
          <Grid item={true} xs={3} style={styles.headerItem}>
            <Typography variant={"body1"}><b>Match</b></Typography>
          </Grid>
          <Grid item={true} xs={1} style={styles.headerItem}>
            <PlayCircleIcon fontSize={"large"}/>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Grid container={true} spacing={0}>
              <Grid item={true} xs={12} sm={12} md={6} style={styles.headerItem}>
                <Typography variant={"body1"}><b>Red Alliance</b></Typography>
              </Grid>
              <Grid item={true} xs={12} sm={12} md={6} style={styles.headerItem}>
                <Typography variant={"body1"}><b>Blue Alliance</b></Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={2} style={styles.headerItem}>
            <Typography variant={"body1"}><b>Scores</b></Typography>
          </Grid>
        </Grid>
        {this.renderMatchItem()}
        {this.renderMatchItem()}
      </div>
    );
  }

  private renderMatchItem(): JSX.Element {
    return (
      <Grid container={true} spacing={0}>
        {/* Match Info Header */}
        <Grid item={true} xs={3} style={styles.item}>
          <Typography variant={"body1"}>Ranking Match 1</Typography>
        </Grid>
        <Grid item={true} xs={1} style={styles.item}>
          <PlayCircleIcon style={styles.noVideo} fontSize={"large"}/>
        </Grid>
        <Grid item={true} xs={6} style={styles.item}>
          <Grid container={true} spacing={0}>
            {/* RED ALLIANCE */}
            <Grid item={true} xs={4} sm={4} md={2} style={styles.redItem}>
              <Typography variant={"body1"}>USA</Typography>
            </Grid>
            <Grid item={true} xs={4} sm={4} md={2} style={styles.redItem}>
              <Typography variant={"body1"}>USA</Typography>
            </Grid>
            <Grid item={true} xs={4} sm={4} md={2} style={styles.redItem}>
              <Typography variant={"body1"}>USA</Typography>
            </Grid>
            {/* BLUE ALLIANCE */}
            <Grid item={true} xs={4} sm={4} md={2} style={styles.blueItem}>
              <Typography variant={"body1"}>USA</Typography>
            </Grid>
            <Grid item={true} xs={4} sm={4} md={2} style={styles.blueItem}>
              <Typography variant={"body1"}>USA</Typography>
            </Grid>
            <Grid item={true} xs={4} sm={4} md={2} style={styles.blueItem}>
              <Typography variant={"body1"}>USA</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={2} style={styles.item}>
          <Grid container={true} spacing={0}>
            <Grid item={true} xs={12} sm={12} md={6} style={styles.redItem}>
              <Typography variant={"body1"}>0</Typography>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6} style={styles.blueItem}>
              <Typography variant={"body1"}>0</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={12}>
          <Divider/>
        </Grid>
      </Grid>
    );
  }
}

export default MatchResultsTable;