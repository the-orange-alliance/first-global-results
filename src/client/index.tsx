import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// console.log((window as any).__AXIOS_HOOKS_CACHE__);

// @ts-ignore - Axios Hooks .d.ts doesn't export this for some reason.
const development: boolean = true;

if (!development) {
  const {loadCache} = require("axios-hooks");
  loadCache((window as any).__AXIOS_HOOKS_CACHE__);
  delete (window as any).__AXIOS_HOOKS_CACHE__;
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
