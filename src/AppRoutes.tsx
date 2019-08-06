import * as React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayTwoTone";
import CameraIcon from "@material-ui/icons/VideocamRounded";

import HomeView from "./views/home/HomeView"
import TeamsView from "./views/teams/TeamsView";

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
    component: <HomeView/>, // DEBUG view
    menuIcon: <HomeIcon/>
  },
  {
    name: "Teams",
    path: '/teams',
    exact: true,
    component: <TeamsView/>,
    menuIcon: <PeopleIcon/>
  },
  {
    name: "Events",
    path: '/events',
    exact: true,
    component: <span>Events</span>,
    menuIcon: <CalendarTodayIcon/>
  },
  {
    name: "Streaming",
    path: '/streams',
    exact: true,
    component: <span>Streaming</span>,
    menuIcon: <CameraIcon/>
  }
];

export default appRoutes;