import * as React from "react";
import { Route, RouteComponentProps} from "react-router-dom";
import AppTheme, {CURRENT_SEASON} from "../../AppTheme";
import Container from "@material-ui/core/Container";
import EventView from "../event/EventView";

import {ApplicationActions, ISetEvent, setEvent} from "../../store/Actions";
import {IApplicationState} from "../../store/Models";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {Event, FGCProvider} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  }
};

interface IProps {
  routeProps: RouteComponentProps;
  event: Event,
  setEvent: (event: Event) => ISetEvent
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
    const {routeProps, event, setEvent} = this.props;
    const {seasonKey} = this.state;
    if (event.eventCode.length <= 0) {
      const routeKey: string = (routeProps.match.params as any).seasonKey;
      const key: string = routeKey ? routeKey : seasonKey;
      FGCProvider.getEventBySeason(key).then((event: Event) => {
        setEvent(event);
      });
    }
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {event, setEvent} = this.props;
    const {seasonKey} = this.state;
    if (seasonKey !== prevState.seasonKey && event.eventKey.length <= 0) {
      FGCProvider.getEventBySeason(seasonKey).then((event: Event) => {
        setEvent(event);
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
    const {event} = this.props;
    const {seasonKey} = this.state;
    const params: any = routeParams.match.params;
    if (typeof params.seasonKey !== "undefined" &&
        seasonKey !== params.seasonKey &&
        params.seasonKey.length > 0) {
      this.setState({seasonKey: params.seasonKey});
    }
    return <EventView event={event}/>;
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    event: state.event
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setEvent: (event: Event) => dispatch(setEvent(event))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);