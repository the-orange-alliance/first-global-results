import * as React from "react";
import TeamsListModule from "./TeamsListModule";
import AppTheme from "../AppTheme";

import {Team} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  teams: Team[];
}

class EventTeamsModule extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {teams} = this.props;
    return (
      <div style={styles.container}>
        <TeamsListModule teams={teams}/>
      </div>
    );
  }
}

export default EventTeamsModule;