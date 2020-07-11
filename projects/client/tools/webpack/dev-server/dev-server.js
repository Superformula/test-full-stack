const path = require("path");
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const parseArguments = require("./dev-server-options");

const host = '127.0.0.1';
const port = 4040;

const args = parseArguments({
    webpackConfig: path.join(__dirname, '../configs/webpack-dev.config.js')
});
console.log(`Loading webpack config ${args.webpackConfig}`);

/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = require(args.webpackConfig);
console.log(JSON.stringify(webpackConfig, null, 2));

const server = new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        assets: true,
        colors: true,
        version: true,
        hash: true,
        timings: false,
        chunks: false,
        chunkModules: false
    }
});

server.listen(port, host, (err, result) => {
    if(err) {
        console.error(JSON.stringify(err));
        return;
    }

    console.log(`Listening at ${host}:${port}`);
});