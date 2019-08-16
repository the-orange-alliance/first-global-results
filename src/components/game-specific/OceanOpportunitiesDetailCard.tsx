import * as React from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import AppTheme from "../../AppTheme";

import {Match, OceanOpportunitiesMatchDetails} from "@the-orange-alliance/lib-ems";

const styles = {
  headerHeaderItem: {
    backgroundColor: '#e6e6e6',
    padding: AppTheme.spacing(1)
  },
  redHeaderItem: {
    backgroundColor: '#ffdddd',
    padding: AppTheme.spacing(1)
  },
  blueHeaderItem: {
    backgroundColor: '#ddddff',
    padding: AppTheme.spacing(1)
  },
  headerItem: {
    backgroundColor: '#ffffff',
    padding: AppTheme.spacing(1)
  },
  redItem: {
    backgroundColor: 'rgba(255,82,82,.07)',
    padding: AppTheme.spacing(1)
  },
  blueItem: {
    backgroundColor: 'rgba(68,138,255,.07)',
    padding: AppTheme.spacing(1)
  }
};

interface IProps {
  match: Match;
}

interface IState {
  loading: boolean;
}

class OceanOpportunitiesDetailCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loading: true
    };
  }

  public componentWillMount(): void {
    const {match} = this.props;
    const {loading} = this.state;
    if (typeof match.matchDetails !== "undefined" && loading) {
      this.setState({loading: false});
    }
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const {match} = this.props;
    const {loading} = this.state;
    if (typeof match.matchDetails !== "undefined" && loading) {
      this.setState({loading: false});
    }
  }

  public render() {
    const {match} = this.props;
    const {loading} = this.state;
    const details = match.matchDetails as OceanOpportunitiesMatchDetails;
    const loadingView = (
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={3} style={styles.redHeaderItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={6} style={styles.headerHeaderItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={3} style={styles.blueHeaderItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={3} style={styles.redItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={6} style={styles.headerItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={3} style={styles.blueItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
      </Grid>
    );
    return loading ? loadingView : (
      <Card>
        <Grid container={true} spacing={0}>
          {/* TELEOP HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedTeleScore()} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>Driver-Operated</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBlueTeleScore()} Points</Typography>
          </Grid>
          {/* Processing Barge - Reuse */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redProcessingBargeReuse} (+{details.redProcessingBargeReuse * 6})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Processing Barge - Reuse</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueProcessingBargeReuse} (+{details.blueProcessingBargeReuse * 6})</Typography>
          </Grid>
          {/* Processing Barge - Recycle */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redProcessingBargeRecycle} (+{details.redProcessingBargeRecycle * 3})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Processing Barge - Recycle</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueProcessingBargeRecycle} (+{details.blueProcessingBargeRecycle * 3})</Typography>
          </Grid>
          {/* Processing Barge - Recovery */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redProcessingBargeRecovery} (+{details.redProcessingBargeRecovery * 2})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Processing Barge - Recovery</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueProcessingBargeRecovery} (+{details.blueProcessingBargeRecovery * 2})</Typography>
          </Grid>
          {/* Reduction Processing */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redReductionProcessing} (+{details.redReductionProcessing})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Reduction Processing</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueReductionProcessing} (+{details.blueReductionProcessing})</Typography>
          </Grid>
          {/* END GAME HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedEndScore()} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>End Game</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBlueEndScore()} Points</Typography>
          </Grid>
          {/* Robot 1 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getDockingText(details.redEndRobotOneDocking)} (+{this.getDockingPoints(details.redEndRobotOneDocking)})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 1 Status</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getDockingText(details.blueEndRobotOneDocking)} (+{this.getDockingPoints(details.blueEndRobotOneDocking)})</Typography>
          </Grid>
          {/* Robot 2 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getDockingText(details.redEndRobotTwoDocking)} (+{this.getDockingPoints(details.redEndRobotTwoDocking)})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 2 Status</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getDockingText(details.blueEndRobotTwoDocking)} (+{this.getDockingPoints(details.blueEndRobotTwoDocking)})</Typography>
          </Grid>
          {/* Robot 3 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getDockingText(details.redEndRobotThreeDocking)} (+{this.getDockingPoints(details.redEndRobotThreeDocking)})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 3 Status</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getDockingText(details.blueEndRobotThreeDocking)} (+{this.getDockingPoints(details.blueEndRobotThreeDocking)})</Typography>
          </Grid>
          {/* PENALTY HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedPenalty(match.blueMinPen, 0)} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>Penalty Points</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBluePenalty(match.redMinPen, 0)} Points</Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  private getDockingText(state: number): string {
    if (state === 0) {
      return "Not Parked";
    } else if (state === 1) {
      return "Partially Parked";
    } else if (state === 2) {
      return "Fully Parked";
    } else if (state === 3) {
      return "Fully Elevated";
    } else {
      return "Not Parked";
    }
  }

  private getDockingPoints(state: number): number {
    if (state === 0) {
      return 0;
    } else if (state === 1) {
      return 5;
    } else if (state === 2) {
      return 10;
    } else if (state === 3) {
      return 20;
    } else {
      return 0;
    }
  }
}

export default OceanOpportunitiesDetailCard;