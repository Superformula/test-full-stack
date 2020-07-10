const path = require('path');
const argparse = require('argparse');

function parseArguments(baseConfig) {
    let newConfig = {
        ...baseConfig
    };

    let parser = new argparse.ArgumentParser({
        version: '1',
        addHelp: true,
        description: 'Development server for full stack client'
    });

    parser.addArgument(['--webpack-config'], {
        required: false,
        help: "The config file for webpack compiler",
        metavar: 'webpackConfig',
        defaultValue: path.join(__dirname, 'configs/webpack-dev.config.js')
    });

    const args = parser.parseKnownArgs();
    if(args.webpackConfig) {
        newConfig.webpackConfig = args.webpackConfig;
    }

    return newConfig;
}

module.exports = parseArguments;