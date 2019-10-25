import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import ViewStreamIcon from "@material-ui/icons/ViewStream";
import AppTheme from "../AppTheme";

import {LiveStream} from "@the-orange-alliance/lib-ems";

const styles = {
  avatar: {
    backgroundColor: AppTheme.palette.secondary.main
  },
  iFrame: {
    maxWidth: '100%'
  }
};

interface IProps {
  subtitle?: string;
  stream: LiveStream;
}

class StreamCard extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {subtitle, stream} = this.props;
    return (
      <Card>
        <CardHeader
          avatar={<Avatar style={styles.avatar}><ViewStreamIcon/></Avatar>}
          title={stream ? stream.streamName : ""}
          subheader={subtitle}
        />
        <CardContent>
          <iframe src={stream.streamURL} frameBorder={"0"} allowFullScreen={true} scrolling={"no"} height={"378"} width={"620"} style={styles.iFrame}/>
        </CardContent>
      </Card>
    );
  }
}

export default StreamCard;