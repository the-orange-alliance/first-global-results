import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StreamCard from "../components/StreamCard";

import {LiveStream} from "@the-orange-alliance/lib-ems";

const mainStream: LiveStream = new LiveStream();
mainStream.channelName = "firstinspires";
mainStream.streamName = "FIRST Global - Main Stream";
mainStream.streamURL = "https://player.twitch.tv/?channel=firstinspires";

const fieldFive: LiveStream = new LiveStream();
fieldFive.channelName = "firstinspires5";
fieldFive.streamName = "FIRST Global - Field 5";
fieldFive.streamURL = "https://player.twitch.tv/?channel=firstinspires5";

const fieldFour: LiveStream = new LiveStream();
fieldFour.channelName = "firstinspires4";
fieldFour.streamName = "FIRST Global - Field 4";
fieldFour.streamURL = "https://player.twitch.tv/?channel=firstinspires4";

const fieldThree: LiveStream = new LiveStream();
fieldThree.channelName = "firstinspires3";
fieldThree.streamName = "FIRST Global - Field 3";
fieldThree.streamURL = "https://player.twitch.tv/?channel=firstinspires3";

const fieldTwo: LiveStream = new LiveStream();
fieldTwo.channelName = "firstinspires2";
fieldTwo.streamName = "FIRST Global - Field 2";
fieldTwo.streamURL = "https://player.twitch.tv/?channel=firstinspires2";

const fieldOne: LiveStream = new LiveStream();
fieldOne.channelName = "firstinspires1";
fieldOne.streamName = "FIRST Global - Field 1";
fieldOne.streamURL = "https://player.twitch.tv/?channel=firstinspires1";


const streams: LiveStream[] = [mainStream, fieldFive, fieldFour, fieldThree, fieldTwo, fieldOne];

class StreamsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {

    const streamsView = streams.map((stream: LiveStream) => {
      return (
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard stream={stream} subtitle={stream.channelName}/>
        </Grid>
      );
    });
    return (
      <Grid container={true} spacing={3}>
        {streamsView}
      </Grid>
    );
  }
}

export default StreamsModule;