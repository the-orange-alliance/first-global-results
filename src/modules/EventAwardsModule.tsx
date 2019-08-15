import * as React from "react";
import AppTheme from "../AppTheme";
import Typography from "@material-ui/core/Typography";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

class EventAwardsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={styles.container}>
        <Typography variant={'body1'}>No awards have been posted for this event yet.</Typography>
      </div>
    );
  }
}

export default EventAwardsModule;