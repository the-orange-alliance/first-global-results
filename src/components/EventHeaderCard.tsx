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

const styles = {
  card: {
    padding: AppTheme.spacing(1)
  },
  icon: {
    color: AppTheme.palette.primary.main
  }
};

class EventHeaderCard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography variant={'h5'}>FIRST Global Competition 2019</Typography>
        </CardContent>
        <Divider/>
        <CardContent>
          <Grid container={true} spacing={1}>
            {/* Event Date */}
            <Grid item={true} xs={1}>
              <CalendarIcon style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              August 6th, 2019 - August 11th, 2019
            </Grid>
            {/* Event Location/Venue */}
            <Grid item={true} xs={1}>
              <PlaceIcon style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              Coca Cola Arena, Dubai
            </Grid>
            {/* Event Game */}
            <Grid item={true} xs={1}>
              <VideoGameController style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              Ocean Opportunities
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default EventHeaderCard;