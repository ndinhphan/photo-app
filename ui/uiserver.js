/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
// .env file
// UI_SERVER_PORT = 8000
// UI_API_ENDPOINT = /graphql
// API_PROXY_TARGET = http://localhost:3000
// ENABLE_HMR = true

const dotenv = require('dotenv');

dotenv.config();


const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();

const port = process.env.UI_SERVER_PORT || 8000;

const enableHMR = (process.env.ENABLE_HMR || true);

if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  // eslint-disable-next-line no-console
  console.log('Adding dev middleware, enabling HMR');
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware'); // hot module replacement
  const config = require('./webpack.config.js');
  // include hmr config in webpack config
  config.entry.app.push('webpack-hot-middleware/client');

  config.plugins = config.plugins || []; // enable plugins for HMR
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config); // compiler from settings
  app.use(devMiddleware(compiler)); // mount
  app.use(hotMiddleware(compiler));
}


const apiProxyTarget = process.env.API_PROXY_TARGET || 'http://localhost:3000';
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget })); // direct /graphql to proxy
  app.use('/api/login', proxy({ target: apiProxyTarget }));
  app.use('/api/register', proxy({ target: apiProxyTarget }));
  app.use('/api/home', proxy({ target: apiProxyTarget }));
}
const { UI_API_ENDPOINT } = process.env;
const env = { UI_API_ENDPOINT };

app.use(express.static('public'));

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`); // trick to set window env to match process env
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`UI server has started on port ${port}`);
});
