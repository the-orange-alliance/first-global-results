import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './src/App';
import * as AxiosHooks from "axios-hooks";

import {FGCProvider} from "@the-orange-alliance/lib-ems";

(AxiosHooks as any).loadCache((window as any).__AXIOS_HOOKS_CACHE__);
delete (window as any).__AXIOS_HOOKS_CACHE__;

const isDev: boolean = true;

if (isDev) {
  FGCProvider.initialize("127.0.0.1", 8088);
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  );
} else {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  );
}