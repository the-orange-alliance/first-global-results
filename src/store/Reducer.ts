import {IApplicationState} from "./Models";
import {Reducer} from "redux";
import {ApplicationActions} from "./Actions";
import {SET_SEASONS, SET_TEAMS} from "./Types";

export const initialState: IApplicationState = {
  seasons: [],
  teams: []
};

const reducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action) => {
  switch ((action as ApplicationActions).type) {
    case SET_SEASONS:
      return  {...state, seasons: action.payload.action};
    case SET_TEAMS:
      return {...state, teams: action.payload.teams};
    default:
      return state;
  }
};

export default reducer;