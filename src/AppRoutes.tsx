import * as React from "react";
import HomeIcon from "@material-ui/icons/Home"
import PeopleIcon from "@material-ui/icons/People"
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayTwoTone"

export interface AppRoute {
  name: string;
  path: string;
  exact?: boolean;
  component: JSX.Element;
  menuIcon?: any;
}

const appRoutes: AppRoute[] = [
  {
    name: "Home",
    path: '/',
    exact: true,
    component: <span>Home</span>,
    menuIcon: <HomeIcon/>
  },
  {
    name: "Teams",
    path: '/teams',
    exact: true,
    component: <span>Teams</span>,
    menuIcon: <PeopleIcon/>
  },
  {
    name: "Events",
    path: '/events',
    exact: true,
    component: <span>Events</span>,
    menuIcon: <CalendarTodayIcon/>
  }
];

export default appRoutes;