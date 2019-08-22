import * as React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AppTheme from "../AppTheme";
import MatchTable from "../components/MatchTable";

import {Match} from "@the-orange-alliance/lib-ems";
import {Link} from "react-router-dom";

const styles = {
  card: {
    padding: AppTheme.spacing(2)
  },
  divider: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  match: Match;
}

class HighestScoresModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {match} = this.props;
    return (
      <Card style={styles.card}>
        <Typography display={"block"} variant={"body1"}><b>Leaderboards</b></Typography>
        <Typography display={"block"} variant={"body2"}>Ocean Opportunities 2019</Typography>
        <Divider style={styles.divider}/>
        {/* Highest Scoring Qualification Match */}
        <Typography display={"block"} variant={"h6"}>Highest Scoring Ranking Match</Typography>
        <Typography display={"block"} variant={"body2"}><Link to={`/match/${match.matchKey}`}>{match.matchName}</Link></Typography>
        <MatchTable match={match}/>
        {/*<Divider style={styles.divider}/>*/}
        {/*<Typography display={"block"} variant={"h6"}>Highest Scoring Playoffs Match</Typography>*/}
        {/*<Typography display={"block"} variant={"body2"}>Round 1 Match 3</Typography>*/}
        {/*<MatchTable match={new Match()}/>*/}
      </Card>
    );
  }
}

export default HighestScoresModule;