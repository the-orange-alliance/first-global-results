import {IApplicationState} from "./Models";
import {Reducer} from "redux";
import {ApplicationActions} from "./Actions";
import {SET_SEASONS} from "./Types";

export const initialState: IApplicationState = {
  seasons: []
};

const reducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action) => {
  switch ((action as ApplicationActions).type) {
    case SET_SEASONS:
      return  {...state, seasons: action.payload.action};
    default:
      return state;
  }
};

export default reducer;