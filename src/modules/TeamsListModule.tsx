import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TeamPaper from "../components/TeamPaper";

import {Team} from "@the-orange-alliance/lib-ems";

interface IProps {
  teams: Team[]
}

class TeamsListModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {teams} = this.props;
    const teamItems = teams.map((t: Team) => {
      return (
        <Grid key={t.teamKey} item={true} xs={12} sm={12} md={6} lg={4}>
          <TeamPaper team={t}/>
        </Grid>
      );
    });
    return (
      <Grid container={true} spacing={3}>
        {teamItems}
      </Grid>
    );
  }
}

export default TeamsListModule;