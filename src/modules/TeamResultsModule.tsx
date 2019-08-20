import * as React from "react";
import AppTheme from "../AppTheme";
import MatchResultsTable from "../components/MatchResultsTable";

import {Match} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  matches: Match[];
}

class TeamResultsModule extends React.Component<IProps> {
  constructor(props: IProps) {
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

export default TeamResultsModule;