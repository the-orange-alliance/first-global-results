import * as React from "react";

import OceanBackground from "../assets/ocean_background.jpg";

const styles = {
  bg: {
    width: '100%',
    height: '25vh'
  }
};

class Banner extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <img style={styles.bg} src={OceanBackground}/>
      </div>
    );
  }
}

export default Banner;