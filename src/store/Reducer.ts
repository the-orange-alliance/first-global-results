import {IApplicationState} from "./Models";
import {Reducer} from "redux";
import {ApplicationActions} from "./Actions";
import {
  SET_COMPLETE_MATCH,
  SET_COMPLETE_TEAM,
  SET_EVENT, SET_MATCH_SIZE,
  SET_MATCHES,
  SET_RANKINGS,
  SET_SEASONS,
  SET_TEAMS
} from "./Types";

import {Event, Match, Team} from "@the-orange-alliance/lib-ems";

export const initialState: IApplicationState = {
  seasons: [],
  teams: [],
  event: new Event(),
  matches: [],
  matchSize: 0,
  rankings: [],
  completeMatch: new Match(),
  completeTeam: {team: new Team(), matches: [], rankings: []}
};

const reducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action) => {
  switch ((action as ApplicationActions).type) {
    case SET_SEASONS:
      return  {...state, seasons: action.payload.action};
    case SET_TEAMS:
      return {...state, teams: action.payload.teams};
    case SET_EVENT:
      return {...state, event: action.payload.event};
    case SET_MATCHES:
      return {...state, matches: action.payload.matches};
    case SET_MATCH_SIZE:
      return {...state, matchSize: action.payload.size};
    case SET_RANKINGS:
      return {...state, rankings: action.payload.rankings};
    case SET_COMPLETE_MATCH:
      return {...state, completeMatch: action.payload.completeMatch};
    case SET_COMPLETE_TEAM:
      return {...state, completeTeam: action.payload.completeTeam};
    default:
      return state;
  }
};

export default reducer;