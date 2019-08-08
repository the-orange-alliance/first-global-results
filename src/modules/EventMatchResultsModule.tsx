import * as React from "react";
import MatchResultsTable from "../components/MatchResultsTable";
import AppTheme from "../AppTheme";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

class EventMatchResultsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={styles.container}>
        <MatchResultsTable/>
      </div>
    );
  }
}

export default EventMatchResultsModule;