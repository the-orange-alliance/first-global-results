import * as React from "react";
import AppTheme from "./AppTheme";
import AppRouter from "./AppRouter";
import AppRoutes from "./AppRoutes";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { ThemeProvider } from '@material-ui/styles';

import FGC_LOGO from "./assets/FG-header-black.png";

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ThemeProvider theme={AppTheme}>
          <ResponsiveDrawer appRoutes={AppRoutes} title={"The Global Alliance"} logo={FGC_LOGO} view={<AppRouter appRoutes={AppRoutes} />}/>
        </ThemeProvider>
      </div>
    );
  }
}