const { lib } = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: lib.entries,
  mode: lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};
