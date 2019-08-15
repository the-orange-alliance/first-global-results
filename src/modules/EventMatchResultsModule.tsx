import * as React from "react";
import MatchResultsTable from "../components/MatchResultsTable";
import AppTheme from "../AppTheme";

import {Match} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  matches: Match[];
}

class EventMatchResultsModule extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {matches} = this.props;
    return (
      <div style={styles.container}>
        <MatchResultsTable matches={matches}/>
      </div>
    );
  }
}

export default EventMatchResultsModule;