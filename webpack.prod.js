const path = require('path');

const config = require('./webpack.config');

module.exports = {
  ...config,
  entry: config.entry.index,
  output: {
    filename: './dist/index.js',
    library: 'react-control-panel',
    libraryTarget: 'umd',
    path: path.resolve(__dirname),
  },
  mode: 'production',
  devtool: 'source-map',
};
