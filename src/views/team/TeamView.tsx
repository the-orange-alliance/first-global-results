import * as React from "react";
import {RouteComponentProps} from "react-router";
import AppTheme, {CURRENT_SEASON} from "../../AppTheme";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent/CardContent";
import TeamHeaderCard from "../../components/TeamHeaderCard";
import EventSelectorCard from "../../components/EventSelectorCard";
import TeamResultsModule from "../../modules/TeamResultsModule";

import {ApplicationActions, ISetCompleteTeam, setCompleteTeam} from "../../store/Actions";
import {IApplicationState} from "../../store/Models";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {FGCProvider, Ranking, ICompleteTeamResponse, Match} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  },
  grid: {
    marginTop: AppTheme.spacing(0)
  }
};

interface IProps {
  routeProps: RouteComponentProps;
  completeTeam: ICompleteTeamResponse;
  setCompleteTeam: (team: ICompleteTeamResponse) => ISetCompleteTeam;
}

class TeamView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount(): void {
    const {routeProps, setCompleteTeam} = this.props;
    const teamKey = (routeProps.match.params as any).teamKey;
    FGCProvider.getCompleteTeam(teamKey, CURRENT_SEASON).then((completeTeam: ICompleteTeamResponse) => {
      setCompleteTeam({
        rankings: completeTeam.rankings,
        matches: completeTeam.matches.filter((m: Match) => m.tournamentLevel > Match.PRACTICE_LEVEL),
        team: completeTeam.team
      });
    });
  }

  public componentDidUpdate(prevProps: IProps) {
    const {routeProps, setCompleteTeam} = this.props;
    const teamKey = (routeProps.match.params as any).teamKey;
    const oldTeamKey = (prevProps.routeProps.match.params as any).teamKey;
    if (teamKey != oldTeamKey) {
      FGCProvider.getCompleteTeam(teamKey, CURRENT_SEASON).then((completeTeam: ICompleteTeamResponse) => {
        setCompleteTeam({
          rankings: completeTeam.rankings,
          matches: completeTeam.matches.filter((m: Match) => m.tournamentLevel > Match.PRACTICE_LEVEL),
          team: completeTeam.team
        });
      });
    }
  }

  public render() {
    const {completeTeam} = this.props;
    const rank: Ranking = completeTeam.rankings && completeTeam.rankings.length > 0 ? completeTeam.rankings[0] : new Ranking();
    return (
      <Container maxWidth={false} style={styles.container}>
        <Grid container={true} spacing={3} style={styles.grid}>
          <Grid item={true} xs={12} sm={12} md={8}>
            <TeamHeaderCard team={completeTeam.team} rank={rank}/>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={4}>
            <EventSelectorCard/>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <TeamResultsModule matches={completeTeam.matches}/>
              </CardContent>
            </Card>
          </Grid>
          {/*<Grid item={true} xs={12} sm={12} md={6}>*/}
          {/*Match Results*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    );
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    completeTeam: state.completeTeam
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setCompleteTeam: (team: ICompleteTeamResponse) => dispatch(setCompleteTeam(team))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);