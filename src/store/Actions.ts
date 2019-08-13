import {SET_EVENT, SET_SEASONS, SET_TEAMS} from "./Types";
import {ActionCreator} from "redux";
import {Event, Team} from "@the-orange-alliance/lib-ems";

export interface ISetSeasons {
  type: SET_SEASONS,
  payload: {
    seasons: any[]
  }
}

export interface ISetTeams {
  type: SET_TEAMS,
  payload: {
    teams: Team[]
  }
}

export interface ISetEvent {
  type: SET_EVENT,
  payload: {
    event: Event
  }
}

export const setSeasons: ActionCreator<ISetSeasons> = (seasons: any[]) => ({
  type: SET_SEASONS,
  payload: {
    seasons: seasons
  }
});

export const setTeams: ActionCreator<ISetTeams> = (teams: Team[]) => ({
  type: SET_TEAMS,
  payload: {
    teams: teams
  }
});

export const setEvent: ActionCreator<ISetEvent> = (event: Event) => ({
  type: SET_EVENT,
  payload: {
    event: event
  }
});

export type ApplicationActions = ISetSeasons | ISetTeams | ISetEvent;