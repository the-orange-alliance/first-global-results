import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PlayCircleIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import AppTheme from "../AppTheme";
import Divider from "@material-ui/core/Divider";
import {Link, NavLink} from "react-router-dom";

import {Match, MatchParticipant} from "@the-orange-alliance/lib-ems";
import ButtonBase from "@material-ui/core/ButtonBase";

interface IProps {
  matches: Match[];
}

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
    padding: AppTheme.spacing(1),
    height: '100%'
  },
  blueItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddddff',
    padding: AppTheme.spacing(1),
    height: '100%'
  },
  noVideo: {
    color: '#e6e6e6'
  }
};

interface IProps {
  matches: Match[];
}

class MatchResultsTable extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {matches} = this.props;
    const matchesView = matches.map((m: Match) => {
      return (
        this.renderMatchItem(m)
      );
    });
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
        {matchesView}
      </div>
    );
  }

  private renderMatchItem(m: Match): JSX.Element {
    return (
      <Grid key={m.matchKey} container={true} spacing={0}>
        {/* Match Info Header */}
        <Grid item={true} xs={3} style={styles.item}>
          <Typography variant={"body1"}>
            <NavLink to={`/match/${m.matchKey}`}>{m.matchName}</NavLink>
          </Typography>
        </Grid>
        <Grid item={true} xs={1} style={styles.item}>
          <PlayCircleIcon style={styles.noVideo} fontSize={"large"}/>
        </Grid>
        <Grid item={true} xs={6} style={styles.item}>
          {m.participants && this.renderAlliances(m.participants)}
        </Grid>
        <Grid item={true} xs={2} style={styles.item}>
          {m.participants && this.renderScores(m)}
        </Grid>
        <Grid item={true} xs={12}>
          <Divider/>
        </Grid>
      </Grid>
    );
  }

  private renderAlliances(participants: MatchParticipant[]) {
    const redTeams = participants.filter((m: MatchParticipant) => m.station < MatchParticipant.BLUE_ALLIANCE_ONE);
    const blueTeams = participants.filter((m: MatchParticipant) => m.station >= MatchParticipant.BLUE_ALLIANCE_ONE);

    const redTeamsView = redTeams.map((p: MatchParticipant) => {
      const name = typeof p.team !== "undefined" ? p.team.country : p.teamKey;
      return (
        <Grid key={p.matchParticipantKey} item={true} xs={redTeams.length <= 3 ? 4 : 3} sm={redTeams.length <= 3 ? 4 : 3} md={redTeams.length <= 3 ? 2 : 'auto'} style={styles.redItem} className={'expandedTeamItem'}>
          <Link to={`/team/${p.teamKey}`}>
            <ButtonBase focusRipple={true}>
              {!p.team && <Typography align={"center"} variant={"body1"}>{name}</Typography>}
              {p.team && <Typography align={"center"} variant={'body1'}><span className={`flag-icon flag-icon-${p.team.countryCode}`}/> {name}</Typography>}
            </ButtonBase>
          </Link>
        </Grid>
      );
    });

    const blueTeamsView = blueTeams.map((p: MatchParticipant) => {
      const name = typeof p.team !== "undefined" ? p.team.country : p.teamKey;
      return (
        <Grid key={p.matchParticipantKey} item={true} xs={blueTeams.length <= 3 ? 4 : 3} sm={blueTeams.length <= 3 ? 4 : 3} md={blueTeams.length <= 3 ? 2 : 'auto'} style={styles.blueItem} className={'expandedTeamItem'}>
          <Link to={`/team/${p.teamKey}`}>
            <ButtonBase focusRipple={true}>
              {!p.team && <Typography align={"center"} variant={"body1"}>{name}</Typography>}
              {p.team && <Typography align={"center"} variant={'body1'}><span className={`flag-icon flag-icon-${p.team.countryCode}`}/> {name}</Typography>}
            </ButtonBase>
          </Link>
        </Grid>
      );
    });

    return (
      <Grid container={true} spacing={0}>
        {/* RED ALLIANCE */}
        {redTeamsView}
        {/* BLUE ALLIANCE */}
        {blueTeamsView}
      </Grid>
    );
  }

  private renderScores(m: Match) {
    const participants: MatchParticipant[] = m.participants;
    const redTeams = participants.filter((m: MatchParticipant) => m.station < MatchParticipant.BLUE_ALLIANCE_ONE);
    const blueTeams = participants.filter((m: MatchParticipant) => m.station >= MatchParticipant.BLUE_ALLIANCE_ONE);
    let view;
    if (m.result === Match.RESULT_NOT_PLAYED) {
      view = (
        <Grid container={true}>
          <Grid item={true} xs={12}>
            <Typography align={'center'} variant={'body1'}><i>{m.scheduledStartTime.subtract(8, 'hour').format('ddd HH:mm')}</i></Typography>
          </Grid>
        </Grid>
      );
    } else {
      view = (
        <Grid container={true} spacing={0} style={{height: '100%'}}>
          <Grid item={true} xs={12} sm={12} md={redTeams.length <= 3 ? 6 : 4} style={styles.redItem}>
            <Typography variant={"body1"}>{m.redScore}</Typography>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={blueTeams.length <= 3 ? 6 : 4} style={styles.blueItem}>
            <Typography variant={"body1"}>{m.blueScore}</Typography>
          </Grid>
        </Grid>
      )
    }
    return (view);
  }
}

export default MatchResultsTable;