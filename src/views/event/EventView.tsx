import * as React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import AppTheme from "../../AppTheme";
import EventHeaderCard from "../../components/EventHeaderCard";
import EventSelectorCard from "../../components/EventSelectorCard";
import EventResultsModule from "../../modules/EventResultsModule";

const styles = {
  grid: {
    marginTop: AppTheme.spacing(0)
  }
};

interface IProps {
  eventKey: string;
}

class EventView extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {eventKey} = this.props;
    return (
      <Grid container={true} spacing={3} style={styles.grid}>
        <Grid item={true} xs={12} sm={12} md={8}>
          <EventHeaderCard/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <EventSelectorCard/>
        </Grid>
        <Grid item={true} xs={12}>
          <EventResultsModule/>
        </Grid>
      </Grid>
    );
  }
}

export default EventView;