import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline"
import Hello from "./hello";

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <Hello/>
      </React.Fragment>
    );
  }
}