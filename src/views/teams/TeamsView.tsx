import * as React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppTheme from "../../AppTheme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TeamsListModule from "../../modules/TeamsListModule";

const styles = {
  container: {
    margin: 0,
    paddingTop: AppTheme.spacing(3)
  },
  card: {
    marginTop: AppTheme.spacing(3)
  }
};

class TeamsView extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Container maxWidth={false} style={styles.container}>
        <Typography variant={'h3'}>Countries Participating</Typography>
        {/* Teams display */}
        <Card style={styles.card}>
          <CardContent>
            <TeamsListModule/>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default TeamsView;