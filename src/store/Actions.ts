import {
  SET_COMPLETE_MATCH,
  SET_COMPLETE_TEAM,
  SET_EVENT, SET_MATCH_SIZE,
  SET_MATCHES,
  SET_RANKINGS,
  SET_SEASONS,
  SET_TEAMS
} from "./Types";
import {ActionCreator} from "redux";
import {Event, ICompleteTeamResponse, Match, Ranking, Team} from "@the-orange-alliance/lib-ems";

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

export interface ISetMatchSize {
  type: SET_MATCH_SIZE,
  payload: {
    size: number
  }
}

export interface ISetCompleteMatch {
  type: SET_COMPLETE_MATCH,
  payload: {
    completeMatch: Match
  }
}

export interface ISetCompleteTeam {
  type: SET_COMPLETE_TEAM,
  payload: {
    completeTeam: ICompleteTeamResponse
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

export const setMatchSize: ActionCreator<ISetMatchSize> = (size: number) => ({
  type: SET_MATCH_SIZE,
  payload: {
    size: size
  }
});

export const setRankings: ActionCreator<ISetRankings> = (rankings: Ranking[]) => ({
  type: SET_RANKINGS,
  payload: {
    rankings: rankings
  }
});

export const setCompleteMatch: ActionCreator<ISetCompleteMatch> = (completeMatch: Match) => ({
  type: SET_COMPLETE_MATCH,
  payload: {
    completeMatch: completeMatch
  }
});

export const setCompleteTeam: ActionCreator<ISetCompleteTeam> = (completeTeam: ICompleteTeamResponse) => ({
  type: SET_COMPLETE_TEAM,
  payload: {
    completeTeam: completeTeam
  }
});

export type ApplicationActions = ISetSeasons | ISetTeams | ISetEvent | ISetMatches | ISetMatchSize | ISetRankings | ISetCompleteMatch | ISetCompleteTeam;