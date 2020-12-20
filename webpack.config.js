var webpack = require('webpack')
var path = require('path')
var package = require('./package.json')
var autoprefixer = require('autoprefixer')

var sourcePath = path.join(__dirname, './src')
var outPath = path.join(__dirname, './dist')
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'

console.log(`Starting ${process.env.NODE_ENV} enviroment`)
console.log(`Use mock server: ${process.env.USE_MOCK_SERVER}`)

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx',
  },
  output: {
    path: outPath,
    filename: '[name].js',
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    // Need .mjs here. See https://github.com/graphql/graphql-js/issues/1272
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      '@src': path.resolve(__dirname, './src/'),
      ...(isProduction ? {} : { 'react-dom': '@hot-loader/react-dom' }),
    },
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-hot-loader/babel'] },
          } || 'babel-loader',
        ].filter(Boolean),
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          //  filename: isProduction ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'stage' unless process.env.NODE_ENV is defined
      DEBUG: false,
      USE_MOCK_SERVER: '0',
      DEBUG_MODE: '0',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      disable: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
      },
      meta: {
        title: package.name,
        description: package.description,
        keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined,
      },
    }),
  ],
  devServer: {
    contentBase: sourcePath,
    disableHostCheck: true,
    https: false,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
}
