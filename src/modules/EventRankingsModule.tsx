import * as React from "react";
import OceanOpportunitiesRankingTable from "../components/game-specific/OceanOpportunitiesRankingTable";
import AppTheme from "../AppTheme";

import {Ranking} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  rankings: Ranking[];
}

class EventRankingsModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {rankings} = this.props;
    return (
      <div style={styles.container}>
        <OceanOpportunitiesRankingTable rankings={rankings}/>
      </div>
    );
  }
}

export default EventRankingsModule;