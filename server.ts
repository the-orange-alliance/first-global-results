import express, { Application } from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from "./src/App";
import * as AxiosHooks from "axios-hooks";
import * as path from "path";

const app: Application = express();

app.use('/build/client', express.static(path.resolve("build/client")));

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
        .replace('["__CACHE__"]', JSON.stringify(cache).replace(/</g, '\\u003c'))
    );
  }
});

// Start server
console.log("Web server listening on port 3000");
app.listen(3000);
