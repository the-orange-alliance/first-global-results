import express, { Application } from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import * as AxiosHooks from "axios-hooks";
import * as path from "path";

// App imports
import App from "./src/App";
import {Event, FGCProvider, Team} from "@the-orange-alliance/lib-ems";

// Redux imports
import {createStore} from "redux";
import {Provider} from "react-redux";
import {IApplicationState} from "./src/store/Models";
import appReducer, {initialState} from "./src/store/Reducer";

const app: Application = express();

FGCProvider.initialize("127.0.0.1", 8088);

// app.use('/api/*', (req: any, res: any) => {
//   req.pipe()
// });

// The client needs this first line to find the actual index.js file.
app.use('/build/client', express.static(path.resolve("build/client")));
app.use(express.static(path.resolve("build/client")));
app.use(express.static(path.resolve("static")));

// Serve requests with our handleRender function
app.use(async (req: any, res: any) => {
  // Create application store.
  const initialState: IApplicationState = await loadPageData(req.path);
  const store = createStore(appReducer, initialState);

  const context: any = {};

  const index = fs.readFileSync("index.html", 'utf8');
  const cache = await (AxiosHooks as any).serializeCache();
  const appElement = React.createElement(App, {store: store});
  const routerElement = React.createElement(StaticRouter, {location: req.url, context: context}, appElement);
  const appProvider = React.createElement(Provider, {store: store}, routerElement);
  const html = renderToString(appProvider);

  const state = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.send(
      index
        .replace('{{{body}}}', html)
        .replace('["__AXIOS__"]', JSON.stringify(cache).replace(/</g, '\\u003c'))
        .replace('["__REDUX__"]', JSON.stringify(state).replace(/</g, '\\u003c'))
    );
  }
});

async function loadPageData(path: string, params?: any): Promise<IApplicationState> {
  switch (path) {
    case "/":
      const homeTeams: Team[] = await FGCProvider.getTeamsBySeason("2019");
      return {...initialState, teams: homeTeams};
    case "/teams":
      const teams: Team[] = await FGCProvider.getTeamsBySeason("2019");
      return {...initialState, teams: teams};
    case "/event":
      const event: Event = await FGCProvider.getEventBySeason(params.seasonKey); // TODO - HANDLE PARAMS. EASY, JUST REQUIRES THOUGHT.
      return {...initialState, event: event};
    default:
      return initialState;
  }
}

// Start server
console.log("Web server listening on port 3000");
app.listen(3000);
