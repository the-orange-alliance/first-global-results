import * as React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import VideoGameController from "@material-ui/icons/VideogameAsset";
import AVTimer from "@material-ui/icons/AvTimer";
import {Grid} from "@material-ui/core";
import MatchTable from "../components/MatchTable";
import AppTheme from "../AppTheme";

import {Match} from "@the-orange-alliance/lib-ems";

const styles = {
  card: {
    padding: AppTheme.spacing(1)
  },
  divider: {
    marginTop: AppTheme.spacing(1),
    marginBottom: AppTheme.spacing(1)
  }
};

interface IProps {
  match: Match
}

class MatchCardModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {match} = this.props;
    return (
      <Card style={styles.card}>
        <Grid container={true}>
          <Grid item={true} xs={12}>
            <Typography variant={'h6'}>Match Information</Typography>
          </Grid>
          <Grid item={true} xs={2} sm={1} md={1}>
            <Typography variant={'body1'}><AVTimer/></Typography>
          </Grid>
          <Grid item={true} xs={10} sm={11} md={11}>
            <Typography variant={'body2'}>{match.scheduledStartTime.subtract(8, 'hour').format("dddd, MMMM Do YYYY, h:mm a")}</Typography>
          </Grid>
          <Grid item={true} xs={2} sm={1} md={1}>
            <Typography variant={'body1'}><VideoGameController/></Typography>
          </Grid>
          <Grid item={true} xs={10} sm={11} md={11}>
            <Typography variant={'body2'}>Field {match.fieldNumber}</Typography>
          </Grid>
        </Grid>
        <Divider style={styles.divider}/>
        <MatchTable match={match}/>
      </Card>
    );
  }
}

export default MatchCardModule;