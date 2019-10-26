import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppTheme from "../AppTheme";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";

import {Match, MatchParticipant} from "@the-orange-alliance/lib-ems";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = {
  headerItem: {
    backgroundColor: '#e6e6e6',
    padding: AppTheme.spacing(1)
  },
  redItem: {
    backgroundColor: '#ffdddd',
    padding: AppTheme.spacing(1),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueItem: {
    backgroundColor: '#ddddff',
    padding: AppTheme.spacing(1),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

interface IProps {
  match: Match
}

interface IState {
  loading: boolean;
}

class MatchTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loading: true
    };
  }

  public componentWillMount(): void {
    const {match} = this.props;
    const {loading} = this.state;
    if (typeof match.participants !== "undefined" && match.participants.length > 0 && loading) {
      this.setState({loading: false});
    }
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const {match} = this.props;
    const {loading} = this.state;
    if (typeof match.participants !== "undefined" && match.participants.length > 0 && loading) {
      this.setState({loading: false});
    }
  }

  public render() {
    const {match} = this.props;
    const {loading} = this.state;
    const redTeams = !loading ? match.participants.filter((m: MatchParticipant) => m.station < MatchParticipant.BLUE_ALLIANCE_ONE) : [];
    const blueTeams = !loading ? match.participants.filter((m: MatchParticipant) => m.station >= MatchParticipant.BLUE_ALLIANCE_ONE) : [];

    const redAllianceView = redTeams.map((p: MatchParticipant) => {
      const name = typeof p.team !== "undefined" ? p.team.country : p.teamKey;
      return (
        <Grid key={p.matchParticipantKey} item={true} xs={redTeams.length <= 3 ? 3 : 2}>
          <Link to={`/team/${p.teamKey}`}>
            <ButtonBase focusRipple={true}>
              <Paper square={true} style={styles.redItem}>
                {!p.team && <Typography align={"center"} variant={"body1"}>{name}</Typography>}
                {p.team && <Typography align={"center"} variant={'body1'}><span className={`flag-icon flag-icon-${p.team.countryCode}`}/> {name}</Typography>}
              </Paper>
            </ButtonBase>
          </Link>
        </Grid>
      );
    });

    const blueAllianceView = blueTeams.map((p: MatchParticipant) => {
      const name = typeof p.team !== "undefined" ? p.team.country : p.teamKey;
      return (
        <Grid key={p.matchParticipantKey} item={true} xs={blueTeams.length <= 3 ? 3 : 2}>
          <Link to={`/team/${p.teamKey}`}>
            <ButtonBase focusRipple={true}>
              <Paper square={true} style={styles.blueItem}>
                {!p.team && <Typography align={"center"} variant={"body1"}>{name}</Typography>}
                {p.team && <Typography align={"center"} variant={'body1'}><span className={`flag-icon flag-icon-${p.team.countryCode}`}/> {name}</Typography>}
              </Paper>
            </ButtonBase>
          </Link>
        </Grid>
      );
    });

    const redLoadingView = (
      <Grid item={true} xs={9}>
        <Paper square={true} style={styles.redItem}>
          <Skeleton variant={'text'} width={'100%'} height={1}/>
        </Paper>
      </Grid>
    );

    const blueLoadingView = (
      <Grid item={true} xs={9}>
        <Paper square={true} style={styles.blueItem}>
          <Skeleton variant={'text'} width={'100%'} height={1}/>
        </Paper>
      </Grid>
    );

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
        {loading ? redLoadingView : redAllianceView}
        <Grid item={true} xs={redTeams.length <= 3 ? 3 : 3}>
          <Paper square={true} style={styles.redItem}>
            <Typography align={"center"} variant={"body1"}>{loading ? "--" : match.result === -1 ? <i>NOT PLAYED</i> : match.redScore}</Typography>
          </Paper>
        </Grid>
        {/* Blue Alliance */}
        {loading ? blueLoadingView : blueAllianceView}
        <Grid item={true} xs={blueTeams.length <= 3 ? 3 : 4}>
          <Paper square={true} style={styles.blueItem}>
            <Typography align={"center"} variant={"body1"}>{loading ? "--" : match.result === -1 ? <i>NOT PLAYED</i> : match.blueScore}</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default MatchTable;