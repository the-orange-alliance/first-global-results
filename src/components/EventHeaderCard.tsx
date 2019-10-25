import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import PlaceIcon from "@material-ui/icons/Place";
import VideoGameController from "@material-ui/icons/VideogameAsset";
import AppTheme from "../AppTheme";

import {Event} from "@the-orange-alliance/lib-ems";

const styles = {
  card: {
    padding: AppTheme.spacing(1)
  },
  icon: {
    color: AppTheme.palette.primary.main
  }
};

interface IProps {
  event: Event
}

class EventHeaderCard extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {event} = this.props;
    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography variant={'h5'}>{event.eventName}</Typography>
        </CardContent>
        <Divider/>
        <CardContent>
          <Grid container={true} spacing={1}>
            {/* Event Date */}
            <Grid item={true} xs={1}>
              <CalendarIcon style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              October 25th, 2019 - October 27th, 2019
            </Grid>
            {/* Event Location/Venue */}
            <Grid item={true} xs={1}>
              <PlaceIcon style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              {event.venue}, {event.country}
            </Grid>
            {/* Event Game */}
            <Grid item={true} xs={1}>
              <VideoGameController style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              {event.season && this.getGameName(event.season.seasonKey)}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  private getGameName(seasonKey: number): string {
    switch (seasonKey) {
      case 2019:
        return "Ocean Opportunities";
      default:
        return "";
    }
  }
}

export default EventHeaderCard;