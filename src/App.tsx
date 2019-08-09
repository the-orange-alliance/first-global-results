import * as React from "react";
import AppTheme from "./AppTheme";
import AppRouter from "./AppRouter";
import AppRoutes from "./AppRoutes";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { ThemeProvider } from '@material-ui/styles';
import {IApplicationState} from "./store/Models";
import {initialState, default as reducer} from "./store/Reducer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import FGC_LOGO from "./assets/FG-header-black.png";

export interface IProps {
  state?: IApplicationState
}

export default class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {state} = this.props;
    return (
      <div>
        <Provider store={createStore(reducer, state ? state : initialState)}>
          <ThemeProvider theme={AppTheme}>
            <ResponsiveDrawer appRoutes={AppRoutes} title={"The Global Alliance"} logo={FGC_LOGO} view={<AppRouter appRoutes={AppRoutes} />}/>
          </ThemeProvider>
        </Provider>
      </div>
    );
  }
}