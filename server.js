import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Hello from './hello.js';
import { serializeCache } from 'axios-hooks'

const app = express();

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, 'build')));

// Serve requests with our handleRender function
app.use(async (req, res) => {
  const index = fs.readFileSync('./index.html', 'utf8');
  const cache = await serializeCache();

  const html = ReactDOM.renderToString(React.createElement(Hello));
  res.send(
    index
      .replace('{{{body}}}', html)
      .replace('{{{cache}}}', JSON.stringify(cache).replace(/</g, '\\u003c'))
  );
});

// Start server
app.listen(3000);
