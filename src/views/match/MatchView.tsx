import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppTheme from "../../AppTheme";
import MatchCardModule from "../../modules/MatchCardModule";
import OceanOpportunitiesDetailCard from "../../components/game-specific/OceanOpportunitiesDetailCard";

import {ApplicationActions, ISetMatches, setMatches} from "../../store/Actions";
import {IApplicationState} from "../../store/Models";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {FGCProvider, Match} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  }
};

interface IProps {
  routeProps: RouteComponentProps;
  matches: Match[];
  setMatches: (matches: Match[]) => ISetMatches;
}

class MatchView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    const {routeProps, setMatches} = this.props;
    if (typeof (routeProps.match.params as any).match_key !== "undefined") {
      FGCProvider.getCompleteMatch((routeProps.match.params as any).match_key).then((match: Match) => {
        setMatches([match]);
      });
    }
  }

  public render() {
    const {matches} = this.props;
    const match = matches.length === 1 ? matches[0] : new Match();
    return (
      <Container maxWidth={false} style={styles.container}>
        <Typography variant={'h3'}>Qualification Match 1</Typography>
        <Typography variant={'h4'}>FIRST Global Championship 2019</Typography>
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12} sm={12} md={6}>
            <MatchCardModule match={match}/>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6}>
            <OceanOpportunitiesDetailCard match={match}/>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    matches: state.matches
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setMatches: (matches: Match[]) => dispatch(setMatches(matches))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchView);