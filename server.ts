import express, { Application } from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Hello from "./hello";
import * as AxiosHooks from "axios-hooks";
import * as path from "path";

const app: Application = express();

// Serve built files with static files middleware
app.use('/build/client', express.static(path.resolve("build/client")));

// Serve requests with our handleRender function
app.use(async (req: any, res: any) => {
  const index = fs.readFileSync("index.html", 'utf8');
  const cache = await (AxiosHooks as any).serializeCache();
  const html = renderToString(React.createElement(Hello));
  res.send(
    index
      .replace('{{{body}}}', html)
      .replace('{{{cache}}}', JSON.stringify(cache).replace(/</g, '\\u003c'))
  );
});

// Start server
console.log("Web server listening on port 3000");
app.listen(3000);
