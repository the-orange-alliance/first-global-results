import {IApplicationState} from "./Models";
import {Reducer} from "redux";
import {ApplicationActions} from "./Actions";
import {SET_EVENT, SET_MATCHES, SET_RANKINGS, SET_SEASONS, SET_TEAMS} from "./Types";

import {Event} from "@the-orange-alliance/lib-ems";

export const initialState: IApplicationState = {
  seasons: [],
  teams: [],
  event: new Event(),
  matches: [],
  rankings: []
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
    case SET_RANKINGS:
      return {...state, rankings: action.payload.rankings};
    default:
      return state;
  }
};

export default reducer;