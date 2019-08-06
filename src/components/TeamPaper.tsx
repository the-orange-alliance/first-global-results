import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AppTheme from "../AppTheme";
import Typography from "@material-ui/core/Typography";
import PublicIcon from "@material-ui/icons/Public";

const styles = {
  avatar: {
    margin: AppTheme.spacing(1),
    backgroundColor: AppTheme.palette.secondary.main
  },
  text: {
    margin: AppTheme.spacing(1)
  }
};

class TeamPaper extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Paper>
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={3} sm={3} md={3}>
            <Avatar style={styles.avatar}>
              <PublicIcon fontSize={"large"}/>
            </Avatar>
          </Grid>
          <Grid item={true} xs={9} sm={9} md={9}>
            <Grid container={true} spacing={0} style={styles.text}>
              <Grid item={true} xs={12}>
                <Typography variant={'body1'}><b>Team Afghanistan</b></Typography>
              </Grid>
              <Grid item={true} xs={12}>
                <Typography variant={'body2'} color={"textSecondary"}>Place, Afghanistan</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default TeamPaper;