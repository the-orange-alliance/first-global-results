import * as React from "react";
import Banner from "../../components/Banner";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ActiveTeamsModule from "../../modules/ActiveTeamsModule";
import MatchesPlayedModule from "../../modules/MatchesPlayedModule";
import AppTheme from "../../AppTheme";
import UpcomingMatchesModule from "../../modules/UpcomingMatchesModule";
import HighestScoresModule from "../../modules/HighestScoresModule";

const styles = {
  container: {
    padding: AppTheme.spacing(3)
  }
};

class HomeView extends React.Component {
  constructor (props: any) {
    super(props);
  }

  public render() {
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
                  <ActiveTeamsModule/>
                </Grid>
                <Grid item={true} xs={6} sm={12} md={6}>
                  <MatchesPlayedModule/>
                </Grid>
                <Grid item={true} xs={12} sm={12}>
                  <UpcomingMatchesModule/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              {/* Right Grid Content */}
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={12}>
                  <HighestScoresModule/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default HomeView;