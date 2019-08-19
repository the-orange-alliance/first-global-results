import * as React from "react";
import {RouteComponentProps} from "react-router";
import AppTheme from "../../AppTheme";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TeamHeaderCard from "../../components/TeamHeaderCard";
import EventSelectorCard from "../../components/EventSelectorCard";

import {Team} from "@the-orange-alliance/lib-ems";

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
}

class TeamView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Container maxWidth={false} style={styles.container}>
        <Grid container={true} spacing={3} style={styles.grid}>
          <Grid item={true} xs={12} sm={12} md={8}>
            <TeamHeaderCard/>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={4}>
            <EventSelectorCard/>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6}>
            Upcoming Matches
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6}>
            Match Results
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default TeamView;