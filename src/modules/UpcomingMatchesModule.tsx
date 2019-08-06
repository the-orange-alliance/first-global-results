import * as React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AppTheme from "../AppTheme";

const styles = {
  card: {
    padding: AppTheme.spacing(2)
  },
  divider: {
    margin: AppTheme.spacing(1)
  }
};

class UpcomingMatchesModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Card style={styles.card}>
        <Typography display={"block"} variant={"body1"}><b>Upcoming Matches</b></Typography>
        <Typography display={"block"} variant={"body2"}>August 6th, 2019</Typography>
        <Divider style={styles.divider}/>
        <Typography align={"center"} display={"block"} variant={"body2"}>There are no upcoming matches today.</Typography>
      </Card>
    );
  }
}

export default UpcomingMatchesModule;