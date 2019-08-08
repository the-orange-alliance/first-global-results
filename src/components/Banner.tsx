import * as React from "react";

import FG_BG from "../assets/global-bg.png";

const styles = {
  container: {
    height: '25vh',
    overflow: 'hidden'
  },
  bg: {
    width: '100%'
  }
};

class Banner extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={styles.container}>
        <img style={styles.bg} src={FG_BG}/>
      </div>
    );
  }
}

export default Banner;