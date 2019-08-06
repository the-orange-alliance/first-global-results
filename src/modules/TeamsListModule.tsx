import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TeamPaper from "../components/TeamPaper";

class TeamsListModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} sm={12} md={6} lg={4}>
          <TeamPaper/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6} lg={4}>
          <TeamPaper/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6} lg={4}>
          <TeamPaper/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6} lg={4}>
          <TeamPaper/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6} lg={4}>
          <TeamPaper/>
        </Grid>
      </Grid>
    );
  }
}

export default TeamsListModule;