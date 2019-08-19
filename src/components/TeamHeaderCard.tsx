import * as React from "react";
import AppTheme from "../AppTheme";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import PlaceIcon from "@material-ui/icons/Place";
import VideoGameController from "@material-ui/icons/VideogameAsset";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    padding: AppTheme.spacing(1)
  },
  icon: {
    color: AppTheme.palette.primary.main
  }
};

interface IState {
  loading: boolean;
}

class TeamHeaderCard extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false
    };
  }

  public render() {
    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography variant={'h5'}>Team Afghanistan</Typography>
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
              Afghanistan, AFG
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

export default TeamHeaderCard;