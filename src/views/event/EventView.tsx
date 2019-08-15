import * as React from "react";
import Grid from "@material-ui/core/Grid";
import AppTheme from "../../AppTheme";
import EventHeaderCard from "../../components/EventHeaderCard";
import EventSelectorCard from "../../components/EventSelectorCard";
import EventResultsModule from "../../modules/EventResultsModule";

import {Event, Match, Ranking, Team} from "@the-orange-alliance/lib-ems";

const styles = {
  grid: {
    marginTop: AppTheme.spacing(0)
  }
};

interface IProps {
  event: Event;
  matches: Match[];
  teams: Team[];
  rankings: Ranking[];
}

class EventView extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {event, matches, rankings, teams} = this.props;
    return (
      <Grid container={true} spacing={3} style={styles.grid}>
        <Grid item={true} xs={12} sm={12} md={8}>
          <EventHeaderCard event={event}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <EventSelectorCard/>
        </Grid>
        <Grid item={true} xs={12}>
          <EventResultsModule matches={matches} teams={teams} rankings={rankings}/>
        </Grid>
      </Grid>
    );
  }
}

export default EventView;