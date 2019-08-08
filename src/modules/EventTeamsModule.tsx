import * as React from "react";
import TeamsListModule from "./TeamsListModule";
import AppTheme from "../AppTheme";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

class EventTeamsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={styles.container}>
        <TeamsListModule/>
      </div>
    );
  }
}

export default EventTeamsModule;