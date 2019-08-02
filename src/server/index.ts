/** @jsx React.DOM */
import * as fs from "fs";
import * as path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import http from "http";
import express, {Application, Request, Response} from "express";
import html from "../html";
import App from "../client/App";

const {serializeCache} = require("axios-hooks");

const app: Application = express();
const buildDir = path.resolve(__dirname, "../"); // Needs to be ../public for development

app.use('^/static', express.static(path.resolve(buildDir, 'static')));
app.use('*/*.js', express.static(path.resolve(buildDir)));

app.use(async (req: Request, res: Response) => {
  const body = ReactDOMServer.renderToString(React.createElement(App));
  const title = `The Global Alliance`;
  res.send(html({title, body}));
});

http.createServer(app).listen(80, () => console.log("The Global Alliance Web Server Running!"));