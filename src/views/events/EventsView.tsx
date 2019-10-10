import * as React from "react";
import { Route, RouteComponentProps} from "react-router-dom";
import AppTheme, {CURRENT_SEASON} from "../../AppTheme";
import Container from "@material-ui/core/Container";
import EventView from "../event/EventView";

import {
  ApplicationActions, ISetEvent, ISetMatches, ISetRankings, ISetTeams, setEvent, setMatches, setRankings,
  setTeams
} from "../../store/Actions";
import {IApplicationState} from "../../store/Models";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {Event, EventType, FGCProvider, Ranking, Team, Match} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  }
};

interface IProps {
  routeProps: RouteComponentProps;
  event: Event;
  matches: Match[];
  rankings: Ranking[];
  teams: Team[];
  setEvent: (event: Event) => ISetEvent;
  setMatches: (matches: Match[]) => ISetMatches;
  setTeams: (teams: Team[]) => ISetTeams;
  setRankings: (rankings: Ranking[]) => ISetRankings;
}

interface IState {
  seasonKey: string
}

class EventsView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      seasonKey: CURRENT_SEASON
    };

    this.renderEvent = this.renderEvent.bind(this);
  }

  public componentWillMount() {
    const {routeProps, matches, event, teams, setTeams, setEvent, setMatches, setRankings} = this.props;
    const {seasonKey} = this.state;
    if (typeof event.eventCode === "undefined" || event.eventCode.length <= 0) {
      const routeKey: string = (routeProps.match.params as any).seasonKey;
      const key: string = routeKey ? routeKey : seasonKey;
      FGCProvider.getEventBySeason(key).then((event: Event) => {
        setEvent(event);
        FGCProvider.getAllEventMatches(event.eventKey).then((matches: Match[]) => {
          setMatches(matches.filter((m: Match) => m.tournamentLevel > Match.PRACTICE_LEVEL));
        });
        FGCProvider.getTeams(event.eventKey).then((teams: Team[]) => {
          setTeams(teams);
        });
        FGCProvider.getRankingTeams(event.eventKey, getEventTypeFromKey(event.season.seasonKey.toString())).then((rankings: Ranking[]) => {
          setRankings(rankings);
        });
      });
    } else if (matches.length <= 0) {
      FGCProvider.getAllEventMatches(event.eventKey).then((matches: Match[]) => {
        setMatches(matches);
      });
    } else if (teams.length <= 0) {
      FGCProvider.getTeams(event.eventKey).then((teams: Team[]) => {
        setTeams(teams);
      });
    }
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {event, setTeams, setEvent, setMatches, setRankings} = this.props;
    const {seasonKey} = this.state;
    if (seasonKey !== prevState.seasonKey && event.eventKey.length <= 0) {
      FGCProvider.getEventBySeason(seasonKey).then((event: Event) => {
        setEvent(event);
        FGCProvider.getAllEventMatches(event.eventKey).then((matches: Match[]) => {
          setMatches(matches);
        });
        FGCProvider.getTeams(event.eventKey).then((teams: Team[]) => {
          setTeams(teams);
        });
        FGCProvider.getRankingTeams(event.eventKey, getEventTypeFromKey(event.season.seasonKey.toString())).then((rankings: Ranking[]) => {
          setRankings(rankings);
        });
      });
    }
  }

  public render() {
    const {routeProps} = this.props;
    return (
      <Container maxWidth={false} style={styles.container}>
        {/*<Typography variant={'h3'}>FIRST Global Competitions</Typography>*/}
        {/* Events display based upon the route */}
        <Route path={`${routeProps.match.path}/:seasonKey`} render={this.renderEvent}/>
        <Route path={routeProps.match.path} exact={true} render={this.renderEvent}/>
      </Container>
    );
  }

  private renderEvent(routeParams: RouteComponentProps) {
    const {event, matches, teams, rankings} = this.props;
    const {seasonKey} = this.state;
    const params: any = routeParams.match.params;
    if (typeof params.seasonKey !== "undefined" &&
        seasonKey !== params.seasonKey &&
        params.seasonKey.length > 0) {
      this.setState({seasonKey: params.seasonKey});
    }
    return <EventView event={event} matches={matches} teams={teams} rankings={rankings}/>;
  }
}

export function getEventTypeFromKey(seasonKey: string): EventType | undefined {
  switch (seasonKey) {
    case "2018":
      return "fgc_2018";
    case "2019":
      return "fgc_2019";
    default:
      return undefined;
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    event: state.event,
    matches: state.matches,
    teams: state.teams,
    rankings: state.rankings
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setEvent: (event: Event) => dispatch(setEvent(event)),
    setMatches: (matches: Match[]) => dispatch(setMatches(matches)),
    setTeams: (teams: Team[]) => dispatch(setTeams(teams)),
    setRankings: (rankings: Ranking[]) => dispatch(setRankings(rankings))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);