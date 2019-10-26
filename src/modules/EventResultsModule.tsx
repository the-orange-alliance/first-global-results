import * as React from "react";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EventRankingsModule from "./EventRankingsModule";
import EventMatchResultsModule from "./EventMatchResultsModule";
import EventTeamsModule from "./EventTeamsModule";
import EventAwardsModule from "./EventAwardsModule";

import {Match, Ranking, Team} from "@the-orange-alliance/lib-ems";

interface IProps {
  matches: Match[];
  teams: Team[];
  rankings: Ranking[];
}

interface IState {
  index: number
}

class EventResultsModule extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      index: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const {index} = this.state;
    return (
      <Card>
        <Tabs value={index} onChange={this.onChange} indicatorColor={"primary"} textColor={"primary"} variant={'fullWidth'} centered={true}>
          <Tab label={"Rankings"}/>
          <Tab label={"Match Results"}/>
          <Tab label={"Teams"}/>
          <Tab label={"Awards"}/>
        </Tabs>
        {this.getViewFromIndex(index)}
      </Card>
    );
  }

  private onChange(event: React.ChangeEvent<{}>, value: number) {
    this.setState({index: value});
  }

  private getViewFromIndex(index: number) {
    const {matches, teams, rankings} = this.props;
    switch (index) {
      case 0:
        return <EventRankingsModule rankings={rankings}/>;
      case 1:
        return <EventMatchResultsModule matches={matches}/>;
      case 2:
        return <EventTeamsModule teams={teams}/>;
      case 3:
        return <EventAwardsModule/>;
      default:
        return <EventRankingsModule rankings={rankings}/>;
    }
  }
}

export default EventResultsModule;