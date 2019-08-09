import * as React from "react";
import AppTheme from "../../AppTheme";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import StreamsModule from "../../modules/StreamsModule";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  }
};

class StreamingView extends React.Component{
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Container fixed={true} style={styles.container}>
        <Typography variant={'h3'}>Streaming</Typography>
        <Typography paragraph={true}>The following are a list of live streams provided by <i>FIRST</i> Global.</Typography>
        <StreamsModule/>
      </Container>
    );
  }
}

export default StreamingView;