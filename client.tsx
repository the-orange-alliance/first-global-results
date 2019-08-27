import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './src/App';
import * as AxiosHooks from "axios-hooks";

import {Provider} from "react-redux";
import {createStore} from "redux";
import {IApplicationState} from "./src/store/Models";
import appReducer, {initialState} from "./src/store/Reducer";

import {FGCProvider, Event, Team, Match, MatchParticipant, getRankingBySeasonKey} from "@the-orange-alliance/lib-ems";

// Dealing with our application caches -- Axios and Redux
(AxiosHooks as any).loadCache((window as any).__AXIOS_HOOKS_CACHE__);
delete (window as any).__AXIOS_HOOKS_CACHE__;
const stateCache = (window as any).__REDUX_STATE_CACHE__;
delete (window as any).__REDUX_STATE_CACHE__;
const isDev: boolean = true;


FGCProvider.initialize("127.0.0.1", 8088);

let state: IApplicationState = stateCache;
if (stateCache.length > 0 && stateCache[0] === "__REDUX__") {
  state = initialState;
} else {
  if (state.completeMatch) {
    state.completeMatch = new Match().fromJSON(state.completeMatch);
  }
  if (state.completeTeam) {
    state.completeTeam.team = new Team().fromJSON(state.completeTeam.team);
    state.completeTeam.matches = state.completeTeam.matches.map((matchJSON: any) => {
      const participants: MatchParticipant[] = typeof matchJSON.participants !== "undefined" ? matchJSON.participants.map((p: any) => new MatchParticipant().fromJSON(p)) : [];
      const match: Match = new Match().fromJSON(matchJSON);
      match.participants = participants;
      return match;
    });
    state.completeTeam.rankings = state.completeTeam.rankings.map((r: any) => getRankingBySeasonKey(r.rank_key.split("-")[0]).fromJSON(r));
  }
  if (state.teams) {
    state.teams = state.teams.map((t: any) => new Team().fromJSON(t));
  }
  if (state.rankings) {
    state.rankings = state.rankings.map((r: any) => getRankingBySeasonKey(r.rank_key.split("-")[0]).fromJSON(r));
  }
  if (state.matches) {
    state.matches = state.matches.map((matchJSON: any) => {
      const participants: MatchParticipant[] = typeof matchJSON.participants !== "undefined" ? matchJSON.participants.map((p: any) => new MatchParticipant().fromJSON(p)) : [];
      const match: Match = new Match().fromJSON(matchJSON);
      match.participants = participants;
      return match;
    });
  }
  if (state.event) {
    state.event = new Event().fromJSON(state.event);
  }
}

if (isDev) {
  ReactDOM.render(
    <Provider store={createStore(appReducer, state)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
} else {
  ReactDOM.hydrate(
    <Provider store={createStore(appReducer, state)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
}