import express, { Application } from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from "./src/App";
import {IApplicationState} from "./src/store/Models";

import * as AxiosHooks from "axios-hooks";
import * as path from "path";

import {FGCProvider, Team} from "@the-orange-alliance/lib-ems";

const app: Application = express();

FGCProvider.initialize("127.0.0.1", 8088);

app.use('/api/*', (req: any, res: any) => {
  req.pipe()
});

app.use('/build/client', express.static(path.resolve("build/client")));

// Serve requests with our handleRender function
app.use(async (req: any, res: any) => {
  const state: IApplicationState = await loadPageData(req.path);

  const context: any = {};

  const index = fs.readFileSync("index.html", 'utf8');
  const cache = await (AxiosHooks as any).serializeCache();
  const appElement = React.createElement(App, {state: state});
  const routerElement = React.createElement(StaticRouter, {location: req.url, context: context}, appElement);
  const html = renderToString(routerElement);

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.send(
      index
        .replace('{{{body}}}', html)
        .replace('["__CACHE__"]', JSON.stringify(cache).replace(/</g, '\\u003c'))
    );
  }
});

async function loadPageData(path: string): Promise<IApplicationState> {
  switch (path) {
    case "/":
      const teams: Team[] = await FGCProvider.getTeamsBySeason("2019");
      return {seasons: [], teams: teams};
    default:
      return {seasons: [], teams: []};
  }
}

// Start server
console.log("Web server listening on port 3000");
app.listen(3000);
