import * as React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppTheme, {CURRENT_SEASON} from "../../AppTheme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TeamsListModule from "../../modules/TeamsListModule";

// Redux imports
import {IApplicationState} from "../../store/Models";
import {connect} from "react-redux";
import {ApplicationActions, ISetTeams, setTeams} from "../../store/Actions";
import {Dispatch} from "redux";

// EMS imports
import {FGCProvider, Team} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  },
  card: {
    marginTop: AppTheme.spacing(3)
  }
};

interface IProps {
  teams: Team[];
  setTeams: (teams: Team[]) => ISetTeams;
}

class TeamsView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    const {teams, setTeams} = this.props;
    if (teams.length <= 0) {
      FGCProvider.getTeamsBySeason(CURRENT_SEASON).then((teams: Team[]) => {
        setTeams(teams);
      });
    }
  }

  public render() {
    const {teams} = this.props;
    return (
      <Container maxWidth={false} style={styles.container}>
        <Typography variant={'h3'}>Countries Participating</Typography>
        {/* Teams display */}
        <Card style={styles.card}>
          <CardContent>
            <TeamsListModule teams={teams}/>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    teams: state.teams
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setTeams: (teams: Team[]) => dispatch(setTeams(teams))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsView);