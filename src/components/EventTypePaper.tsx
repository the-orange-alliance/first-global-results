import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AppTheme from "../AppTheme";
import Typography from "@material-ui/core/Typography";

const styles = {
  avatar: {
    margin: AppTheme.spacing(1),
    backgroundColor: AppTheme.palette.secondary.main
  },
  paper: {
    margin: AppTheme.spacing(1)
  },
  text: {
    display: 'flex',
    alignItems: 'center'
  }
};

interface IProps {
  icon: JSX.Element;
  label: string;
}

class EventTypePaper extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {icon, label} = this.props;
    return (
      <Paper style={styles.paper}>
        <Grid container={true} spacing={0}>
          <Grid item={true} xs={3} sm={2} md={3} lg={3}>
            <Avatar style={styles.avatar}>{icon}</Avatar>
          </Grid>
          <Grid item={true} xs={9} sm={10} md={9} lg={9} style={styles.text}>
            <Typography variant={'body1'}>{label}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default EventTypePaper;