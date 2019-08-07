import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EventTypePaper from "./EventTypePaper";

import PublicIcon from "@material-ui/icons/Public";
import HighlightIcon from "@material-ui/icons/Highlight";
import AppTheme from "../AppTheme";

const styles = {
  content: {
    padding: AppTheme.spacing(1)
  }
};

class EventSelectorCard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Card>
        <CardContent style={styles.content}>
          <EventTypePaper icon={<HighlightIcon fontSize={"large"}/>} label={"Energy Impact"}/>
          <EventTypePaper icon={<PublicIcon fontSize={"large"}/>} label={"Ocean Opportunities"}/>
        </CardContent>
      </Card>
    );
  }
}

export default EventSelectorCard;