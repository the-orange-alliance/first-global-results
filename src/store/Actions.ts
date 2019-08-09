import {SET_SEASONS} from "./Types";

import {ActionCreator} from "redux";

export interface ISetSeasons {
  type: SET_SEASONS,
  payload: {
    seasons: any[]
  }
}

export const setSeasons: ActionCreator<ISetSeasons> = (seasons: any[]) => ({
  type: SET_SEASONS,
  payload: {
    seasons: seasons
  }
});

export type ApplicationActions = ISetSeasons;