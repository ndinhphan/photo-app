// webpack config file. acts as a js file and is imported using require() when webpack runs

/**
 * splitChunks seperates the libraries(likely unchanged)
 * into vendor.bundle.js from app.bundle.js(frequently changed)
 * devtool:'source-map' enable mapping for debugging
 */

const path = require('path');

module.exports = {
  mode: 'development',
  entry: { app: './src/App.jsx' },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
};
