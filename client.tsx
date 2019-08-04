import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import * as AxiosHooks from "axios-hooks";


(AxiosHooks as any).loadCache((window as any).__AXIOS_HOOKS_CACHE__);
delete (window as any).__AXIOS_HOOKS_CACHE__;

ReactDOM.hydrate(
  <App />,
  document.getElementById('app')
);