import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppTheme from "../../AppTheme";
import MatchCardModule from "../../modules/MatchCardModule";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  }
};

interface IProps {
  routeProps: RouteComponentProps;
}

class MatchView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    const {routeProps} = this.props;
  }

  public render() {
    return (
      <Container maxWidth={false} style={styles.container}>
        <Typography variant={'h3'}>Qualification Match 1</Typography>
        <Typography variant={'h4'}>FIRST Global Championship 2019</Typography>
        <Grid container={true}>
          <Grid item={true} xs={12} sm={12} md={6}>
            <Grid container={true}>
              <Grid item={true} xs={12}>
                <MatchCardModule/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6}>

          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default MatchView;