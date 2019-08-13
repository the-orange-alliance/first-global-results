import * as React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import PublicIcon from "@material-ui/icons/Public";
import AppTheme from "../AppTheme";
import Typography from "@material-ui/core/Typography";

const styles = {
  avatar: {
    margin: AppTheme.spacing(2),
    backgroundColor: AppTheme.palette.primary.main
  },
  text: {
    margin: AppTheme.spacing(2)
  }
};

interface IProps {
  count: number;
}

class ActiveTeamsModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {count} = this.props;
    return (
      <Card>
        <Grid container={true} spacing={2}>
          <Grid item={true} xs={4} sm={5} md={4} lg={3}>
            <Avatar style={styles.avatar}>
              <PublicIcon fontSize={"large"}/>
            </Avatar>
          </Grid>
          <Grid item={true} xs={8} sm={7} md={8} lg={9}>
            <Grid container={true} spacing={0} style={styles.text}>
              <Grid item={true} xs={12}>
                <Typography variant={'body1'}><b>{count}</b></Typography>
              </Grid>
              <Grid item={true} xs={12}>
                <Typography variant={'body2'} color={"textSecondary"}>Active Countries</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default ActiveTeamsModule;