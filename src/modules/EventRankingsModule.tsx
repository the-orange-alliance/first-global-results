import * as React from "react";
import OceanOpportunitiesRankingTable from "../components/game-specific/OceanOpportunitiesRankingTable";
import AppTheme from "../AppTheme";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

class EventRankingsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={styles.container}>
        <OceanOpportunitiesRankingTable/>
      </div>
    );
  }
}

export default EventRankingsModule;