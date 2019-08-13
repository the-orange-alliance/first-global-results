import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './src/App';
import * as AxiosHooks from "axios-hooks";

import {Provider} from "react-redux";
import {createStore} from "redux";
import appReducer, {initialState} from "./src/store/Reducer";

import {FGCProvider} from "@the-orange-alliance/lib-ems";

// Dealing with our application caches -- Axios and Redux
(AxiosHooks as any).loadCache((window as any).__AXIOS_HOOKS_CACHE__);
delete (window as any).__AXIOS_HOOKS_CACHE__;
const stateCache = (window as any).__REDUX_STATE_CACHE__;
const isDev: boolean = true;


FGCProvider.initialize("127.0.0.1", 8088);

let state = stateCache;
if (stateCache.length > 0 && stateCache[0] === "__REDUX__") {
  state = initialState;
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