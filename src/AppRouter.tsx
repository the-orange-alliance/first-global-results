import * as React from "react";
import {Route, RouteComponentProps} from "react-router-dom";
import {AppRoute} from "./AppRoutes";

interface IProps {
  appRoutes: AppRoute[];
}

class AppRouter extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {appRoutes} = this.props;
    const routes = appRoutes.map((route: AppRoute, index: number) => {
      return (
        <Route key={index} exact={route.exact} path={route.path} component={(routeProps: RouteComponentProps) => route.component(routeProps)} />
      );
    });

    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default AppRouter;