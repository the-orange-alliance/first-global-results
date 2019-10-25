import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppTheme from "../../AppTheme";
import MatchCardModule from "../../modules/MatchCardModule";
import OceanOpportunitiesDetailCard from "../../components/game-specific/OceanOpportunitiesDetailCard";

import {ApplicationActions, ISetCompleteMatch, setCompleteMatch} from "../../store/Actions";
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
  completeMatch: Match;
  setCompleteMatch: (match: Match) => ISetCompleteMatch;
}

class MatchView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    const {routeProps, setCompleteMatch} = this.props;
    if (typeof (routeProps.match.params as any).matchKey !== "undefined") {
      FGCProvider.getCompleteMatch((routeProps.match.params as any).matchKey).then((match: Match) => {
        setCompleteMatch(match);
      });
    }
  }

  public render() {
    const {completeMatch} = this.props;
    return (
      <Container maxWidth={false} style={styles.container}>
        <Typography variant={'h3'}>{completeMatch.matchName}</Typography>
        <Typography variant={'h4'}>FIRST Global Championship 2019</Typography>
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12} sm={12} md={6}>
            <MatchCardModule match={completeMatch}/>
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6}>
            <OceanOpportunitiesDetailCard match={completeMatch}/>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    completeMatch: state.completeMatch
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setCompleteMatch: (match: Match) => dispatch(setCompleteMatch(match))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchView);