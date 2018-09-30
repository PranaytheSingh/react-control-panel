const config = require('./webpack.config');

module.exports = {
  ...config,
  entry: { index: config.entry.index },
  mode: 'production',
  devtool: 'source-map',
};
