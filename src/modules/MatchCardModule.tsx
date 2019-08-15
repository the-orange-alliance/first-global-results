import * as React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import MatchTable from "../components/MatchTable";
import AppTheme from "../AppTheme";

const styles = {
  card: {
    padding: AppTheme.spacing(1)
  },
  divider: {
    marginTop: AppTheme.spacing(1),
    marginBottom: AppTheme.spacing(1)
  }
};

class MatchCardModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Card style={styles.card}>
        <Typography variant={'h6'}>Match Information</Typography>
        <Divider style={styles.divider}/>
        <MatchTable/>
      </Card>
    );
  }
}

export default MatchCardModule;