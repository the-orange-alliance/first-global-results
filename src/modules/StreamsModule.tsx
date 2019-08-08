import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StreamCard from "../components/StreamCard";

class StreamsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard/>
        </Grid>
      </Grid>
    );
  }
}

export default StreamsModule;