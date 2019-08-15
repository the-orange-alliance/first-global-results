import {SET_EVENT, SET_MATCHES, SET_RANKINGS, SET_SEASONS, SET_TEAMS} from "./Types";
import {ActionCreator} from "redux";
import {Event, Match, Ranking, Team} from "@the-orange-alliance/lib-ems";

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

export interface ISetMatches {
  type: SET_MATCHES,
  payload: {
    matches: Match[]
  }
}

export interface ISetRankings {
  type: SET_RANKINGS,
  payload: {
    rankings: Ranking[]
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

export const setMatches: ActionCreator<ISetMatches> = (matches: Match[]) => ({
  type: SET_MATCHES,
  payload: {
    matches: matches
  }
});

export const setRankings: ActionCreator<ISetRankings> = (rankings: Ranking[]) => ({
  type: SET_RANKINGS,
  payload: {
    rankings: rankings
  }
});

export type ApplicationActions = ISetSeasons | ISetTeams | ISetEvent | ISetMatches | ISetRankings;