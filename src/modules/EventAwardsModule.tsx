import * as React from "react";
import AppTheme from "../AppTheme";

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
        Awards!
      </div>
    );
  }
}

export default EventAwardsModule;