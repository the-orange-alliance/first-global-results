import express, { Application } from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from "./src/App";
import * as AxiosHooks from "axios-hooks";
import * as path from "path";

const isDev: boolean = false;
const app: Application = express();

// Serve built files with static files middleware
if (isDev) { // TODO - Figure out...
  // import webpack from "webpack";
  // import webpackMiddleware from "webpack-dev-middleware";
  //
  // const compiler = webpack(require("./config/webpack.server.config"));
  // console.log(require("./config/webpack.server.config"));
  // app.use(webpackMiddleware(compiler, {
  //   publicPath: './'
  // }));
  // console.log("Using webpack middleware for development.");
} else {
  app.use('/build/client', express.static(path.resolve("build/client")));
}

// Serve requests with our handleRender function
app.use(async (req: any, res: any) => {
  const context: any = {};

  const index = fs.readFileSync("index.html", 'utf8');
  const cache = await (AxiosHooks as any).serializeCache();
  const appElement = React.createElement(App);
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
        .replace('{{{cache}}}', JSON.stringify(cache).replace(/</g, '\\u003c'))
    );
  }
});

// Start server
console.log("Web server listening on port 3000");
app.listen(3000);
