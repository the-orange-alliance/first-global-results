import * as React from "react";
import { Route, RouteComponentProps} from "react-router-dom";
import AppTheme from "../../AppTheme";
import Container from "@material-ui/core/Container";
import EventView from "../event/EventView";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  }
};

interface IProps {
  routeProps: RouteComponentProps;
}

class EventsView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.renderEvent = this.renderEvent.bind(this);
  }

  public render() {
    const {routeProps} = this.props;
    return (
      <Container maxWidth={false} style={styles.container}>
        {/*<Typography variant={'h3'}>FIRST Global Competitions</Typography>*/}
        {/* Events display based upon the route */}
        <Route path={`${routeProps.match.path}/:eventKey`} render={this.renderEvent}/>
        <Route path={routeProps.match.path} exact={true} render={this.renderEvent}/>
      </Container>
    );
  }

  private renderEvent(routeParams: RouteComponentProps) {
    const params: any = routeParams.match.params;
    return <EventView eventKey={params.eventKey}/>;
  }
}

export default EventsView;