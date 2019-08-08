import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import ViewStreamIcon from "@material-ui/icons/ViewStream";
import AppTheme from "../AppTheme";

const styles = {
  avatar: {
    backgroundColor: AppTheme.palette.secondary.main
  }
};

class StreamCard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Card>
        <CardHeader
          avatar={<Avatar style={styles.avatar}><ViewStreamIcon/></Avatar>}
          title={<span><i>FIRST</i> Global Competition 2019</span>}
          subheader={<span>Field 1</span>}
        />
        <CardContent>
          <iframe src={"https://player.twitch.tv/?channel=theorangealliance1"} frameBorder={"0"} allowFullScreen={true} scrolling={"no"} height={"378"} width={"620"}/>
        </CardContent>
      </Card>
    );
  }
}

export default StreamCard;