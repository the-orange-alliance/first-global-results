import * as React from "react";
import Banner from "../../components/Banner";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ActiveTeamsModule from "../../modules/ActiveTeamsModule";
import MatchesPlayedModule from "../../modules/MatchesPlayedModule";
import AppTheme, {CURRENT_SEASON} from "../../AppTheme";
import UpcomingMatchesModule from "../../modules/UpcomingMatchesModule";
import HighestScoresModule from "../../modules/HighestScoresModule";

// Redux imports
import {IApplicationState} from "../../store/Models";
import {connect} from "react-redux";
import {
  ApplicationActions,
  ISetCompleteMatch,
  ISetMatches, ISetMatchSize,
  ISetTeams,
  setCompleteMatch,
  setMatches, setMatchSize,
  setTeams
} from "../../store/Actions";
import {Dispatch} from "redux";

// EMS imports
import {FGCProvider, Match, Team} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    padding: AppTheme.spacing(3)
  }
};

interface IProps {
  teams: Team[];
  matches: Match[];
  matchSize: number,
  completeMatch: Match;
  setTeams: (teams: Team[]) => ISetTeams;
  setMatches: (matches: Match[]) => ISetMatches;
  setMatchSize: (size: number) => ISetMatchSize;
  setCompleteMatch: (match: Match) => ISetCompleteMatch;
}

class HomeView extends React.Component<IProps> {
  constructor (props: IProps) {
    super(props);
  }

  public componentWillMount() {
    const {teams, setTeams, setMatches, setCompleteMatch, setMatchSize} = this.props;
    if (teams.length <= 0) {
      FGCProvider.getTeamsBySeason(CURRENT_SEASON).then((teams: Team[]) => {
        setTeams(teams);
      });
    }
    FGCProvider.getUpcomingMatches(CURRENT_SEASON, 10).then((matches: Match[]) => {
      setMatches(matches);
    }).catch(() => setMatches([]));
    FGCProvider.getHighestScoringMatch(CURRENT_SEASON, "quals", false).then((match: Match) => {
      setCompleteMatch(match);
    });
    FGCProvider.getPlayedMatchCount(CURRENT_SEASON).then((size: number) => {
      setMatchSize(size);
    });
  }

  public render() {
    const {completeMatch, matches, matchSize, teams} = this.props;
    return (
      <div>
        <Banner/>
        <Container style={styles.container}>
          <Typography variant={'h3'}>Home</Typography>
          <Typography paragraph={true}>The Global Alliance is the official provider of score results for <i>FIRST</i> Global.</Typography>
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={12} sm={6}>
              {/* Left Grid Content */}
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={6} sm={12} md={6}>
                  <ActiveTeamsModule count={teams.length}/>
                </Grid>
                <Grid item={true} xs={6} sm={12} md={6}>
                  <MatchesPlayedModule count={matchSize}/>
                </Grid>
                <Grid item={true} xs={12} sm={12}>
                  <UpcomingMatchesModule matches={matches}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              {/* Right Grid Content */}
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={12}>
                  <HighestScoresModule match={completeMatch}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    teams: state.teams,
    matches: state.matches,
    matchSize: state.matchSize,
    completeMatch: state.completeMatch
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setTeams: (teams: Team[]) => dispatch(setTeams(teams)),
    setMatches: (matches: Match[]) => dispatch(setMatches(matches)),
    setMatchSize: (size: number) => dispatch(setMatchSize(size)),
    setCompleteMatch: (match: Match) => dispatch(setCompleteMatch(match))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);