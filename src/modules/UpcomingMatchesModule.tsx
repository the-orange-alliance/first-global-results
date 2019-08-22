import * as React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppTheme from "../AppTheme";

import {NavLink} from "react-router-dom";

import {Match} from "@the-orange-alliance/lib-ems";

const styles = {
  card: {
    padding: AppTheme.spacing(2)
  },
  divider: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  matches: Match[];
}

class UpcomingMatchesModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {matches} = this.props;
    let matchesView;
    if (matches.length <= 0) {
      matchesView = (<Typography align={"center"} display={"block"} variant={"body2"}>There are no upcoming matches today.</Typography>);
    } else {
      matchesView = matches.map((m: Match) => {
        return (
          <ListItem key={m.matchKey} button>
            <ListItemText primary={<NavLink to={`/match/${m.matchKey}`}>{m.matchName}</NavLink>} />
          </ListItem>
        );
      });
    }

    return (
      <Card style={styles.card}>
        <Typography display={"block"} variant={"body1"}><b>Upcoming Matches</b></Typography>
        <Typography display={"block"} variant={"body2"}>August 6th, 2019</Typography>
        <Divider style={styles.divider}/>
        <List>
          {matchesView}
        </List>
      </Card>
    );
  }
}

export default UpcomingMatchesModule;