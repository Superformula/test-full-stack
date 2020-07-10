const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const buildOptions = require('../build-config-options');

const { BACKEND_HOST_URI } = buildOptions;

const testDirectory = path.join(__dirname, '../../../test');
const sourceDirectory = path.join(__dirname, '../../../src');
const modulesDirectory = path.join(__dirname, '../../../node_modules');

// const sourceDirectory = path.join(__dirname, '../../../src');
// const sourceDirectory = path.join(__dirname, '../../../src');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: "development",
    entry: [
        'react',
        'react-dom',
        './src/assets/common.css',
        './src/index.tsx'
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // Absolute paths to where modules can be resolved.
        modules: [sourceDirectory, modulesDirectory]
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Index",
            template: path.join('src', 'templates', 'index-production.template.html')
        }),
        new webpack.DefinePlugin({
            __SYS_BACKEND_HOST_URI__: JSON.stringify(BACKEND_HOST_URI)
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                include: [sourceDirectory, testDirectory]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: [sourceDirectory]
            },
            {
                test: /.*\.(gif|png|jpeg|svg|mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            }
        ],
    }
};
